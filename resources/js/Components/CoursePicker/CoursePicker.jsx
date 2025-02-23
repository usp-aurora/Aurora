import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Typography, useMediaQuery} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import glassmorphismStyle from "../../styles/MUI/glassmorphismMUI";
import Droppable from "../Dnd/Droppable";
import Group from "./Group";
import Background from "../Background/HomeBackground";

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

function CoursePicker({ courseMap, data }){
    const { isSubjectPickerModalOpen, closeSubjectPickerModal, showSubjectPickerModal } = useSubjectPickerContext();
    
    const [expandedCategories, setExpandedCategories] = useState(data.subgroups.map(() => true)); 
    const toggleCategory = (index) => {
        const newExpandedCategories = [...expandedCategories];
        newExpandedCategories[index] = !newExpandedCategories[index];
        setExpandedCategories(newExpandedCategories);
    }

    const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <PopUpContainer open={isSubjectPickerModalOpen}>
            <Container id="coursePicker">
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
                            courseMap={courseMap}
                            expanded={expandedCategories[index]}
                            onClick={() => toggleCategory(index)}
                        />
                    ))}
            </Container>
        </PopUpContainer>
    );
};

export default CoursePicker;
