import MUIButton from '@mui/material/Button';
import { styled } from "@mui/material/styles";
import clickEffect from '../../styles/animations/clickEffect';

const StyledButton = styled(MUIButton)(({ theme, color, variant }) => ({
	...clickEffect,
	...theme.typography.h4,
	textTransform: 'none',
	borderRadius: '1.5rem',
	
	borderWidth: '2px',
	color: theme.palette[color].main,
	
	...(variant === 'contained' && {
		borderWidth: '0px',
		color: theme.palette[color].contrastText,
	}),

	...(variant == 'contained-secondary' && {
		borderWidth: '0px',
		color: theme.palette[color][600],
		backgroundColor: theme.palette[color][300]
	}),

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

const Button = ({ children, variant="contained", size="medium", color="primary", ...props }) => {
	return (
		<StyledButton disableRipple variant={variant} size={size} color={color} {...props}>
			{children}
		</StyledButton>
	);
};

export default Button;
