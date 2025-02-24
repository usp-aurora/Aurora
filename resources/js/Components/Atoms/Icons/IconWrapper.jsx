import React from 'react';
import { styled } from "@mui/material/styles";
import { Box } from '@mui/material';
import clickEffect from '../../../styles/clickEffect';

const IconContainer = styled( Box )(({ color, theme }) => ({
	...clickEffect,

	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: theme.palette[color].main,
	
	width: 30,
	height: 30,
	
	borderRadius: 8,

	cursor: 'pointer',

	[theme.breakpoints.up('sm')]: {
		width: 40,
		height: 40,
	},
}));

const IconWrapper = ({ Icon, color="primary", onClick, ...props }) => {
	return (
		<IconContainer tabIndex={0} color={color} onClick={onClick} {...props}>
			{Icon ? <Icon /> : ""}
		</IconContainer>
	);
};

export default IconWrapper;
