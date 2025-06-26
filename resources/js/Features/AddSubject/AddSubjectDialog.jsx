import { useState } from 'react';
import { TextField, MenuItem, Box, Stack, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

import Dialog from '../../ui/Dialog/Dialog'
import Button from '../../ui/Buttons/Button';
import { useAddSubjectContext } from './AddSubjectContext';
import { useSubjectMapContext } from '../../Contexts/SubjectMapContext';
import { useAuthContext } from '../../Contexts/AuthContext';
import { saveUserAddedSubject, getSubjectInfo, deleteUserAddedSubject } from './utils/addedUserSubjectUtils';
import { useGroupsContext } from '../../Contexts/GroupsContext';

const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 8,
}));

const SubjectCodeTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: '#fff',
    },
    '& .MuiInputBase-input::placeholder': {
        color: '#fff',
        opacity: 0.5,
    },
});

const StyledInputRow = styled(Box)(({ }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    width: '100%'
}));

const SearchInputContainer = styled(Box)({
    position: 'relative',
    width: '100%',
});

const SearchButton = styled(IconButton)({
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#fff',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

const SubjectInfoContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));

const SubjectInfoText = styled(Typography)({
    color: '#fff',
    marginBottom: '8px',
});

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

    const { changeSubjectGroup, addNewSubjectData, subjectDataMap, removeSubjectData } = useSubjectMapContext();
    const { addSubjectToGroup, removeSubjectFromGroup, moveSubjectBetweenGroups } = useGroupsContext();
    const { user } = useAuthContext();

    const [formData, setFormData] = useState({
        code: '',
        groupTitle: '',
    });
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [subjectInfo, setSubjectInfo] = useState(null);
    const [isSubjectSearched, setIsSubjectSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleCodeChange = (event) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            code: value.trim(),
        }));
    };

    const handleGroupTitleChange = (event) => {
        const { value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            groupTitle: value,
        }));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        }
    };

    const handleSearch = async () => {
        if (!formData.code) {
            setError('Por favor, digite um código de disciplina.');
            setShowError(true);
            return;
        }

        setIsSearching(true);
        setError(null);
        setShowError(false);

        try {
            const result = await getSubjectInfo(formData.code.toUpperCase());
            if (result.success) {
                const subjectCode = Object.keys(result.subject)[0];
                const subjectData = Object.values(result.subject)[0];
                const isSubjectAdded = subjectDataMap[subjectCode] ? true : false;
                setSubjectInfo({ ...subjectData, code: subjectCode, belongsToPreDefinedGroup: result.belongsToPreDefinedGroup, isAdded: isSubjectAdded });
                setIsSubjectSearched(true);
            } else {
                setError('Disciplina não encontrada. Verifique o código e tente novamente.');
                setShowError(true);
                setIsSubjectSearched(false);
                setSubjectInfo(null);
            }
        } catch (error) {
            console.error('Error searching subject:', error);
            setError('Erro ao buscar disciplina. Tente novamente.');
            setShowError(true);
            setIsSubjectSearched(false);
            setSubjectInfo(null);
        } finally {
            setIsSearching(false);
        }
    };

    const handleCloseError = () => {
        setShowError(false);
        setError(null);
    };

    const HandleAdd = async () => {
        const requestData = {
            code: subjectInfo.code,
            groupTitle: formData.groupTitle
        };

        const result = await saveUserAddedSubject(user, requestData);
        if (result.success) {
            const newSubjectData = result.subjectData;
            if (subjectInfo.isAdded) {
                moveSubjectBetweenGroups(subjectInfo.code, subjectInfo.groups[0].title, requestData.groupTitle);
                changeSubjectGroup(subjectInfo.code, newSubjectData[subjectInfo.code].groups[0]);
            }
            else {
                addNewSubjectData(newSubjectData);
                addSubjectToGroup(subjectInfo.code, requestData.groupTitle);
            }

            setFormData({ code: '', groupTitle: '' });
            setSubjectInfo(null);
            setIsSubjectSearched(false);
            closeAddSubjectModal();
        } else {
            console.error('Failed to add user subject:', result.message);
            setError(result.message || 'Erro desconhecido');
            setShowError(true);
        }
    };

    const HandleRemove = async () => {
        const currentGroupTitle = subjectInfo.groups && subjectInfo.groups.length > 0
            ? subjectInfo.groups[0].title
            : null;

        if (!currentGroupTitle) {
            setError('Não foi possível determinar o grupo da disciplina.');
            setShowError(true);
            return;
        }

        const result = await deleteUserAddedSubject(user, subjectInfo.code, currentGroupTitle);
        if (result.success) {
            removeSubjectFromGroup(subjectInfo.code, currentGroupTitle);
            removeSubjectData(subjectInfo.code);

            setFormData({ code: '', groupTitle: '' });
            setSubjectInfo(null);
            setIsSubjectSearched(false);
            closeAddSubjectModal();
        } else {
            console.error('Failed to remove user subject:', result.message);
            setError(result.message || 'Erro desconhecido');
            setShowError(true);
        }
    };


    const DialogContent =
        (
            <ContentContainer>
                <SearchInputContainer>
                    <SubjectCodeTextField
                        fullWidth
                        label="Código"
                        name="code"
                        placeholder="Digite aqui..."
                        variant="outlined"
                        value={formData.code}
                        onChange={handleCodeChange}
                        onKeyDown={handleKeyPress}
                        disabled={isSearching}
                    />
                    <SearchButton
                        onClick={handleSearch}
                        disabled={isSearching || !formData.code.trim()}
                        title="Buscar disciplina"
                    >
                        <SearchIcon />
                    </SearchButton>
                </SearchInputContainer>

                {subjectInfo && isSubjectSearched && (
                    <SubjectInfoContainer>
                        <SubjectInfoText variant="h6">
                            {/* Get the first value of subjectInfo and access its name */}
                            {subjectInfo.name}
                        </SubjectInfoText>
                        <SubjectInfoText variant="body2">
                            {subjectInfo.code + ", " + subjectInfo.credits[0] + " créditos aula + " + subjectInfo.credits[1] + " créditos trabalho"}
                        </SubjectInfoText>
                        <SubjectInfoText variant="body2">
                            Grupos:&nbsp;
                            {subjectInfo.groups && subjectInfo.groups.length > 0 ? (
                                subjectInfo.groups.map((group, idx) => (
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        key={group.title}
                                    >
                                        {group.title + ", "}
                                    </Typography>
                                ))
                            ) : (
                                <span style={{ color: '#ccc' }}>Nenhum grupo</span>
                            )}
                        </SubjectInfoText>
                        <SubjectInfoText variant="body2">
                            {subjectInfo.belongsToPreDefinedGroup && "Matéria pré-definida, não é possível alterar o grupo"}
                        </SubjectInfoText>
                    </SubjectInfoContainer>
                )}

                {isSubjectSearched && !subjectInfo.belongsToPreDefinedGroup && (
                    <StyledInputRow>
                        <GroupSelect
                            fullWidth
                            select
                            label="Tipo de disciplina"
                            name="groupTitle"
                            variant="outlined"
                            value={formData.groupTitle}
                            onChange={handleGroupTitleChange}
                            disabled={!isSubjectSearched}
                        >
                            <StyledMenuItem value="Outras Optativas Eletivas">Outras Optativas Eletivas</StyledMenuItem>
                            <StyledMenuItem value="Optativas de Estatística">Optativas de Estatística</StyledMenuItem>
                            <StyledMenuItem value="Optativas de Humanidades">Optativas de Humanidades</StyledMenuItem>
                            <StyledMenuItem value="Optativas de Ciências">Optativas de Ciências</StyledMenuItem>
                            <StyledMenuItem value="Optativas Livres">Optativas Livres</StyledMenuItem>
                        </GroupSelect>
                    </StyledInputRow>
                )}

                {showError && (
                    <Alert
                        variant="filled"
                        severity="error"
                        sx={{ width: '100% !important' }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleCloseError}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {error}
                    </Alert>
                )}
            </ContentContainer>
        );

    const DialogActions = (
        <>
            {isSubjectSearched && !subjectInfo.belongsToPreDefinedGroup && (
                <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, width: '100%', padding: 2 }}>
                    {subjectInfo.isAdded && (
                        <Button
                            variant="contained"
                            color="error"
                            onClick={HandleRemove}
                        >
                            Remover
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={HandleAdd}
                    >
                        {subjectInfo.isAdded ? "Alterar" : "Salvar"}
                    </Button>
                </Box>
            )}
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