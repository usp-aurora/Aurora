import { Box, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import { COMPLETION_TYPE_LABELS } from '@/constants/completionTypes';

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


const CompletionMetrics = ({ metrics, ...props }) => {
	return (
		<TextContainer {...props}>
			{metrics.map((metric) => {
				const name = COMPLETION_TYPE_LABELS[metric.name];

				return (
					<StyledMetrics key={`${name}-${metric.total}`}>
						{`${metric.value.toString().padStart(2, '0')} / ${metric.total.toString().padStart(2, '0')} ${name}`}
					</StyledMetrics>
				)
			})}
		</TextContainer>
	);
};

export default CompletionMetrics;
