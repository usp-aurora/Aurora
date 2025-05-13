import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Group from "./Group";
import { useAddSubjectContext } from "../../AddSubject/AddSubjectContext";

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
    const { groupAddSubjectCodeType } = useAddSubjectContext();
    const [expandedCategory, setExpandedCategory] = useState(groupsData.subgroups.length - 1);

    const toggleCategory = useCallback(function(index){
        setExpandedCategory((prevCategory) => (prevCategory === index) ? null : index);
    }, []);

    const getUpdatedGroupsData = () => {
        // Clone the current groupsData to avoid mutation
        const updatedGroupsData = { ...groupsData };
        // Iterate over each element in groupAddSubjectCodeType (which is [subjectCode, subjectType])
        groupAddSubjectCodeType?.forEach(([subjectCode, subjectType]) => {
            // Loop through the subgroups in groupsData
            updatedGroupsData.subgroups.forEach(subgroup => {
            // Check if the subgroup title matches the type from groupAddSubjectCodeType
            if (subgroup.title === subjectType) {
                // Check if the subject code is not already in the subjects array
                if (!subgroup.subjects.includes(subjectCode)) {
                // If a match is found and the subject code is not already present, append it
                subgroup.subjects.push(subjectCode);
                }
            }
            });
        });
        return updatedGroupsData;
    };
    
    
    const updatedGroupsData = getUpdatedGroupsData();

    return (
        // Algum dia vai ter um search bar bem aqui
        <GroupContainer>
            {updatedGroupsData.subgroups.map((groupData, index) => (
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