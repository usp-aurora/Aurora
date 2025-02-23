import React, { useState } from "react";

import { Typography } from "@mui/material/";
import { styled } from "@mui/material/styles";

import Accordion from "../Atoms/Accordion/Accordion";
import SubjectCard from "../Atoms/Card/SubjectCard";
import AuxiliarCard from "../Atoms/Card/AuxiliarCard";

import Droppable from "../Dnd/Droppable";
import SortableItem from '../Dnd/SortableItem';
import SortableGrid from '../Dnd/SortableGrid';

const SummaryContainer = styled("div")(({}) => ({
    width: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

const SemesterInfoText = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h1,
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
    placeholder,
    semesterData,
    plannedSubjects,
    isRequiredView = true,
}) => {

    let workCredits = 0;
    let lectureCredits = 0;

    semesterData.subjects.forEach((subject) => {
        lectureCredits += parseInt(subject.credits[0], 10);
        workCredits += parseInt(subject.credits[1], 10);
    });

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

    const [isExpanded, setExpanded] = useState(false);

    return (
        <Accordion
            summary={Summary}
            expanded={isExpanded}
            handleClick={() => setExpanded((prev) => !prev)}
        >
            <DroppableCardContainer
                id={semesterData.semesterId}
                key={semesterData.semesterId}
                spacing={{ xs: 1, sm: 2 }}
                disabled={!isExpanded}
                placeholder={isRequiredView ? null : placeholder}
            >
                <SortableGrid items={semesterData.subjects} container={semesterData.semesterId}>
                    {semesterData.subjects.map((subject) => {
                        const requiredScheduled = isRequiredView && plannedSubjects.has(subject.code);
                        
                        return (
                            <SortableItem
                                id={subject.code}
                                key={subject.code}
                                subjectData={subject}
                                container={semesterData.semesterId}
                                disabled={!isExpanded}
                            >
                                <SubjectCard
                                    courseCode={subject.code}
                                    courseTitle={subject.name}
                                    planetURL="/icons/planeta.png"
                                    moon={requiredScheduled}
                                    // onClick={() =>
                                    //    displayCourse(subject)
                                    // }
                                />
                            </SortableItem>
                        );
                    })}
                    
                    {isRequiredView && semesterData.suggestions.map((suggestion, index) => (
                        <AuxiliarCard 
                        key={index}
                            text={`Disciplina do grupo ${suggestion.group}`} 
                            ghost={true}
                            sx={{ pointerEvents: "none"}}
                        />
                    ))}
                </SortableGrid>
            </DroppableCardContainer>
        </Accordion>
    );
};

export default Semester;
