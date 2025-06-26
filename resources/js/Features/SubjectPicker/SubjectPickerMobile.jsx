import { styled } from "@mui/material/styles";
import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import IconWrapper from "../../ui/Icons/IconWrapper"

import Background from "../Background/HomeBackground";
import SubjectPickerList from "./Components/SubjectPickerList";
import { useSubjectPickerContext } from './SubjectPickerContext';
import { useAddSubjectContext } from "../AddSubject/AddSubjectContext";
import { useAuthContext } from "../../Contexts/AuthContext";


const ModalContainer = styled(Modal)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.spacing(2),

    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
}));

const HeaderContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
}));

const IconContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "16px", // Space between AddIcon and CloseIcon
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",
    ...theme.typography.h4,
    alignSelf: "center",
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
    display: "block",
    color: theme.palette.white.main,
    cursor: "pointer",
    alignSelf: "center",
}));

function SubjectPicker() {
    const { isSubjectPickerModalOpen, closeSubjectPickerModal } = useSubjectPickerContext();
    const { showAddSubjectModal } = useAddSubjectContext();
    const { user } = useAuthContext();

    return (
        <ModalContainer
            open={isSubjectPickerModalOpen}
            onClose={closeSubjectPickerModal}>
            <>
                <Background />
                <HeaderContainer>
                    <StyledTitle>Adicionar disciplina</StyledTitle>
                    <IconContainer>
                        <IconWrapper
                            Icon={AddIcon}
                            onClick={showAddSubjectModal}
                            toolTipText={user ? "Adicionar disciplina" : "Faça login para adicionar novas disciplinas"}
                            disabled={!user}
                        />
                        <StyledCloseIcon onClick={closeSubjectPickerModal} />
                    </IconContainer>
                </HeaderContainer>
                <SubjectPickerList />
            </>
        </ModalContainer>
    );
};

export default SubjectPicker;
