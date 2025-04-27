import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Group from "./Group";

const GroupContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    paddingBottom: "100vh",
    overflowY: "auto",
    gap: theme.spacing(2),
    borderRadius: "12px",
}));

function SubjectPickerList({ groupsData }) {
    const [expandedCategory, setExpandedCategory] = useState(groupsData.subgroups.length - 1);

    const toggleCategory = useCallback(function(index){
        setExpandedCategory((prevCategory) => (prevCategory === index) ? null : index);
    }, []);

    return (
        // Algum dia vai ter um search bar bem aqui
        <GroupContainer>
            {groupsData.subgroups.map((groupData, index) => (
                <Group
                    key={groupData.title}
                    groupData={groupData}
                    expanded={expandedCategory === index}
                    onClick={() => {toggleCategory(index)}}
                />
            ))}
        </GroupContainer>
    );
};

export default SubjectPickerList;