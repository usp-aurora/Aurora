import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

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
}));

const Semesters = ({ courseMap, plans, setPlans }) => {
    const { setIsDragDisabled } = useDragAndDrop();
                                                      // fazendo o primeiro semestre começar aberto
    const [semestersExpanded, setSemestersExpanded] = useState(plans.map((_, index) => index === 0)); 

    // Controls whether to show required courses or the custom plan
    const [showRequiredCourses, setShowRequiredCourses] = useState(false);
    const displayedSemesters = showRequiredCourses
        ? mandatoryCurriculum
        : plans;

    const addSemester = () => {
        const newId = plans.length + 1;

        const newSemester = {
            semesterId: newId,
            subjects: [],
        };

        setPlans([...plans, newSemester]);
        setSemestersExpanded([...semestersExpanded, true]);
    };


    return (
        <SemestersContainer>
            {displayedSemesters.map((semester) => (
                <Semester
                    key={semester.semesterId}
                    semesterData={semester}
                    courseMap={courseMap}
                    isRequiredView={showRequiredCourses}
                    isExpanded={semestersExpanded[semester.semesterId - 1]}
                    setExpanded={setSemestersExpanded}
                />
            ))}

            <AuxiliaryCard isClickable text="Adicionar período" onClick={addSemester} />
        </SemestersContainer>
    );
};

export default Semesters;
