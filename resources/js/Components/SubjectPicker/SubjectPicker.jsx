import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import glassmorphismStyle from "../../styles/glassmorphism";
import Droppable from "../Dnd/Droppable";
import Group from "./Group";
import Background from "../Background/HomeBackground";

import { useSubjectPickerContext } from '../../Hooks/useSubjectPickerContext';

const PopUpContainer = styled(Box)(({ open, theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: open ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: theme.zIndex.subjectPicker,
        overflowY: "auto",
    }
}));

const Container = styled(Droppable)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.spacing(2),

    margin: theme.spacing(1),
    marginTop: theme.spacing(2),

    [theme.breakpoints.up("sm")]: {
        ...glassmorphismStyle(theme, "level2"),
        margin: 0,
        padding: theme.spacing(2),
        borderRadius: "12px",
    },
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

    ...theme.typography.h4,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h2,
    },
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
    display: "block",
    color: theme.palette.white.main,
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

const GroupContainers = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    paddingBottom: "100vh",
    overflowY: "auto",
    gap: theme.spacing(2),

    borderRadius: "12px",

    "&::-webkit-scrollbar": {
        width: "3px",
    },
    "&::-webkit-scrollbar-track": {
        background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#C9CBCA",
        borderRadius: "10px",
        height: "100px",
        visibility: "hidden", 
    },
    "&:hover::-webkit-scrollbar-thumb": {
        visibility: "visible", 
    },
    "&::-webkit-scrollbar-thumb:hover": {
        visibility: "visible", 
    },
}));

function SubjectPicker({ subjectDataMap, plannedSubjects, data }) {
    const { isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal } = useSubjectPickerContext();

    const [expandedCategories, setExpandedCategories] = useState(
        data.subgroups.map(group => group.title === "Obrigatórias")
    );
    const toggleCategory = (index) => {
        const newExpandedCategories = [...expandedCategories];
        newExpandedCategories[index] = !newExpandedCategories[index];
        setExpandedCategories(newExpandedCategories);
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <PopUpContainer open={isSubjectPickerModalOpen}>
            <Container id="subjectPicker">
                {isMobile && <Background />}
                <HeaderContainer>
                    <StyledTitle>Adicionar disciplina</StyledTitle>
                    <StyledCloseIcon onClick={closeSubjectPickerModal} />
                </HeaderContainer>
                {/* Algum dia vai ter um search bar bem aqui */}
                <GroupContainers>
                    {data.subgroups.map((groupData, index) => (
                        <Group
                            key={groupData.title}
                            groupData={groupData}
                            subjectDataMap={subjectDataMap}
                            plannedSubjects={plannedSubjects}
                            expanded={expandedCategories[index]}
                            onClick={() => toggleCategory(index)}
                        />
                    ))}
                </GroupContainers>
            </Container>
        </PopUpContainer>
    );
};

export default SubjectPicker;
