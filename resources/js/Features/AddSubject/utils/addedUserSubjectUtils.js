import axios from 'axios';

export async function saveUserAddedSubject(user, newAddedUserSubject) {
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

export async function getSubjectInfo(code) {
    try {
        const response = await axios.get(`/api/subject/${code}`);
        if (response.status === 200 && response.data && Object.keys(response.data).length > 0) {
            const belongsToPreDefinedGroup = await subjectBelongToPreDefinedGroup(code);
            return {
                success: true,
                subject: response.data,
                belongsToPreDefinedGroup: belongsToPreDefinedGroup
            };
        }
        return { success: false, subject: null };
    } catch (error) {
        console.error('Error fetching subject info:', error);
        return { success: false, subject: null };
    }
}

export async function deleteUserAddedSubject(user, subjectCode) {
    if (!user) {
        return {
            success: false,
            message: 'É necessário estar logado para remover matérias'
        };
    }

    if (await subjectBelongToPreDefinedGroup(subjectCode)) {
        return {
            success: false,
            message: 'Essa disciplina não foi adicionada pelo usuário, não é possível removê-la.'
        };
    }

    try {
        const response = await axios.delete('/api/user-subjects/remove', {
            data: { "subject_code": subjectCode }
        });
        
        if (response.status === 200 && response.data) {
            return {
                success: response.data.status === 'success',
                message: response.data.message
            };
        } else {
            return {
                success: false,
                message: response.data?.message || 'Erro desconhecido ao remover disciplina'
            };
        }
    } catch (error) {
        console.error('Error deleting user subject:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Erro ao comunicar com o servidor'
        };
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
        groupTitle: newAddedUserSubject.groupTitle,
        subjectCode: newAddedUserSubject.code
    };
    try {
        const response = await axios.post('/api/user-subjects/add', payload);
        if (response.status === 201 && response.data) {
            return {
                success: response.data.status === 'success',
                message: response.data.message,
                subjectData: response.data.subjectData
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