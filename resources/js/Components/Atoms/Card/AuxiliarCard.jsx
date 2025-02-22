import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import CardContainer from "./Pieces/CardContainer";
import CardBackgroundBase from "./Pieces/CardBackgroundBase";

const CardBackground = styled(({ ...props }) => (
    <CardBackgroundBase {...props} />
))(({ theme, ghost }) => ({
    "&:hover": {
        backgroundColor: ghost ? "transparent" : theme.palette.primary.dark,
    },
}));

const StyledIcon = styled(({ component: Component, ...props }) => (
    <Component {...props} />
))(() => ({
    color: "white",
    fontSize: "60px",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,

    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
    },
}));

function ButtonCard({ Icon, text, ghost, ...props }){
    return (
        <CardContainer {...props}>
            <CardBackground hasIcon={!!Icon} ghost={ghost}>
                {!!Icon && <StyledIcon component={Icon} />}
                <StyledText>{text}</StyledText>
            </CardBackground>
        </CardContainer>
    );
};

export default ButtonCard;
