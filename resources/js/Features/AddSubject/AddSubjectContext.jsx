import { createContext, useContext, useState, useEffect } from 'react';
import Dialog from '../../ui/Dialog/Dialog'
import Button from '../../ui/Buttons/Button';
import { TextField, MenuItem, Box } from '@mui/material';
import axios from 'axios';

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
        console.log("prevSubjects", groupAddSubjectCodeType);
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

    const saveSubjectWithServer = async (subjectData) => {
        try {
            const response = await axios.post('/api/user-own-subjects', subjectData, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            if (response.status === 200) {
                return response.status;
            } else {
                console.error('Server synchronization failed:', response.data);
            }
        } catch (error) {
            console.error('Error communicating with the server:', error);
        }
        return null;
    };

    const handleAddClick = async () => {
        console.log('Adding subject:', formData);
        // addSubjectToGroup(formData.code, formData.type);
        const subjectData = {
            code: formData.code,
            name: formData.name,
            syllabus: formData.name, // Add a field for syllabus if you want user input
            lecture_credits: formData.creditsClass,
            work_credits: formData.creditsWork,
        };
        const result = await saveSubjectWithServer(subjectData);
        if (result == 200) {
            console.log('Subject added successfully');
            addSubjectToGroup(formData.code, "Livres");
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
            <Button variant="contained" color="primary" onClick={handleAddClick}>
                Adicionar
            </Button>
        </Box>
    );
}

function AddSubjectDialog() {
    const { isAddSubjectModalOpen, closeAddSubjectModal } = useAddSubjectContext();
    // TODO: return a diferent dialog to mobile
    return (
        <Dialog
            title="ADICIONAR DISCIPLINA AO GRUPO DE OPTATIVAS LIVRES"
            content={<AddSubjectForm />}
            open={isAddSubjectModalOpen}
            onClose={closeAddSubjectModal}
        />
    );
}

export { AddSubjectProvider, useAddSubjectContext, AddSubjectDialog, AddSubjectForm };