import { useEffect } from 'react';
import { styled } from '@mui/material';
import { Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import Stack from '@mui/material/Stack';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import IconWrapper from '../Atoms/Icons/IconWrapper';
import { usePlansContext } from '../../Hooks/usePlansContext.jsx';

const Container = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: "white"
});

const StyledText = styled(Typography)(({ theme }) => ({
    display: "none",
    padding: "1px",
    maxWidth: "100%",
    textAlign: "center",
    color: theme.palette.neutral.main,
    ...theme.typography.small,

    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
        display: "block",
    }
}));

function ToolBar({ showCurriculum, toggleRecommendedView }) {
    const { undo, redo, isSaved } = usePlansContext();

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.ctrlKey && event.key === "z") {
                undo();
            } else if ((event.ctrlKey && event.key === "y") || (event.ctrlKey && event.shiftKey && event.key === "Z")) {
                redo();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [undo, redo]);

    return (
        <Container>   
            <Stack spacing={1} direction="row">
                <IconWrapper Icon={UndoIcon} onClick={undo} />
                <IconWrapper Icon={RedoIcon} onClick={redo} /> 
            </Stack>
            <StyledText> {showCurriculum ? "Você está vendo a grade obrigatória recomendada" : "Arraste uma disciplina para adicioná-la ou removê-la do período desejado"} </StyledText>
            <Stack spacing={1} direction="row">
                {!isSaved && <CircularProgress size={20} color="inherit" />}
                {/* <IconWrapper Icon={VisibilityOutlinedIcon} onClick={toggleRecommendedView} /> */}
                {/* <IconWrapper Icon={FileDownloadOutlinedIcon} />  */}
            </Stack>
        </Container>
    );
}

export default ToolBar;