import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { CardBackgroundBase, CardContainer} from "./Pieces/CardPieces";

const CardBackground = styled(({ isClickable, hasIcon, ghost, ...props }) => (
    <CardBackgroundBase ghost={ghost} hasIcon={hasIcon} isClickable={isClickable} {...props} />
))(({ isClickable, ghost, theme }) => {
    const styles = {};

    if (isClickable && !ghost) {
        styles["&:hover"] = {
            backgroundColor: theme.palette.primary.dark,
        };
    }

    return styles;
});

const StyledIcon = styled(({ Component, ...props }) => (
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

function AuxiliaryCard({ isClickable, Icon, text, ghost, ...props }){
    return (
        <CardContainer isClickable={isClickable} {...props}>
            <CardBackground isClickable={isClickable} hasIcon={!!Icon} ghost={ghost}>
                {!!Icon && <StyledIcon Component={Icon} />}
                <StyledText>{text}</StyledText>
            </CardBackground>
        </CardContainer>
    );
};

export default AuxiliaryCard;
