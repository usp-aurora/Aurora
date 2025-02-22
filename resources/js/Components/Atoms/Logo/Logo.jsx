import { Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";
const LogoText = styled(Typography)({
    textShadow: '0px 0px 16px rgba(255, 255, 255, 0.5)'
});

function Logo(props){
    return (
        <LogoText variant="h1" {...props}>
            Aurora
        </LogoText>
    );
}


export default Logo;