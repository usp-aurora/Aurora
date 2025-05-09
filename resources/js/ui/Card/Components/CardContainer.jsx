import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import clickEffect from "../../../styles/animations/clickEffect";

const CardContainer = styled(({ isClickable, theme, ...props }) => (
    <Box {...props}/>
))(({ isClickable, theme }) => ({
    ...(isClickable && clickEffect),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",

    position: "relative",

    width: theme.card.mobile.outerWidth,
    height: theme.card.mobile.outerHeight,
    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.outerWidth,
        height: theme.card.desktop.outerHeight,
    },
}));


export default CardContainer;
