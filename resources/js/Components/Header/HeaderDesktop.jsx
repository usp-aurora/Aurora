import React from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material/';
import { styled, useTheme } from "@mui/material/styles";


import Logo from '../Atoms/Logo/Logo';
import Button from '../Atoms/Buttons/Button';

const HeaderContainer = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "24px",
});

const LoginText = styled(Typography)(({ theme }) => ({
    ...theme.typography.p,
}));

const Header = (props) => {
    return (
        <HeaderContainer {...props}>
            <Logo />
            <Stack spacing={4} direction="row" alignItems="center">
                <LoginText sx={{ display: { xs: 'none', sm: 'block' } }}>
                    Entre com seu e-mail USP para salvar o progresso
                </LoginText>
                <Button size="large"> Entrar </Button>
            </Stack>
        </HeaderContainer>
    );
};

export default Header;