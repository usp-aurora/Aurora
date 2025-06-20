import { useState, useCallback, useEffect, use } from "react";
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
    const { subjectCodeGroupToAdd, subjectCodeGroupToRemove } = useAddSubjectContext();
    const [expandedCategory, setExpandedCategory] = useState(groupsData.subgroups.length - 1);
    const [updatedGroupsData, setUpdatedGroupsData] = useState(groupsData);

    const addSubjectToGroupsData = useCallback((baseData, newSubjectTuple) => {
        if (!baseData) return null;

        const newGroupsData = JSON.parse(JSON.stringify(baseData));

        if (newSubjectTuple && Array.isArray(newSubjectTuple) && newSubjectTuple.length === 2) {
            const [subjectCode, subjectGroup] = newSubjectTuple;

            // Remove subjectCode from any other group it may belong to
            newGroupsData.subgroups.forEach(subgroup => {
                if (subgroup.subjects.includes(subjectCode)) {
                    subgroup.subjects = subgroup.subjects.filter(code => code !== subjectCode);
                }
            });

            // Add subjectCode to the specified group if not already present
            const subgroupIndex = newGroupsData.subgroups.findIndex(
                subgroup => subgroup.title === subjectGroup
            );

            if (subgroupIndex !== -1) {
                const currentSubjects = newGroupsData.subgroups[subgroupIndex].subjects;
                if (!currentSubjects.includes(subjectCode)) {
                    currentSubjects.push(subjectCode);
                }
            }
        }
        return newGroupsData;
    }, []);

    const removeSubjectFromGroupsData = useCallback((baseData, subjectCode) => {
        if (!baseData) return null;

        const newGroupsData = JSON.parse(JSON.stringify(baseData));

        if (subjectCode) {
            newGroupsData.subgroups.forEach(subgroup => {
                const subjectIndex = subgroup.subjects.indexOf(subjectCode);
                if (subjectIndex !== -1) {
                    subgroup.subjects.splice(subjectIndex, 1);
                }
            });
        }
        return newGroupsData;
    }, []);

    // Retrieve and merge local storage data when initializing the component
    useEffect(() => {
        let initialBaseData = groupsData;

        if (!user) {
            const localDataRaw = localStorage.getItem("addedUserSubjects");
            if (localDataRaw) {
                try {
                    const localData = JSON.parse(localDataRaw);
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
                    initialBaseData = {
                        ...groupsData,
                        subgroups: updatedSubgroups
                    };
                } catch (e) {
                    initialBaseData = groupsData;
                }
            }
        }

        setUpdatedGroupsData(initialBaseData);
    }, [user, groupsData]);

    useEffect(() => {
        if (updatedGroupsData && subjectCodeGroupToAdd) {
            const nextData = addSubjectToGroupsData(updatedGroupsData, subjectCodeGroupToAdd);
            if (JSON.stringify(nextData) !== JSON.stringify(updatedGroupsData)) {
                setUpdatedGroupsData(nextData);
            }
        }
    }, [subjectCodeGroupToAdd, addSubjectToGroupsData, updatedGroupsData]);
    
    useEffect(() => {
        if (updatedGroupsData && subjectCodeGroupToRemove) {
            const next = removeSubjectFromGroupsData(updatedGroupsData, subjectCodeGroupToRemove);
            if (JSON.stringify(next) !== JSON.stringify(updatedGroupsData)) {
                setUpdatedGroupsData(next);
            }
        }
    }, [subjectCodeGroupToRemove, updatedGroupsData, removeSubjectFromGroupsData]);

    const toggleCategory = useCallback(function(index){
        setExpandedCategory((prevCategory) => (prevCategory === index) ? null : index);
    }, []);
    
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