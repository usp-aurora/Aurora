import React from "react";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// import CardContainer from "./Auxiliar/CardContainer";

const CardContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",

    position: "relative",

    "&:active": {
      transform: "translateY(2px)",
    },

    width: theme.card.mobile.outerWidth,
    height: theme.card.mobile.outerHeight,
    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.outerWidth,
        height: theme.card.desktop.outerHeight,
    },
}));

const CardBackground = styled(Button)(({ theme, ghost }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
    backgroundColor: ghost ? "transparent" : theme.palette.primary.main,
    
    width: theme.card.mobile.innerWidth,
    height: theme.card.mobile.innerHeight,
    
    textTransform: "none",

    borderRadius: theme.card.desktop.borderRadius,
    border: ghost ? `2px dashed ${theme.palette.neutral.main}` : "none",
    
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: ghost ? "transparent" : theme.palette.primary.dark,
    },
    
    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.innerWidth,
        height: theme.card.desktop.innerHeight,
        borderRadius: theme.card.desktop.borderRadius,
        fontSize: theme.typography.p.fontSize
    }
}));


const StyledIcon = styled(({ component: Component, ...props }) => <Component {...props} />)(({ theme }) => ({
    color: "white",
    fontSize: "60px"
}));

const StyledText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.small.fontSize,

    [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.p.fontSize
    }
}));

const ButtonCard = ({
        icon = "", 
        text = "Arraste uma disciplina", 
        ghost = true}) => {
    return (
        <CardContainer>
            <CardBackground disableRipple ghost={ghost}>                
                {icon && (<StyledIcon component={icon} />)}
                <StyledText component="p">{text}</StyledText>
            </CardBackground>
        </CardContainer>
    );
};

export default ButtonCard;