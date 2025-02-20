import SubjectSearch from "./SubjectSearch";
import SubjectItem from "./SubjectItem";
import React, { useState } from "react";
import { Button, Box } from "@mui/material";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (value) => {
    if (value && !subjects.includes(value)) {
      setSubjects((prev) => [...prev, value]);
    }
  };

  const removeSubject = (subjectToRemove) => {
    setSubjects((prev) => prev.filter((s) => s !== subjectToRemove));
  };

return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Campo de pesquisa sempre disponível */}
        <SubjectSearch onSelectSubject={addSubject} />

        {/* Lista de disciplinas adicionadas */}
        {subjects.map((subject, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <SubjectItem subject={subject} />
                <Button variant="outlined" color="error" onClick={() => removeSubject(subject)}>
                    X
                </Button>
            </Box>
        ))}
    </Box>
);
};

export default Subject;

