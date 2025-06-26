import { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Group from "./Group";
import { useAddSubjectContext } from "../../AddSubject/AddSubjectContext";
import { useGroupsContext } from "../../../Contexts/GroupsContext";

import { usePlansContext } from "@/Contexts/PlansContext";
import { clearCalculationCache } from "../utils/completionUtils";

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
    const { plansSet } = usePlansContext();
    
    const [expandedCategory, setExpandedCategory] = useState(3);

    useEffect(() => {
        clearCalculationCache();
    }, [plansSet]);

    const toggleCategory = useCallback(function(index){
        setExpandedCategory((prevCategory) => (prevCategory === index) ? null : index);
    }, []);
    
    return (
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