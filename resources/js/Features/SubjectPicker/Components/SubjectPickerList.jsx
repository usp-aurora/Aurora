import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Group from "./Group";
import { useGroupsContext } from "../../../Contexts/GroupsContext";

const GroupContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    overflowY: "auto",
    gap: theme.spacing(2),
    borderRadius: "12px",
}));

function SubjectPickerList() {
    const { groups } = useGroupsContext();
    
    const [expandedCategory, setExpandedCategory] = useState(groups.subgroups.length - 1);

    const toggleCategory = useCallback(function(index){
        setExpandedCategory((prevCategory) => (prevCategory === index) ? null : index);
    }, []);

    return (
        // Algum dia vai ter um search bar bem aqui
        <GroupContainer>
            {groups.subgroups.map((groupData, index) => (
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