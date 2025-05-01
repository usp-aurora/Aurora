import SubjectSearch from "./SubjectSearch";
import SubjectItem from "./SubjectItem";
import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";

const Container = styled('div')({
    width: '100%',
    maxwidth: '824px',
});

const RemoveButton = styled(Button)({
    width: "40px",
    height: "40px",
    minWidth: "40px",
    minHeight: "40px",
    border: "none",
    backgroundColor: "transparent",
    color: "#757575",
    '& .MuiSvgIcon-root': {
        fontSize: '26px', 
    },
});

const Text = styled(Typography)({
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.5',
    letterSpacing: '0%',
    color: 'var(--texto-primario-diurno, #424242)',
    marginBottom: '12px',
});

const Subject = ({ tipo, onChange }) => {

  const [subjects, setSubjects] = useState([]);

  const addSubject = (value) => {
    if (value && !subjects.includes(value)) {
      const updated = [...subjects, value];
      setSubjects(updated);
      onChange?.(tipo, updated); // avisa o pai
    }
  };
  
  const removeSubject = (subjectToRemove) => {
    const updated = subjects.filter((s) => s !== subjectToRemove);
    setSubjects(updated);
    onChange?.(tipo, updated); // avisa o pai
  };
  

return (
    <Container>
        <Text>Disciplinas:</Text>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <SubjectSearch onSelectSubject={addSubject} />
            {subjects.map((subject, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center"}}>
                    <SubjectItem subject={subject} />
                    <RemoveButton variant="outlined" color="error" onClick={() => removeSubject(subject)}>
                        <CloseIcon />
                    </RemoveButton>
                </Box>
            ))}
        </Box>
    </Container>
);
};

export default Subject;
