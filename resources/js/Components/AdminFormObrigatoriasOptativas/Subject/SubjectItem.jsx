// cria o subject item com o nome da disciplina
import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const SubjectAdded = styled(Box)({
    width: '760px',
    height: '40px',
    padding: "8px 12px",
    border: "2px solid var(--texto-noturno, #FFFFFF)",
    borderRadius: "12px",
    background: "var(--glass-diurno, #FFFFFF33)",
});

const SubjectName = styled(Typography)({
    fontSize: "11px",
    color: "#424242",
    fontFamily: "Rubik, sans-serif",
});

const DragHandle = styled(DragIndicatorIcon)({
    cursor: 'grab',
    color: '#424242',
    width: '24px',
    height: '24px',
});

const SubjectItem = ({ subject }) => {
    return (
        <Box display="flex" alignItems="center">
            <DragHandle />
            <SubjectAdded>
                <SubjectName>{subject}</SubjectName>
            </SubjectAdded>
        </Box>
    );
};
export default SubjectItem;