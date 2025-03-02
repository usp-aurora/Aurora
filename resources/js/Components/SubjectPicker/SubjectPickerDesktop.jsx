import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import glassmorphismStyle from "../../styles/glassmorphism";
import Droppable from "../Dnd/Droppable";
import SubjectList from "./Pieces/SubjectList";

const Container = styled(Droppable)(({ theme }) => ({
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

function SubjectPickerDesktop({ subjectDataMap, plannedSubjects, data }) {
    return (
        <Container id="subjectPicker">
            <HeaderContainer>
                <StyledTitle>Adicionar disciplina</StyledTitle>
            </HeaderContainer>
            <SubjectList subjectDataMap={subjectDataMap} plannedSubjects={plannedSubjects} data={data} />
        </Container>
    );
};

export default SubjectPickerDesktop;
