// filepath: /home/kim/Documents/code/03_projetos/Aurora/Aurora/resources/js/Components/Atoms/Accordion/Accordion.jsx
import React from "react";
import MUIAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

import glassmorphismStyle from "../../../styles/MUI/glassmorphismMUI";

const Container = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
}));

const StyledAccordion = styled((props) => (
    <MUIAccordion square={true} {...props} />
))(({ theme, glassmorphismLevel }) => ({
    ...glassmorphismStyle(theme, glassmorphismLevel),
    borderRadius: "8px",

    [theme.breakpoints.up("sm")]: {
        borderRadius: "12px",
    },

    "&.Mui-expanded": {
        marginBottom: 0,
        marginTop: 0,
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    minHeight: '0px',
	
	'&.Mui-expanded': {
		margin: 0,
		minHeight: '0px',
  	},

	".MuiAccordionSummary-content": {
        margin: 0,
    },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
}));

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
	color: theme.palette.neutral.secondary,
}));

const Accordion = ({
    children,
    summary,
    glassmorphismLevel = "level2",
}) => {
    return (
        <Container>
            <StyledAccordion glassmorphismLevel={glassmorphismLevel}>
                <StyledAccordionSummary
                    expandIcon={<StyledExpandMoreIcon/>}
                >
                    {summary}
                </StyledAccordionSummary>
                <StyledAccordionDetails>{children}</StyledAccordionDetails>
            </StyledAccordion>
        </Container>
    );
};

export default Accordion;
