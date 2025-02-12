import React from 'react';
import { styled } from "@mui/material/styles";
import { Typography } from '@mui/material/';

const TextContainer = styled("div")(() => ({
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


const CompletionHeader = ({ metrics }) => {
	return (
		<TextContainer>
			{metrics.map((metric) => (
				<StyledMetrics key={`${metric.name}-${metric.total}`}>
					{`${metric.value.toString().padStart(2, '0')} / ${metric.total.toString().padStart(2, '0')} ${metric.name}`}
				</StyledMetrics>
			))}
		</TextContainer>
	);
};

export default CompletionHeader;
