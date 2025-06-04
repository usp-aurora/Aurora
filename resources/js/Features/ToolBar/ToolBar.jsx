import { useEffect } from 'react';
import { styled } from '@mui/material';
import { Typography } from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Tooltip from '@mui/material/Tooltip';

import IconWrapper from '../../ui/Icons/IconWrapper';
import { usePlansContext } from '../../Contexts/PlansContext';

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

const ExportIconWrapper = styled(IconWrapper)(({ theme, disabled }) => ({
    backgroundColor: disabled ? theme.palette.grey[400] : theme.palette.primary.main,
    color: disabled ? theme.palette.grey[600] : theme.palette.primary.contrastText,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    transition: 'background 0.2s',
}));

function ToolBar({ showCurriculum, toggleRecommendedView, user }) {
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

    const handleExport = () => {
        if (user) {
            window.open('/export', '_blank');
        }
    };

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
                <Tooltip title={user ? "Exportar planejamento" : "Faça login para exportar o planejamento"} placement="top">
                    <span>
                        <ExportIconWrapper
                            Icon={FileDownloadOutlinedIcon}
                            onClick={handleExport}
                            disabled={!user}
                        />
                    </span>
                </Tooltip>
            </Stack>
        </Container>
    );
}

export default ToolBar;