import React from 'react';
import MUIChip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const StyledChip = styled(MUIChip)(({ theme }) => ({
	borderWidth: 2,
	padding: "0px 6.5px",
	height: "22px",
	fontSize: theme.typography.small.fontSize,
	fontWeight: theme.typography.small.fontWeight,

	[theme.breakpoints.up('sm')]: {
		padding: "0px 19.5px",
		height: "32px",
		fontSize: theme.typography.h4.fontSize,
		fontWeight: theme.typography.h4.fontWeight,
	},
}));

const ExportChip = ({label, color="primary", variant="outlined", ...props}) => {
	return (
		<StyledChip label={label} color={color} variant={variant} props/>
	);
};

export default ExportChip;
