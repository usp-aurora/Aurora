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
			<Button size="small"> Entrar </Button>
        </HeaderContainer>
    );
};

export default Header;