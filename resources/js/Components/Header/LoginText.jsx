import React from 'react';
import { Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";

const LoginTextTypography = styled(Typography)(({ theme }) => ({
    ...theme.typography.p,
}));

const LoginText = () => {
    return (
		<LoginTextTypography>
			Entre com seu e-mail USP para ser avisado assim que o Aurora estiver pronto!
		</LoginTextTypography>
    );
};

export default LoginText;