import Accordion from './Accordion';
import Typography from '@mui/material/Typography';

export default {
	title: 'Atoms/Accordion',
	component: Accordion,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
	},
};

export const Default = {
	args: {
		content: <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>,
		leftSummaryItem: <Typography>Lorem Ipsum</Typography>,
		rightSummaryItem: <Typography>Dolor Sit Amet</Typography>,
		glassmorphismLevel: "level2",
	},
};