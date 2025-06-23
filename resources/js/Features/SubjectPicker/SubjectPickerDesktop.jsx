import { memo } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import { useDroppable } from "@dnd-kit/core";
import glassmorphismStyle from "../../styles/glassmorphism";
import SubjectPickerList from "./Components/SubjectPickerList";

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
}));

const MemoizedSubjectPickerList = memo(SubjectPickerList);

function SubjectPickerDesktop() {
    const { setNodeRef } = useDroppable({ id: "subjectPicker" });

    return (
        <Container ref={setNodeRef}>
            <HeaderContainer>
                <StyledTitle>Adicionar disciplina</StyledTitle>
            </HeaderContainer>
            <MemoizedSubjectPickerList/>
        </Container>
    );
};

export default SubjectPickerDesktop;
