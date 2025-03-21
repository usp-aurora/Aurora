import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import { useDroppable } from "@dnd-kit/core";
import glassmorphismStyle from "../../styles/glassmorphism";
import SubjectList from "./Pieces/SubjectList";

const Container = styled( Box )(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    ...glassmorphismStyle(theme, "level2"),

    padding: theme.spacing(2),
    gap: theme.spacing(2),
    borderRadius: "12px",
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

function SubjectPickerDesktop({ groupsData }) {
    const { setNodeRef } = useDroppable({ id: "subjectPicker" });

    return (
        <Container ref={setNodeRef}>
            <HeaderContainer>
                <StyledTitle>Adicionar disciplina</StyledTitle>
            </HeaderContainer>
            <SubjectList groupsData={groupsData} />
        </Container>
    );
};

export default SubjectPickerDesktop;
