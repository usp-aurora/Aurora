import { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ClearIcon from "@mui/icons-material/Clear";

import Accordion from "../../../ui/Accordion/Accordion";
import AuxiliaryCard from "../../../ui/Card/AuxiliaryCard";
import SortableCard from "../../../ui/Card/SortableCard";
import Droppable from "../../DragAndDrop/Droppable";
import SortableGrid from "../../DragAndDrop/SortableGrid";
import SubjectPlaceholder from "./SubjectPlaceholder";

import { useSubjectMapContext } from "../../../Contexts/SubjectMapContext";
import { useViewMode } from "../../../Contexts/ViewModeContext";
import { usePlansContext } from "../../../Contexts/PlansContext";

const SummaryContainer = styled("div")(({}) => ({
    width: "100%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

const StyledClearIcon = styled(ClearIcon)(({ theme }) => ({
    cursor: "pointer",
    color: theme.palette.white.main,
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
}) => {
    const { subjectDataMap } = useSubjectMapContext();
    const { isSuggestedPlansView, suggestedPlans } = useViewMode();
    const { plans, commitPlans } = usePlansContext();
    const [isExpanded, setExpanded] = useState(true);

    function toggleExpanded(){
        setExpanded(!isExpanded);
    }

    function deleteSemester(){
		if(isSuggestedPlansView || !canDelete) return;

		commitPlans((prevPlans) => prevPlans.filter(semester => semester.semesterId !== semesterData.semesterId), `Delete semester ${semesterData.semesterId}`);
	}

    const highestSemesterId = Math.max(...plans.map(semester => semester.semesterId));
    const isHighestSemester = semesterData.semesterId === highestSemesterId;
    const isEmpty = semesterData.subjects.length === 0;
    const canDelete = !isSuggestedPlansView && isEmpty && isHighestSemester && semesterData.semesterId > 8;

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
            <Stack direction="row" alignItems="center" spacing={1}>
                {canDelete && (
                    <StyledClearIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteSemester();
                        }}/>
                )}
                <SemesterInfoText>
                    {semesterData.semesterId}º Período
                </SemesterInfoText>
            </Stack>
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
                placeholder={isSuggestedPlansView ? null : <SubjectPlaceholder />}
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
                                isBlocked={false}/>
                        );
                    })}
                </SortableGrid>
            </DroppableCardContainer>
        </Accordion>
    );
};

export default Semester;
