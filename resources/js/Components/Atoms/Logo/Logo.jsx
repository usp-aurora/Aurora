import { Typography, Box } from '@mui/material/';
import { styled } from "@mui/material/styles";

const LogoText = styled(Typography)(({}) => ({
    display: 'inline',
    fontWeight: "800",
}));

const AuroraText = styled(Typography)(({}) => ({
    textShadow: '0px 0px 16px rgba(255, 255, 255, 0.5)',
    marginLeft: "8px",
    display: 'inline',
    fontWeight: "900",
}));

function Logo(props) {
    return (
        <Box component="div" {...props}>
            <LogoText variant="h1">REQUISITOS</LogoText>
            {/* <AuroraText variant="h4"> AURORA</AuroraText> */}
        </Box>
    );
}

export default Logo;