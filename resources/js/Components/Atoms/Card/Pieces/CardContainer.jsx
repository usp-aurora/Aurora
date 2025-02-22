import React from "react";
import { styled } from "@mui/material/styles";
import clickEffect from "../../../../styles/clickEffect";
import { Box } from "@mui/material";

const Container = styled( Box )(({ theme }) => ({
    ...clickEffect,
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

function CardContainer({ children, ...props }) {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
};

export default CardContainer;