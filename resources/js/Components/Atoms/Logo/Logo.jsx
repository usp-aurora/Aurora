import { Typography, Box } from '@mui/material/';
import { styled } from "@mui/material/styles";

const LogoText = styled(Typography)(({}) => ({
    textShadow: '0px 0px 16px rgba(255, 255, 255, 0.5)',
    display: 'inline',
}));

const GrayText = styled(LogoText)(({}) => ({
    color: 'gray',
}));

function Logo(props) {
    return (
        <Box component="div" {...props}>
            <LogoText variant="h1">AURORA</LogoText>
            {/* <GrayText variant="h1">RORA</GrayText> */}
        </Box>
    );
}

export default Logo;