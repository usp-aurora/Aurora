import React from 'react';
import { Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";

const LoginTextTypography = styled(Typography)(({ theme }) => ({
    ...theme.typography.p,
}));

const LoginText = () => {
    return (
		<LoginTextTypography>
			Essa é um prévia do que vem por aí! Fique de olho nas próximas atualizações.  
		</LoginTextTypography>
    );
};

export default LoginText;