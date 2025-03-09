import { useState } from 'react';
import { styled } from '@mui/material';
import IconWrapper from '../Atoms/Icons/IconWrapper';

import Stack from '@mui/material/Stack';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';

const Container = styled("div")({
    position: "absolute",
    width: "100%",
    padding: "10px",
    display: "flex",
    zIndex: "1",    
    color: "white",
    justifyContent: "flex-end",
});

function GraphTools({ recenter, toggleFullscreen }) {  
    return (
        <Container>
            <Stack spacing={1} direction="row">
                <IconWrapper 
                    onClick={recenter}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}       
                    Icon={MyLocationIcon}
                />
                <IconWrapper 
                    onClick={toggleFullscreen}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}              
                    Icon={document.fullscreenElement ? FullscreenExitOutlinedIcon : FullscreenOutlinedIcon} 
                /> 
            </Stack>
        </Container>
    );
}

export default GraphTools;