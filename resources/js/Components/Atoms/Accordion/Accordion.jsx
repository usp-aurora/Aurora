import React from 'react';
import MUIAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

import glassmorphismStyle from '../../../styles/MUI/glassmorphismMUI';

const StyledAccordion = styled(MUIAccordion)(({ theme, glassmorphismLevel }) => ({
	...glassmorphismStyle(theme, glassmorphismLevel),
	borderRadius: '8px',

	[theme.breakpoints.up('sm')]: {
		borderRadius: '12px',
	},

	'&.Mui-expanded': {
		marginBottom: 0,
		marginTop: 0,
	},
}));

const Container = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
}));

const Spacer = styled('div')({
	flexGrow: 1,
});

const Accordion = ({ content, leftSummaryItem, rightSummaryItem, glassmorphismLevel="level2", ...props }) => {
	return (
		<Container>
			<StyledAccordion glassmorphismLevel={glassmorphismLevel}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
				>
					{leftSummaryItem}
					<Spacer />
					{rightSummaryItem}
				</AccordionSummary>
				<AccordionDetails>
					{content}
				</AccordionDetails>
			</StyledAccordion>
		</Container>
	);
}

export default Accordion;
