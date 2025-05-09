import { useState } from "react";
import { Typography } from "@mui/material/";
import { styled } from "@mui/material/styles";

import Accordion from "../../../ui/Accordion/Accordion";
import AuxiliaryCard from "../../../ui/Card/AuxiliaryCard";
import SortableCard from "../../../ui/Card/SortableCard";
import Droppable from "../../DragAndDrop/Droppable";
import SortableGrid from "../../DragAndDrop/SortableGrid";
import SubjectPlaceholder from "./SubjectPlaceholder";

import { useSubjectMapContext } from "../../../Contexts/SubjectMapContext";

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
    isRecommendedView,
}) => {
    const { subjectDataMap } = useSubjectMapContext();
    const [isExpanded, setExpanded] = useState(true);

    function toggleExpanded(){
        setExpanded(!isExpanded);
    }

    let workCredits = 0;
    let lectureCredits = 0;

    if (semesterData.subjects.length > 0) {
        semesterData.subjects.forEach((subject) => {
            const subjectData = subjectDataMap[subject.code];
            if (subjectData) {
                lectureCredits += parseInt(subjectData.credits[0], 10);
                workCredits += parseInt(subjectData.credits[1], 10);
            }
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
            onClick={toggleExpanded}
            expanded={isExpanded}
            TransitionProps={{ unmountOnExit: true }}
        >
            <DroppableCardContainer
                id={semesterData.semesterId}
                key={semesterData.semesterId}
                spacing={{ xs: 1, sm: 2 }}
                disabled={!isExpanded}
                placeholder={isRecommendedView ? null : <SubjectPlaceholder />}
            >
                <SortableGrid items={semesterData.subjects}>
                    {semesterData.subjects.map((subject) => {
                        const subjectData = subjectDataMap[subject.code];
                        if(!subjectData) return null;

                        return (
                            <SortableCard
                                id={subject.code}
                                key={subject.code}
                                subjectCode={subject.code}
                                container={semesterData.semesterId}
                                isBlocked={false}
                                isRecommendedView={isRecommendedView}/>
                        );
                    })}
                    {isRecommendedView && semesterData.suggestions.map((suggestion, index) => (
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
