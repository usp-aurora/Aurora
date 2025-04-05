import React from 'react';
import { Box, Stack, Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";
import Logo from '../Atoms/Logo/Logo';
import LoginButton from './LoginButton';
import LoginText from './LoginText';


const HeaderContainer = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "24px",
});

const Header = (props) => {
    return (
        <Stack spacing={1} direction="column" alignItems="center">
            <HeaderContainer {...props}>
                <Logo />
                <LoginButton />
            </HeaderContainer>
            <LoginText />
        </Stack>
    );
};

export default Header;