import { styled } from "@mui/material/styles";
import { Box, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Background from "../Background/HomeBackground";
import SubjectPickerList from "./Components/SubjectPickerList";
import { useSubjectPickerContext } from './SubjectPickerContext';


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
    alignItems: "flex-start",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",

    ...theme.typography.h4
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
    display: "block",
    color: theme.palette.white.main,
    cursor: "pointer"
}));

function SubjectPicker() {
    const { isSubjectPickerModalOpen, closeSubjectPickerModal } = useSubjectPickerContext();
    return (
        <ModalContainer
			open={isSubjectPickerModalOpen}
			onClose={closeSubjectPickerModal}>
            <>
                <Background />
                <HeaderContainer>
                    <StyledTitle>Adicionar disciplina</StyledTitle>
                    <StyledCloseIcon onClick={closeSubjectPickerModal} />
                </HeaderContainer>
                <SubjectPickerList/>
            </>
        </ModalContainer>
    );
};

export default SubjectPicker;
