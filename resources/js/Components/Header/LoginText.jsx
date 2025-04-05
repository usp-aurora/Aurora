import React from 'react';
import { Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";

const LoginTextTypography = styled(Typography)(({ theme }) => ({
    ...theme.typography.p,
}));

const LoginText = ({user}) => {
    return (
		<LoginTextTypography>
			{user.name
				? `Bem vindo, ${user.name.split(" ")[0]}! Vamos te avisar assim que o Aurora estiver completo!`
				: "Entre com seu e-mail USP para ser avisado assim que o Aurora estiver pronto!"
			}	
		</LoginTextTypography>
    );
};

export default LoginText;