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
        marginBottom: "0px",
        marginTop: "0px"
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ }) => ({
    minHeight: '0px',
	
	'&.Mui-expanded': {
		margin: "0px",
		minHeight: '0px',
  	},

	".MuiAccordionSummary-content": {
        margin: "0px",

        '&.Mui-expanded': {
            margin: "0px", // This will remove the margin when expanded
        }
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
