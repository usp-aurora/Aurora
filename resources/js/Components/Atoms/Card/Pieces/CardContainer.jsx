import React from "react";
import { styled } from "@mui/system";
import clickEffect from "../../../../styles/clickEffect";

const Container = styled("div")(({ theme }) => ({
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