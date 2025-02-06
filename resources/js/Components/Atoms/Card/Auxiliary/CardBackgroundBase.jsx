import { styled } from "@mui/material/styles";

const CardBackgroundBase = styled("div")(({ theme, ghost }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
    padding: "0.3rem",
    textAlign: "center",
    
    width: theme.card.mobile.innerWidth,
    height: theme.card.mobile.innerHeight,
    
    userSelect: "none",
    cursor: "pointer",
    
    borderRadius: theme.card.desktop.borderRadius,
    
    backgroundColor: ghost ? "transparent" : theme.palette.primary.main,
    border: ghost ? `2px dashed ${theme.palette.neutral.main}` : "none",
    transition: "background-color 0.3s ease",
    
    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.innerWidth,
        height: theme.card.desktop.innerHeight,
        borderRadius: theme.card.desktop.borderRadius,
        fontSize: theme.typography.p.fontSize
    }
}));


export default CardBackgroundBase;