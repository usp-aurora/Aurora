import { Box, Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";

const ContentContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'flex-start',
	gap: theme.spacing(1),
}));

const StyledSvg = styled("svg")(({ theme, color, filled }) => ({
	width: 16,
	height: 16,
	stroke: theme.palette[color].main,
	fill: filled ? theme.palette[color].main : "none",
}));

const StyledTitle = styled(Typography)(({ theme, open }) => ({
	...theme.typography.h5,

	[theme.breakpoints.up('sm')]: {
		...theme.typography.h4,
	}
}));

const CompletionHeader = ({ title, color, completed, ...props }) => {
	return (
		<ContentContainer {...props}>
			<StyledSvg viewBox="0 0 16.5 16.5" color={color} filled={completed} xmlns="http://www.w3.org/2000/svg">
				<circle cx="8" cy="8" r="6.5" strokeWidth="3" />
			</StyledSvg>
			<StyledTitle>{title}</StyledTitle>
		</ContentContainer>
	);
};

export default CompletionHeader;
