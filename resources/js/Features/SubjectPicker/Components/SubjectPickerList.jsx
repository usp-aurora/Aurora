import { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Group from "./Group";
import { useAddSubjectContext } from "../../AddSubject/AddSubjectContext";

const GroupContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    overflowY: "auto",
    gap: theme.spacing(2),
    borderRadius: "12px",
}));

function SubjectPickerList({ groupsData, user }) {
    const { groupAddSubjectCodeType } = useAddSubjectContext();
    const [expandedCategory, setExpandedCategory] = useState(groupsData.subgroups.length - 1);
    const [initialGroupsData, setInitialGroupsData] = useState(null);

    // Retrieve and merge localStorage data only once if !user
    useEffect(() => {
        if (!user) {
            console.log("No user, using localStorage data for subject codes");
            const localDataRaw = localStorage.getItem("addedUserSubjects");
            if (localDataRaw) {
                try {
                    const localData = JSON.parse(localDataRaw);
                    console.log("Local data found:", localData);
                    const updatedSubgroups = groupsData.subgroups.map(subgroup => {
                        const codesToAdd = localData
                            .filter(item => item.group_name === subgroup.title)
                            .map(item => item.code);
                        const newSubjects = [
                            ...subgroup.subjects,
                            ...codesToAdd.filter(code => !subgroup.subjects.includes(code))
                        ];
                        return {
                            ...subgroup,
                            subjects: newSubjects
                        };
                    });
                    setInitialGroupsData({
                        ...groupsData,
                        subgroups: updatedSubgroups
                    });
                } catch (e) {
                    setInitialGroupsData(groupsData);
                }
            } else {
                setInitialGroupsData(groupsData);
            }
        }
    }, [user, groupsData]);

    const toggleCategory = useCallback(function(index){
        setExpandedCategory((prevCategory) => (prevCategory === index) ? null : index);
    }, []);

    const getUpdatedGroupsData = (baseData) => {
        // Create a new array of subgroups with updated subjects
        const updatedSubgroups = baseData.subgroups.map(subgroup => {
            // Find all subjectCodes to add for this subgroup
            const codesToAdd = groupAddSubjectCodeType
                ?.filter(([subjectCode, subjectType]) => subjectType === subgroup.title)
                .map(([subjectCode]) => subjectCode) || [];
            // Add only codes not already present
            const newSubjects = [
                ...subgroup.subjects,
                ...codesToAdd.filter(code => !subgroup.subjects.includes(code))
            ];
            return {
                ...subgroup,
                subjects: newSubjects
            };
        });
        return {
            ...baseData,
            subgroups: updatedSubgroups
        };
    };
    
    // Use initialGroupsData if set (for !user), otherwise use groupsData
    const baseGroupsData = initialGroupsData || groupsData;
    const updatedGroupsData = getUpdatedGroupsData(baseGroupsData);

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