import React from 'react';
import { styled } from "@mui/material/styles";
import clickEffect from '../../../styles/clickEffect';

const IconContainer = styled("div")(({ theme }) => ({
	...clickEffect,

	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: theme.palette.primary.main,
	
	width: 30,
	height: 30,
	
	borderRadius: 8,

	cursor: 'pointer',

	[theme.breakpoints.up('sm')]: {
		width: 40,
		height: 40,
	},
}));

const IconWrapper = ({ Icon, onClick }) => {
	return (
		<IconContainer onClick={onClick}>
			{Icon ? <Icon /> : ""}
		</IconContainer>
	);
};

export default IconWrapper;
