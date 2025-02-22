import React, { useState } from "react";

import { Typography } from "@mui/material/";
import { styled } from "@mui/material/styles";

import Accordion from "../Atoms/Accordion/Accordion";
import SubjectCard from "../Atoms/Card/SubjectCard";
import AuxiliaryCard from "../Atoms/Card/AuxiliaryCard";

import Droppable from "../Dnd/Droppable";
import SortableItem from "../Dnd/SortableItem";
import SortableGrid from "../Dnd/SortableGrid";

import { useSubjectInfoContext } from '../../Hooks/useSubjectInfoContext';


const SummaryContainer = styled("div")(({}) => ({
    width: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

const SemesterInfoText = styled(Typography)(({ theme }) => ({
    textTransform: "uppercase",

    ...theme.typography.h4,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h2,
    },
}));

const SemesterCreditsText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
    },
}));

const DroppableCardContainer = styled(Droppable)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: "8px",
    [theme.breakpoints.up("sm")]: {
        gap: "16px",
    },
}));

const Semester = ({
    semesterData,
    courseMap,
    isRequiredView,
    isExpanded,
    setExpanded
}) => {
    const { subjectInfo, isSubjectInfoModalOpen, closeSubjectInfoModal, showSubjectInfo } = useSubjectInfoContext(); 

    let workCredits = 0;
    let lectureCredits = 0;

    if (semesterData.subjects.length > 0) {
        semesterData.subjects.forEach((subject) => {
            lectureCredits += parseInt(subject.credits[0], 10);
            workCredits += parseInt(subject.credits[1], 10);
        });
    }

    const Summary = (
        <SummaryContainer>
            <SemesterInfoText>
                {semesterData.semesterId}º Período
            </SemesterInfoText>
            <SemesterCreditsText>
                {(lectureCredits ? lectureCredits : "0") + " "}+
                {" " + (workCredits ? workCredits : "0") + " "}
                créditos
            </SemesterCreditsText>
        </SummaryContainer>
    );

    return (
        <Accordion
            summary={Summary}
            expanded={isExpanded}
            onClick={() => setExpanded((prev) => {
                const newExpanded = [...prev];
                newExpanded[semesterData.semesterId - 1] = !newExpanded[semesterData.semesterId - 1];
                return newExpanded;
            })}
        >
            <DroppableCardContainer
                id={semesterData.semesterId}
                key={semesterData.semesterId}
                spacing={{ xs: 1, sm: 2 }}
                disabled={!isExpanded}
            >
                <SortableGrid items={semesterData.subjects}>
                    {semesterData.subjects.length === 0
                        ? !isRequiredView && (
                            <AuxiliaryCard text="Arraste uma disciplina" />
                          )
                        : semesterData.subjects.map((subject) => {
                            const subjectTags = courseMap.get(subject.code).tags;
                            return (
                                <SortableItem
                                    id={subject.code}
                                    key={subject.code}
                                    subjectData={subject}
                                    containerName={semesterData.semesterId}
                                    disabled={!isExpanded}
                                >
                                    <SubjectCard
                                        courseCode={subject.code}
                                        courseName={subject.name}
                                        planetURL="/icons/planeta.png"
                                        onClick={() =>
                                            showSubjectInfo({...subject, tags: subjectTags})
                                        }
                                    />
                                </SortableItem>
                            );
                          })}
                </SortableGrid>
            </DroppableCardContainer>
        </Accordion>
    );
};

export default Semester;
