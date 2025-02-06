import React from "react";
import { styled } from "@mui/system";

const Container = styled("div")(({ theme }) => ({
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

function CardContainer({ children }) {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default CardContainer;