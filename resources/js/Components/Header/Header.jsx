import React from 'react';
import { Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";

const HeaderContainer = styled("div")({
    width: "100%",
    display: "flex",
    justifyContent: "spaceBetween", 
});

const ShiningText = styled(Typography)(({ theme }) => ({
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    backgroundSize: '200% 200%',
    animation: 'shining 3s linear infinite',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    '@keyframes shining': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
    },
}));

const Header = () => {
    return (
        <HeaderContainer>
            <ShiningText variant="h1">Aurora</ShiningText>
        </HeaderContainer>
    );
};

export default Header;