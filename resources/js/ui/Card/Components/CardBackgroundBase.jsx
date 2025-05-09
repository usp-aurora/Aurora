import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardBackgroundBase = styled(({ isClickable, hasIcon, ghost, theme, ...props }) => (
    <Box {...props} />
))(({ isClickable, hasIcon, ghost, theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    padding: hasIcon ? "0px 8px 8px 8px" : "8px",
    textAlign: "center",

    userSelect: "none",
    cursor: isClickable ? "pointer" : "default",

    backgroundColor: ghost ? "transparent" : theme.palette.primary.main,
    outline: ghost ? `2px dashed ${theme.palette.neutral.main}` : "none",
    transition: "background-color 0.3s ease",

    width: theme.card.mobile.innerWidth,
    height: theme.card.mobile.innerHeight,
    borderRadius: theme.card.desktop.borderRadius,

    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.innerWidth,
        height: theme.card.desktop.innerHeight,
        borderRadius: theme.card.desktop.borderRadius,
    },
}));

export default CardBackgroundBase;