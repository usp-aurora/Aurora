import axios from 'axios';

async function saveUserAddedSubject(user, newAddedUserSubject) {
    if (!(await subjectExists(newAddedUserSubject.code))) {
        return {
            success: false,
            message: 'Disciplina não encontrada.'
        };
    }
    if (await subjectBelongToPreDefinedGroup(newAddedUserSubject.code)) {
        return {
            success: false,
            message: 'Disciplina já tem um grupo pré-definido.'
        };
    }
    if (user) {
        return await saveWithServer(newAddedUserSubject);
    }
    else {
        return {
            success: false,
            message: 'É necessário estar logado para adicionar matérias'
        }
    }
}


async function subjectExists(code) {
    try {
        const response = await axios.get(`/api/subject/exists/${code}`);
        if (response.status === 200 && typeof response.data.exists !== 'undefined') {
            return response.data.exists;
        }
        return false;
    } catch (error) {
        console.error('Error checking subject existence:', error);
        return false;
    }
}

async function subjectBelongToPreDefinedGroup(code) {
    try {
        const response = await axios.get(`/api/groups/${code}`);
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

export {saveUserAddedSubject}