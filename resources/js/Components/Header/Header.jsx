import React from 'react';
import { Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";

import Logo from '../Atoms/Logo/Logo';

const HeaderContainer = styled("div")({
    width: "100%",
    display: "flex",
    justifyContent: "spaceBetween", 
});


const Header = () => {
    return (
        <HeaderContainer>
            <Logo />
        </HeaderContainer>
    );
};

export default Header;