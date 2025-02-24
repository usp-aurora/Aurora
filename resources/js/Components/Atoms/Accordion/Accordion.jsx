import React from "react";
import MUIAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import glassmorphismStyle from "../../../styles/MUI/glassmorphismMUI";

const StyledAccordion = styled(({ glassmorphismLevel, ...props }) => (
    // disableGutters removes the default margin when the accordion is open
    // square make it possible to apply borderRadius
    <MUIAccordion disableGutters square {...props} />
))(({ theme, glassmorphismLevel }) => ({
    ...glassmorphismStyle(theme, glassmorphismLevel),
    borderRadius: "8px",
    padding: "8px",
    width: "100%",

    [theme.breakpoints.up("sm")]: {
        borderRadius: "12px",
        paddingLeft: "16px",
        paddingRight: "16px",
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({}) => ({
    minHeight: "0px",
    padding: "0px",

    "&.Mui-expanded": {
        margin: "0px",
        minHeight: "0px",
    },

    ".MuiAccordionSummary-content": {
        margin: "0px",

        "&.Mui-expanded": {
            margin: "0px",
        },
    },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: "8px 0px 0px 0px",

    [theme.breakpoints.up("sm")]: {
        padding: "8px 0px 0px 0px",
    },
}));

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
    color: theme.palette.neutral.secondary,
}));

const Accordion = ({
    children,
    summary,
    glassmorphismLevel = "level2",
    expanded,
    onClick,
    ...props
}) => {
    return (
        <StyledAccordion
            expanded={expanded}
            glassmorphismLevel={glassmorphismLevel}
            {...props}
        >
            <StyledAccordionSummary
                onClick={onClick}
                expandIcon={<StyledExpandMoreIcon />}
            >
                {summary}
            </StyledAccordionSummary>
            <StyledAccordionDetails>{children}</StyledAccordionDetails>
        </StyledAccordion>
    );
};

export default Accordion;
