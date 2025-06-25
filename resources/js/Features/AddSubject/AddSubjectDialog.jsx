import Dialog from '../../ui/Dialog/Dialog'
import Button from '../../ui/Buttons/Button';
import { TextField, MenuItem, Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useAddSubjectContext } from './AddSubjectContext';
import { useSubjectMapContext } from '../../Contexts/SubjectMapContext';

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
    
    const { changeSubjectGroup } = useSubjectMapContext();
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
        
        const result = await saveAddedUserSubject(user, formData);
        if (result.success) {
            addSubjectToGroup(formData.code, formData.groupName);
            refreshSubjectMapSubject(formData.code, formData.groupName);
            closeAddSubjectModal();
        } else {
            console.error('Failed to add user subject:', result.message);
            setError(result.message || 'Erro desconhecido');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    return (
        <Dialog open={isAddSubjectModalOpen} onClose={closeAddSubjectModal} maxWidth="sm" fullWidth>
            <DialogTitle>Adicionar Disciplina</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={HandleAdd}>
                    Adicionar
                </Button>
                <Button onClick={closeAddSubjectModal} color="secondary">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddSubjectDialog