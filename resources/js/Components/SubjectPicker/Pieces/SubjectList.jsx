import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Group from "./Group";

const GroupContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    paddingBottom: "100vh",
    overflowY: "auto",
    gap: theme.spacing(2),

    borderRadius: "12px",
}));

function SubjectList({ subjectDataMap, plannedSubjects, data }) {
    const [expandedCategories, setExpandedCategories] = useState(
        data.subgroups.map(group => group.title === "Obrigatórias")
    );

    const toggleCategory = (index) => {
        const newExpandedCategories = [...expandedCategories];
        newExpandedCategories[index] = !newExpandedCategories[index];
        setExpandedCategories(newExpandedCategories);
    }
    return (
        // Algum dia vai ter um search bar bem aqui
        <GroupContainer>
            {data.subgroups.map((groupData, index) => (
                <Group
                    key={groupData.title}
                    groupData={groupData}
                    subjectDataMap={subjectDataMap}
                    plannedSubjects={plannedSubjects}
                    expanded={expandedCategories[index]}
                    onClick={() => toggleCategory(index)}
                />
            ))}
        </GroupContainer>
    );
};

export default SubjectList;
