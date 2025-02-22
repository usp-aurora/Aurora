import { useEffect } from 'react';
import { styled } from '@mui/material';
import { Typography } from "@mui/material";
import { useDragAndDrop } from "../Dnd/DragAndDropContext";
import IconWrapper from '../Atoms/Icons/IconWrapper';

import Stack from '@mui/material/Stack';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Container = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: "white"
});

const StyledText = styled(Typography)(({ theme }) => ({
    padding: "1px",
    maxWidth: "100%",
    textAlign: "center",
    color: theme.palette.neutral.main,
    ...theme.typography.small,

    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h5,
    }
}));

function MainTools({ undo, redo, toggleCurriculum }) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.ctrlKey && event.key === "z") {
                undo();
            } else if (event.ctrlKey && event.key === "y") {
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
            <StyledText>Arraste uma disciplina para adicioná-la ou removê-la do período desejado.</StyledText>
            <Stack spacing={1} direction="row">
                <IconWrapper Icon={VisibilityOutlinedIcon} onClick={toggleCurriculum} />
                <IconWrapper Icon={FileDownloadOutlinedIcon} /> 
            </Stack>
        </Container>
    );
}

export default MainTools;