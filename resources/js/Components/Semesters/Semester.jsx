import React from "react";

import { Typography, useMediaQuery } from "@mui/material/";
import { styled, useTheme } from "@mui/material/styles";

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
    subjectDataMap,
    plannedSubjects,
    placeholder,
    isRequiredView = true,
    isExpanded,
    onClick
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

    const theme = useTheme();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    return (
        <Accordion
            summary={Summary}
            expanded={isExpanded}
            onClick={onClick}
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
                        const subjectTags = subjectDataMap.get[subject.code]?.tags || [];

                        return (
                            <SortableItem
                                id={subject.code}
                                key={subject.code}
                                itemData={{subject, container: semesterData.semesterId}}
                            >
                                <SubjectCard
                                    subjectCode={subject.code}
                                    subjectName={subject.name}
                                    planetURL="/icons/planeta.png"
                                    onClick={() =>
                                        showSubjectInfo({...subject, tags: subjectTags, isPlanned: true})
                                    }
                                    moon={requiredScheduled}
                                />
                            </SortableItem>
                        );
                    })}
                    {isRequiredView && semesterData.suggestions.map((suggestion, index) => (
                            <AuxiliaryCard 
                                key={index}
                                text={`Disciplina do grupo ${suggestion.group}`} 
                                ghost={true}
                                sx={{ pointerEvents: "none"}}
                            />
                        ))
                    }
                </SortableGrid>
            </DroppableCardContainer>
        </Accordion>
    );
};

export default Semester;
