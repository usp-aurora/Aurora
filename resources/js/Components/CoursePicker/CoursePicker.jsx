import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Group from "./Group";
import CloseIcon from '@mui/icons-material/Close'; 
import glassmorphismStyle from "../../styles/MUI/glassmorphismMUI";

const PlaceholderBackground = styled("div")(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#1A1C24",
    zIndex: -1,

    [theme.breakpoints.up("sm")]: {
        display: "none",
    }
}));

const PopUpContainer = styled("div")(({ open, theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: open ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999
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

    [theme.breakpoints.up("sm")]: {
        ...glassmorphismStyle(theme, "level2"),
        margin: 0,
        padding: theme.spacing(2),
        minHeight: "93vh",
        borderRadius: "12px"
    }
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
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

const CoursePicker = ({ open, data }) => {
    return (
        <PopUpContainer open={open}>
            <Container>
                <PlaceholderBackground />
                <HeaderContainer>
                    <StyledTitle>Adicionar disciplina</StyledTitle>
                    <StyledCloseIcon/>
                </HeaderContainer>
                {/* Algum dia vai ter um search bar bem aqui */}
                {data.subgrupos.map((group) => (
                    <Group data={group}/>
                ))}
            </Container>
        </PopUpContainer>
    );
};

export default CoursePicker;
