import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardContainer from "./Components/CardContainer";
import CardBackgroundBase from "./Components/CardBackgroundBase";

const CardBackground = styled(({ isClickable, hasIcon, ghost, theme, ...props }) => (
    <CardBackgroundBase isClickable={isClickable} hasIcon={hasIcon} ghost={ghost} theme={theme} {...props} />
))(({ isClickable, ghost, theme }) => ({    
    "&:hover": {
        backgroundColor: (isClickable && !ghost) ? theme.palette.primary.dark : undefined,
    },
}));

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

function AuxiliaryCard({ Icon, text, clickable, ghost, ...props }){
    return (
        <CardContainer isClickable={clickable} {...props}>
            <CardBackground isClickable={clickable} hasIcon={!!Icon} ghost={ghost}>
                {!!Icon && <StyledIcon Component={Icon} />}
                <StyledText>{text}</StyledText>
            </CardBackground>
        </CardContainer>
    );
};

export default AuxiliaryCard;
