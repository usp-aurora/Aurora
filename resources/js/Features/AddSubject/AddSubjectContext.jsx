import { createContext, useContext, useState, useEffect } from 'react';
import Dialog from '../../ui/Dialog/Dialog'
import Button from '../../ui/Buttons/Button';
import { TextField, MenuItem, Box } from '@mui/material';

const AddSubjectContext = createContext();

function AddSubjectProvider({ children }) {
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
            }}
        >
            {children}
        </AddSubjectContext.Provider>
    );
}

function useAddSubjectContext() { return useContext(AddSubjectContext) }

function AddSubjectForm() {
    const { addSubjectToGroup } = useAddSubjectContext();
    const [formData, setFormData] = useState({
        code: '',
        name: '',
        creditsClass: '',
        creditsWork: '',
        type: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddClick = () => {
        console.log('Adding subject:', formData);
        addSubjectToGroup(formData.code, formData.type);
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
            />
            <TextField
                fullWidth
                label="Nome"
                name="name"
                placeholder="Digite aqui..."
                variant="outlined"
                value={formData.name}
                onChange={handleInputChange}
            />
            <Box display="flex" gap={2}>
                <TextField
                    fullWidth
                    label="Créditos-aula"
                    name="creditsClass"
                    placeholder="Digite aqui..."
                    variant="outlined"
                    value={formData.creditsClass}
                    onChange={handleInputChange}
                />
                <TextField
                    fullWidth
                    label="Créditos-trabalho"
                    name="creditsWork"
                    placeholder="Digite aqui..."
                    variant="outlined"
                    value={formData.creditsWork}
                    onChange={handleInputChange}
                />
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
                <TextField
                    fullWidth
                    select
                    label="Tipo de disciplina"
                    name="type"
                    placeholder="Digite aqui..."
                    variant="outlined"
                    value={formData.type}
                    onChange={handleInputChange}
                    sx={{
                        height: "56px",
                        '& .MuiInputBase-root': {
                            padding: "0 14px",
                        },
                    }}
                >
                    <MenuItem value="Trilha de Inteligência Artificial">Trilha de Inteligência Artificial</MenuItem>
                    <MenuItem value="Trilha de Sistemas de Software">Trilha de Sistemas de Software</MenuItem>
                    <MenuItem value="Trilha de Teoria da Computação">Trilha de Teoria da Computação</MenuItem>
                    <MenuItem value="Ciência de Dados">Ciência de Dados</MenuItem>
                    <MenuItem value="Obrigatórias">Obrigatórias</MenuItem>
                </TextField>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Adicionar
                </Button>
            </Box>
        </Box>
    );
}

function AddSubjectDialog() {
    const { isAddSubjectModalOpen, closeAddSubjectModal } = useAddSubjectContext();
    // TODO: return a diferent dialog to mobile
    return (
        <Dialog
            title="ADICIONAR DISCIPLINA"
            content={<AddSubjectForm />}
            open={isAddSubjectModalOpen}
            onClose={closeAddSubjectModal}
        />
    );
}

export { AddSubjectProvider, useAddSubjectContext, AddSubjectDialog, AddSubjectForm };