import { memo } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconWrapper from "../../ui/Icons/IconWrapper"

import { useDroppable } from "@dnd-kit/core";
import glassmorphismStyle from "../../styles/glassmorphism";
import SubjectPickerList from "./Components/SubjectPickerList";

import { useAddSubjectContext } from "../AddSubject/AddSubjectContext";

const Container = styled( Box )(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    ...glassmorphismStyle(theme, "level2"),
    
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    borderRadius: "12px",
    height: "100%",
}));

const HeaderContainer = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",
    ...theme.typography.h2,
    alignSelf: "center",
}));

const AddButton = ({ onClick }) => {
    return (
        <IconWrapper
            Icon={AddIcon}
            style={{
                color: "white",
                alignSelf: "center",
                cursor: "pointer",
            }}
            onClick={onClick}
        />
    );
};

const MemoizedSubjectPickerList = memo(SubjectPickerList);

function SubjectPickerDesktop() {
    const { setNodeRef } = useDroppable({ id: "subjectPicker" });
    const { showAddSubjectModal } = useAddSubjectContext();

    return (
        <Container ref={setNodeRef}>
            <HeaderContainer>
                <StyledTitle>Adicionar disciplina</StyledTitle>
                <AddButton onClick={ showAddSubjectModal }></AddButton>
            </HeaderContainer>
            <MemoizedSubjectPickerList/>
        </Container>
    );
};

export default SubjectPickerDesktop;
