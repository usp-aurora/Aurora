import React from 'react';
import {Stack, Typography} from '@mui/material/';
import { styled } from "@mui/material/styles";

const TopBarContainer = styled("div")({
    width: "100%",
    display: "flex",
    justifyContent: "spaceBetween", 
});

const TopBar = () => {
    return (
        <TopBarContainer>
            <Typography variant="h1">Aurora</Typography>
        </TopBarContainer>
    );
};

export default TopBar;