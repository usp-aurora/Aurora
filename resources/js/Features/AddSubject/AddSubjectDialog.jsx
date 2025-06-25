import { useState } from 'react';
import { TextField, MenuItem, Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

import Dialog from '../../ui/Dialog/Dialog'
import Button from '../../ui/Buttons/Button';
import { useAddSubjectContext } from './AddSubjectContext';
import { useSubjectMapContext } from '../../Contexts/SubjectMapContext';
import { useAuthContext } from '../../Contexts/AuthContext';
import { saveUserAddedSubject } from './utils/addedUserSubjectUtils';
import { useGroupsContext } from '../../Contexts/GroupsContext';

const ContentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 8,
});

const SubjectCodeTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: '#fff',
    },
    '& .MuiInputBase-input::placeholder': {
        color: '#fff',
        opacity: 0.5,
    },
});

const StyledInputRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    width: '100%'
}));

const GroupSelect = styled(TextField)(({ theme }) => ({
    height: '56px',
    flexGrow: 1,
    '& .MuiSelect-select': {
        color: '#fff',
    },
}));

const StyledMenuItem = styled(MenuItem)({
    color: 'black',
});


function AddSubjectDialog() {
    const { isAddSubjectModalOpen, closeAddSubjectModal } = useAddSubjectContext();

    const { changeSubjectGroup, addNewSubjectData, subjectDataMap } = useSubjectMapContext();
    const { addSubjectToGroup, removeSubjectFromGroup } = useGroupsContext();
    const { user } = useAuthContext();

    const [formData, setFormData] = useState({
        code: '',
        groupName: '',
    });
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const HandleAdd = async () => {
        if (!formData.code || !formData.groupName) {
            setError('Por favor, preencha todos os campos.');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        const result = await saveUserAddedSubject(user, formData);
        
        if (result.success) {
            subjectData = subjectDataMap[formData.code];
            if (subjectData) {
                console.log("Subject: ", subjectData);
                // mudar grupo no mapa de matérias
                // remover do grupo anterior, 
                // adicionar no grupo novo
            }
            else {
                // adicionar no mapa de matérias com o grupo novo
                // adicionar no grupo novo

                let subjectData = null;
                try {
                    const response = await fetch(`/api/subject/${formData.code}`);
                    if (response.ok) {
                        subjectData = await response.json();
                    }
                } catch (e) {
                    console.error('Erro ao buscar dados da disciplina:', e);
                    return;
                }
                console.log("Subject Data: ", subjectData);
                // addNewSubjectData({
                //     code: formData.code,
                //     groups: [formData.groupName],
                //     name: , // Assuming the name is the same as the code
                //     credits: 0, // Default value, can be adjusted later
                // })
            }
            
            // changeSubjectGroup
            addSubjectToGroup(formData.code, formData.groupName);
            closeAddSubjectModal();
        } else {
            console.error('Failed to add user subject:', result.message);
            setError(result.message || 'Erro desconhecido');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    const DialogContent =
        (
            <ContentContainer>
                <SubjectCodeTextField
                    fullWidth
                    label="Código"
                    name="code"
                    placeholder="Digite aqui..."
                    variant="outlined"
                    value={formData.code}
                    onChange={handleInputChange}
                />
                <StyledInputRow>
                    <GroupSelect
                        fullWidth
                        select
                        label="Tipo de disciplina"
                        name="groupName"
                        variant="outlined"
                        value={formData.groupName}
                        onChange={handleInputChange}
                    >
                        <StyledMenuItem value="Outras Optativas Eletivas">Outras Optativas Eletivas</StyledMenuItem>
                        <StyledMenuItem value="Optativas de Estatística">Optativas de Estatística</StyledMenuItem>
                        <StyledMenuItem value="Optativas de Humanidades">Optativas de Humanidades</StyledMenuItem>
                        <StyledMenuItem value="Optativas de Ciências">Optativas de Ciências</StyledMenuItem>
                        <StyledMenuItem value="Optativas Livres">Optativas Livres</StyledMenuItem>
                    </GroupSelect>
                </StyledInputRow>
                {showError && (
                    <Alert variant="filled" severity="error">
                        {error}
                    </Alert>
                )}
            </ContentContainer>
        );

    const DialogActions = (
        <>
            <Button variant="contained" color="primary" onClick={HandleAdd}>
                Adicionar
            </Button>
        </>
    );

    return (
        <Dialog
            open={isAddSubjectModalOpen}
            onClose={closeAddSubjectModal}
            title={"Adicionar Disciplina"}
            content={DialogContent}
            actions={DialogActions}
        />
    )
}

export default AddSubjectDialog