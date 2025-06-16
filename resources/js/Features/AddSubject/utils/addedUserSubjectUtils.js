import axios from 'axios';

async function subjectExists(code) {
    try {
        const response = await axios.get(`/api/subject/${code}`);
        if (response.status === 200 && typeof response.data.exists !== 'undefined') {
            return response.data.exists;
        }
        return false;
    } catch (error) {
        console.error('Error checking subject existence:', error);
        return false;
    }
}

async function saveWithServer(newAddedUserSubject) {
    if (!(await subjectExists(newAddedUserSubject.code))) {
        return {
            success: false,
            message: 'Disciplina não encontrada.'
        };
    }
    // Map frontend fields to backend expected fields
    const payload = {
        group_title: newAddedUserSubject.group_name,
        subject_code: newAddedUserSubject.code
    };
    try {
        const response = await axios.post('/api/user-subjects/add', payload);
        if (response.status === 201 && response.data) {
            return {
                success: response.data.status === 'success',
                message: response.data.message
            };
        } else {
            console.error('Server synchronization failed:', response.data);
            return {
                success: false,
                message: response.data?.message || 'Unknown server error'
            };
        }
    } catch (error) {
        if (error.response && (error.response.status === 409 || error.response.status === 404)) {
            // Conflict: return the server's message
            return {
                success: false,
                message: error.response.data?.message || 'Conflict error'
            };
        }
        console.error('Error communicating with the server:', error);
        return {
            success: false,
            message: error.message || 'Network/server error'
        };
    }
}

async function saveWithLocalStorage(newAddedUserSubject) {
    if (!(await subjectExists(newAddedUserSubject.code))) {
        return {
            success: false,
            message: 'Disciplina não encontrada.'
        };
    }
    try {
        const existing = JSON.parse(localStorage.getItem('addedUserSubjects')) || [];
        const isDuplicate = existing.some(
            subject =>
                subject.code === newAddedUserSubject.code &&
                subject.group_name === newAddedUserSubject.group_name
        );
        if (isDuplicate) {
            return {
                success: false,
                message: 'Esta disciplina já pertence a algum grupo.'
            };
        }
        existing.push(newAddedUserSubject);
        localStorage.setItem('addedUserSubjects', JSON.stringify(existing));
        return {
            success: true,
            message: 'Disciplina adicionada com sucesso ao grupo.'
        };
    } catch (error) {
        console.error('Failed to save subject to localStorage:', error);
        return {
            success: false,
            message: error.message || 'localStorage error'
        };
    }
}

export async function saveAddedUserSubject(user, newAddedUserSubject) {
	if(!user) {
		return await saveWithLocalStorage(newAddedUserSubject);
	}
	return await saveWithServer(newAddedUserSubject);
}