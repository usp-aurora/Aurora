import { Typography } from '@mui/material/';
import { styled } from "@mui/material/styles";

const LogoText = styled((props) => <Typography variant="h1" {...props} />)(({}) => ({
    textShadow: '0px 0px 16px rgba(255, 255, 255, 0.5)'
}));

function Logo(...props){
    return (
        <LogoText {...props}>
          Aurora
        </LogoText>
    );
}


export default Logo;