/* SubjectItem is the component for the selected subjects from SubjectSearch*/


import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


/* Styling of the selected subject component */
const SubjectAdded = styled(Box)({
    width: '760px',
    height: '40px',
    padding: "8px 12px",
    border: "2px solid var(--texto-noturno, #FFFFFF)",
    borderRadius: "12px",
    background: "var(--glass-diurno, #FFFFFF33)",
});


/* Styling of the selected subject text */
const SubjectName = styled(Typography)({
    fontFamily: "Rubik, sans-serif",
    fontSize: "11px",
    color: "#424242",
});


/* Styling of the drag handle */
const DragHandle = styled(DragIndicatorIcon)({
    cursor: 'grab',
    color: '#424242',
    width: '24px',
    height: '24px',
});


/* SubjectItem component */
const SubjectItem = ({ subject }) => {
    return (
        <Box display="flex" alignItems="center">
            <DragHandle />
            <SubjectAdded>
                <SubjectName>{subject.code + " - " + subject.name}</SubjectName>
            </SubjectAdded>
        </Box>
    );
};

export default SubjectItem;