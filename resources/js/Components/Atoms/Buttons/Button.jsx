import React from 'react';
import { styled } from "@mui/material/styles";
import clickEffect from '../../../styles/clickEffect';
import MUIButton from '@mui/material/Button';

const StyledButton = styled(MUIButton)(({ theme }) => ({
	...clickEffect,
	...theme.typography.h4,
	textTransform: 'none',
	borderRadius: '1.5rem',

	'&.MuiButton-sizeSmall': {
		padding: '2px 26px',
	},
	'&.MuiButton-sizeMedium': {
		padding: '2px 32px',
	},
	'&.MuiButton-sizeLarge': {
		padding: '2px 40px',
	},
}));

const Button = ({ children, variant="contained", size="medium", ...props }) => {
	return (
		<StyledButton disableRipple variant={variant} size={size} {...props}>
			{children}
		</StyledButton>
	);
};

export default Button;
