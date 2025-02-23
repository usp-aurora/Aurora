import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import AuxiliaryCard from "../Atoms/Card/AuxiliaryCard";

import Semester from "./Semester";
import { useDragAndDrop } from "../Dnd/DragAndDropContext";

const mandatoryCurriculum = [
    {
        semesterId: 1,
        subjects: [
            {
                id: 1,
                code: "MAC0110",
                credits: ["4", "0"],
            },
        ],
    },
    { semesterId: 2, subjects: [] },
    { semesterId: 3, subjects: [] },
    { semesterId: 4, subjects: [] },
    { semesterId: 5, subjects: [] },
    { semesterId: 6, subjects: [] },
    { semesterId: 7, subjects: [] },
    { semesterId: 8, subjects: [] },
];

const SemestersContainer = styled( Box )(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
        gap: theme.spacing(2),
    }
}));

const Semesters = ({ subjectMap, plans, setPlans }) => {
    const { setIsDragDisabled } = useDragAndDrop();
                                                      // fazendo o primeiro semestre começar aberto
    const [expandedSemesters, setExpandedSemesters] = useState(plans.map((_, index) => index === 0)); 
    const toggleSemester = (index) => {
        const newExpandedSemester = [...expandedSemesters];
        newExpandedSemester[index] = !newExpandedSemester[index];
        setExpandedSemesters(newExpandedSemester);
    }

    // Controls whether to show required subjects or the custom plan
    const [showRequiredSubjects, setShowRequiredSubjects] = useState(false);
    const displayedSemesters = showRequiredSubjects
        ? mandatoryCurriculum
        : plans;

    const addSemester = () => {
        const newId = plans.length + 1;

        const newSemester = {
            semesterId: newId,
            subjects: [],
        };

        setPlans([...plans, newSemester]);
        setExpandedSemesters([...expandedSemesters, true]);
    };


    return (
        <SemestersContainer>
            {displayedSemesters.map((semester, index) => (
                <Semester
                    key={semester.semesterId}
                    semesterData={semester}
                    subjectMap={subjectMap}
                    isRequiredView={showRequiredSubjects}
                    isExpanded={expandedSemesters[index]}
                    onClick={() => toggleSemester(index)}
                />
            ))}

            <AuxiliaryCard Icon={AddIcon} text="Adicionar período" onClick={addSemester} clickable />
        </SemestersContainer>
    );
};

export default Semesters;
