import { styled } from '@mui/material';
import { Typography } from "@mui/material";
import { useDragAndDrop } from '../Dnd/DragAndDropContext';
import IconWrapper from '../Atoms/Icons/IconWrapper';

import Stack from '@mui/material/Stack';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const HeaderContainer = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: "white"
});

const StyledText = styled(Typography)(({ theme }) => ({
	maxWidth: "100%",
	textAlign: "center",
	color: theme.palette.neutral.main,

	[theme.breakpoints.up("sm")]: {
		...theme.typography.h5,
		lineHeight: "26px",
	}
}));

function SemestersHeader({ undo, redo, showCurriculum }) {
    const { setIsDragDisabled } = useDragAndDrop();

    function toggleCurriculum() {
        showCurriculum((prev) => {
            setIsDragDisabled(!prev);
            return !prev;
        });
    }

    return (
        <HeaderContainer>   
            <Stack spacing={1} direction="row">
                <IconWrapper Icon={UndoIcon} onClick={undo}/>
                <IconWrapper Icon={RedoIcon} onClick={redo}/> 
            </Stack>

            <StyledText> Arraste uma disciplina para adicioná-la ou removê-la do período desejado. </StyledText>

            <Stack spacing={1} direction="row">
                <IconWrapper Icon={VisibilityOutlinedIcon} onClick={toggleCurriculum}/>
                <IconWrapper Icon={FileDownloadOutlinedIcon} /> 
            </Stack>
        </HeaderContainer>
        
    )
}

export default SemestersHeader;