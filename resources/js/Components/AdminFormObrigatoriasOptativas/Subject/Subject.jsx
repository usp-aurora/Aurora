/* Subject is the form component for adding subjects. It combines the searcher, the text, and their logic. */


import React, { useState } from "react";

import SubjectSearch from "./SubjectSearch";
import SubjectItem from "./SubjectItem";

import { Button, Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";


/* Styling of the remove button for the subjects */
const RemoveButton = styled(Button)({
    width: "40px",
    minWidth: "40px",
    height: "40px",
    minHeight: "40px",
    border: "none",
    backgroundColor: "transparent",
    color: "#757575",
    '& .MuiSvgIcon-root': {
        fontSize: '26px', 
    },
});


/* Styling of the text "Disciplinas:" */
const Text = styled(Typography)({
    fontFamily: 'Rubik',
    fontSize: '14px',
    fontWeight: '400', 
    lineHeight: '1.5',
    letterSpacing: '0%',
    marginBottom: '12px',
    color: 'var(--texto-primario-diurno, #424242)',
});


/* Subject component */
const Subject = ({ onChange }) => {

    // State to manage the selected subjects
    const [subjects, setSubjects] = useState([]);

    // Add a subject to the list of selected subjects
    const addSubject = (value) => {
        if (!value) return;
    
        const alreadyExists = subjects.some((s) => s.code === value.code);
        if (!alreadyExists) {
            const updated = [...subjects, value];
            setSubjects(updated);
            onChange?.(updated);
        }
    };
    

    // Remove a subject from the list of selected subjects
    const removeSubject = (value) => {
        const updated = subjects.filter((s) => s.code !== value.code);
        setSubjects(updated);
        onChange?.(updated);
    };
    
  

    return (

        <Box sx={{ width: "824px" }}>

            <Text>Disciplinas:</Text>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                <SubjectSearch onSelectSubject={addSubject}/>
                {subjects.map((subject, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center"}}>
                        <SubjectItem subject={subject} />
                        <RemoveButton variant="outlined" color="error" onClick={() => removeSubject(subject)}>
                            <CloseIcon />
                        </RemoveButton>
                    </Box>
                ))}
            </Box>

        </Box>
    );

};

export default Subject;