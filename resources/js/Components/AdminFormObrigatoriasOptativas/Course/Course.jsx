import Mandatory from "./Mandatory";
import Elective from "./Elective";
import Free from "./Free";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const RetanguloBox = styled(Box)({
    width: '880px',
    height: '280px',
    borderRadius: 'calc(var(--spacing) / 3)',
    borderWidth: '1px',
    background: 'var(--glass-diurno, #FFFFFF33)',
    border: '1px solid',
    borderImageSource: 'linear-gradient(45deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
    backdropFilter: 'blur(20px)',
    position: 'relative',
});

const Title = styled(Typography)({
    position: 'absolute',
    top: '16px',
    left: '16px',
    width: '154px',
    height: '32px',
    fontFamily: 'Rubik',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '32px',
    letterSpacing: '0%',
    textTransform: 'uppercase',
    color: 'var(--texto-primario-diurno, #424242)',
});

export default function Course() {
    return (
        <RetanguloBox>
            <Title>DISCIPLINAS</Title>
            <Stack spacing={2} sx={{ marginTop: '64px' }}>
                <Mandatory />
                <Elective />
                <Free />
            </Stack>
        </RetanguloBox>
    );
}
