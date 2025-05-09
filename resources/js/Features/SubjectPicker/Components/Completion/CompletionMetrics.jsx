import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

const TextContainer = styled( Box )(() => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
}));

const StyledMetrics = styled(Typography)(({ theme }) => ({
	...theme.typography.small,

	[theme.breakpoints.up('sm')]: {
		...theme.typography.p,
	}
}));


const CompletionHeader = ({ metrics, ...props }) => {
	return (
		<TextContainer {...props}>
			{metrics.map((metric) => (
				<StyledMetrics key={`${metric.name}-${metric.total}`}>
					{`${metric.value.toString().padStart(2, '0')} / ${metric.total.toString().padStart(2, '0')} ${metric.name}`}
				</StyledMetrics>
			))}
		</TextContainer>
	);
};

export default CompletionHeader;
