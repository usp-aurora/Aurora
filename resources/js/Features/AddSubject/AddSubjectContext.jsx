import { createContext, useState, useEffect, useContext } from 'react';
import Dialog from '../../ui/Dialog/Dialog'
import Button from '../../ui/Buttons/Button';
import { TextField, MenuItem, Box } from '@mui/material';
import { saveAddedUserSubject } from './utils/addedUserSubjectUtils';
import Alert from '@mui/material/Alert';

const AddSubjectContext = createContext();

function useAddSubjectContext() {
    return useContext(AddSubjectContext);
}

function AddSubjectProvider({ children, user }) {
    const [isAddSubjectModalOpen, setAddSubjectModalOpen] = useState(false);
    const [groupAddSubjectCodeType, setgroupAddSubjectCodeType] = useState([]);

    const showAddSubjectModal = () => {
        setAddSubjectModalOpen(true);
    };

    const closeAddSubjectModal = () => {
        setAddSubjectModalOpen(false);
    };

    const addSubjectToGroup = (subjectCode, subjectType) => {
        setgroupAddSubjectCodeType((prevSubjects) => [...prevSubjects, [subjectCode, subjectType]]);
        closeAddSubjectModal();
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeAddSubjectModal();
            }
        };

        if (isAddSubjectModalOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isAddSubjectModalOpen]);

    return (
        <AddSubjectContext.Provider
            value={{
                isAddSubjectModalOpen,
                showAddSubjectModal,
                closeAddSubjectModal,
                groupAddSubjectCodeType,
                addSubjectToGroup,
                user,
            }}
        >
            {children}
        </AddSubjectContext.Provider>
    );
}

function AddSubjectForm({ isDesktopDialog = false }) {
    const { addSubjectToGroup, user } = useAddSubjectContext();
    const [formData, setFormData] = useState({
        code: '',
        group_name: '',
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

    const handleAddClick = async () => {
        console.log('Adding subject:', formData);
        const result = await saveAddedUserSubject(user, formData);
        if (result.success) {
            addSubjectToGroup(formData.code, formData.group_name);
        } else {
            console.error('Failed to add user subject:', result.message);
            setError(result.message || 'Erro desconhecido');
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} p={1}>
            <TextField 
                fullWidth 
                label="Código" 
                name="code"
                placeholder="Digite aqui..." 
                variant="outlined" 
                value={formData.code}
                onChange={handleInputChange}
                sx={{
                    '& .MuiInputBase-input': {
                        color: '#fff',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#fff',
                        opacity: 0.5,
                    },
                }}
            />
            <Box display="flex" alignItems="center" gap={2} sx={{width: isDesktopDialog ? '100%' : undefined}}>
                <TextField
                    fullWidth
                    select
                    label="Tipo de disciplina"
                    name="group_name"
                    variant="outlined"
                    value={formData.group_name}
                    onChange={handleInputChange}
                    sx={{
                        height: "56px",
                        minWidth: isDesktopDialog ? '285px' : undefined,
                        flexGrow: 1,
                        '& .MuiSelect-select': {
                            color: "#fff"
                        },
                    }}
                >
                    <MenuItem value="Outras Optativas" style={{ color: 'black' }}>Outras Optativas</MenuItem>
                    <MenuItem value="Optativas de Estatística" style={{ color: 'black' }}>Optativas de Estatística</MenuItem>
                    <MenuItem value="Optativas de Humanidades" style={{ color: 'black' }}>Optativas de Humanidades</MenuItem>
                    <MenuItem value="Optativas de Ciências" style={{ color: 'black' }}>Optativas de Ciências</MenuItem>
                    <MenuItem value="Optativas Livres" style={{ color: 'black' }}>Optativas Livres</MenuItem>
                </TextField>
                {isDesktopDialog && (
                    <Button variant="contained" color="primary" onClick={handleAddClick}>
                        Adicionar
                    </Button>
                )}
            </Box>
            {!isDesktopDialog && (
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Adicionar
                </Button>
            )}
            {showError && (
                <Alert variant="filled" severity="error" sx={{ backgroundColor: '#d32f2f', color: '#fff' }}>{error || 'This is an error Alert.'}</Alert>
            )}
        </Box>
    );
}

function AddSubjectDialogMobile() {
    const { isAddSubjectModalOpen, closeAddSubjectModal } = useAddSubjectContext();
    return (
        <Dialog
            title="ADICIONAR DISCIPLINA"
            content={<AddSubjectForm isDesktopDialog={false} />}
            open={isAddSubjectModalOpen}
            onClose={closeAddSubjectModal}
        />
    );
}

function AddSubjectDialogDesktop() {
    const { isAddSubjectModalOpen, closeAddSubjectModal } = useAddSubjectContext();
    return (
        <Dialog
            title="ADICIONAR DISCIPLINA"
            content={<AddSubjectForm isDesktopDialog={true} />}
            open={isAddSubjectModalOpen}
            onClose={closeAddSubjectModal}
        />
    );
}

export { AddSubjectProvider, useAddSubjectContext, AddSubjectDialogDesktop, AddSubjectDialogMobile, AddSubjectForm };