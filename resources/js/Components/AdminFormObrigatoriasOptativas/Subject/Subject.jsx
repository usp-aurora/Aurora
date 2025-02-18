import SubjectSearch from "./SubjectSearch";
import React, { useState } from "react";
import { Button, Box } from "@mui/material";


const Subject = () => {

    const generateId = () => Date.now() + Math.random();

    const [subject, setSubject] = useState([
        { key: generateId(), course: "" }
    ]);

    const addSubject = () => {
        setSubject((prev) => [...prev, { key: generateId(), course: "" }]);
    };

    const removeCriteria = (keyToRemove) => {
        setSubject((prev) => prev.filter((c) => c.key !== keyToRemove));
    };

    const updateSubject = (key, field, value) => {
        setSubject((prev) =>
            prev.map((c) => (c.key === key ? { ...c, [field]: value } : c))
        );
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {subject.map((c) => (
                <Box key={c.key} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <SubjectSearch
                        course={c.course}
                        onChangeCourse={(e) => updateSubject(c.key, "course", e.target.value)}
                    />
                    <Button variant="outlined" color="error" onClick={() => removeCriteria(c.key)}>
                        Remove
                    </Button>
                </Box>
            ))}

            <Button variant="contained" onClick={addSubject}>
                Add
            </Button>
        </Box>
    );
};

export default Subject;