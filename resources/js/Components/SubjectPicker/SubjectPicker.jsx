import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Typography, useMediaQuery} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import glassmorphismStyle from "../../styles/MUI/glassmorphismMUI";
import Group from "./Group";
import Background from "../Background/HomeBackground";

import { useDroppable } from "@dnd-kit/core";
import { useSubjectPickerContext } from '../../Hooks/useSubjectPickerContext';

const PopUpContainer = styled("div")(({ open, theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: open ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        overflowY: "auto",
    },
    [theme.breakpoints.up("sm")] :{
        width: "36%",
    }
}));
const Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.spacing(2),

    margin: theme.spacing(1),
    marginTop: theme.spacing(2),

    maxHeight: "200vh",
    overflowY: "auto",

    [theme.breakpoints.up("sm")]: {
        ...glassmorphismStyle(theme, "level2"),
        margin: 0,
        padding: theme.spacing(2),
        minHeight: "93vh",
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

function SubjectPicker({ data, plannedSubjects }){
    const { isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal } = useSubjectPickerContext();
    const { setNodeRef } = useDroppable({ id: "subjectPicker" });
    
    const [expandedCategory, setExpandedCategory] = useState(); 
    const toggleCategory = (index) => {
        setExpandedCategory((prevCategory) => 
            (prevCategory === index) ? null : index);
    }

    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <PopUpContainer open={isSubjectPickerModalOpen}>
            <Container ref={setNodeRef}>
                {isMobile && <Background />}
                <HeaderContainer>
                    <StyledTitle>Adicionar disciplina</StyledTitle>
                    <StyledCloseIcon onClick={closeSubjectPickerModal}/>
                </HeaderContainer>
                {/* Algum dia vai ter um search bar bem aqui */}
                {data.subgroups.map((groupData, index) => (
                    <Group
                        key={groupData.title}
                        groupData={groupData}
                    	plannedSubjects={plannedSubjects}
                        expanded={expandedCategory === index}
                        onClick={() => toggleCategory(index)}
                    />
                ))}
            </Container>
        </PopUpContainer>
    );
};

export default SubjectPicker;
