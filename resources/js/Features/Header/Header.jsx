import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from "@mui/material/styles";

import Button from '../../ui/Buttons/Button';
import Logo from '../../ui/Logo/Logo';
import { useAuthContext } from '../../Contexts/AuthContext';

const HeaderContainer = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "24px",
});

const LoginTextStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.p,
}));

function getFirstName(fullName) {
    if (!fullName) return '';
    return fullName.split(' ')[0];
}

function UserDisplay({ user, isAboveSmall }) {
    if (!user) return null;
    const name = isAboveSmall ? user.name : getFirstName(user.name);
    return <Typography>{name}</Typography>;
};

const Header = (props) => {
    const { user } = useAuthContext();
    const handleLoginRedirect = () => {
        window.location.href = '/login';
    };
    const theme = useTheme();
    const isAboveSmall = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Stack gap={2} sx={{ width: "100%", padding: isAboveSmall ? "0px" : "8px" }}>
            <HeaderContainer {...props}>

                <Logo />
                <Stack spacing={4} direction="row" alignItems="center">
                    {!user && (
                        <>
                            <LoginTextStyle sx={{ display: isAboveSmall ? 'block' : 'none', color: theme => theme.palette.red.main }}>
                                Você está no modo anônimo. Entre com seu e-mail USP para salvar o progresso
                            </LoginTextStyle>
                            <Button size="large" onClick={handleLoginRedirect}>Entrar</Button>
                        </>
                    )}
                    {user && (
                        <UserDisplay user={user} isAboveSmall={isAboveSmall} />
                    )}
                </Stack>

            </HeaderContainer>
            <LoginTextStyle sx={{ display: isAboveSmall ? 'none' : 'block' }}>
                Você está no modo anônimo. Entre com seu e-mail USP para salvar o progresso
            </LoginTextStyle>
        </Stack>
    );
};

export default Header;