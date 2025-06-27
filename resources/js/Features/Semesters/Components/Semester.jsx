import { useState } from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

import Accordion from "../../../ui/Accordion/Accordion";
import SortableCard from "../../../ui/Card/SortableCard";
import Droppable from "../../DragAndDrop/Droppable";
import SortableGrid from "../../DragAndDrop/SortableGrid";
import SubjectPlaceholder from "./SubjectPlaceholder";

import { useDndContext } from "@dnd-kit/core";
import { usePlansContext } from "@/Contexts/PlansContext";
import { useSubjectMapContext } from "@/Contexts/SubjectMapContext";
import { useViewMode } from "@/Contexts/ViewModeContext";

const SummaryContainer = styled("div")(({ }) => ({
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

const SemesterCompletedText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,
    textTransform: 'none',
    marginRight: 'auto',
    marginLeft: 2,
    
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
    semesterData
}) => {
    const { plansSet } = usePlansContext();
    const { subjectDataMap } = useSubjectMapContext();
    const { isSuggestedPlansView } = useViewMode();
    const { plans, commitPlans } = usePlansContext();
    const completed = semesterData.subjects.length > 0 && semesterData.subjects.every((subj) => subj.completed);
    const [isExpanded, setExpanded] = useState(!completed);
    const { active } = useDndContext();

    function toggleExpanded() {
        setExpanded(!isExpanded);
    }

    function deleteSemester(){
		if(isSuggestedPlansView || !canDelete) return;

		commitPlans((prevPlans) => prevPlans.filter(semester => semester.semesterId !== semesterData.semesterId), `Delete semester ${semesterData.semesterId}`);
	}

    const highestSemesterId = Math.max(...plans.map(semester => semester.semesterId));
    const isHighestSemester = semesterData.semesterId === highestSemesterId;
    const isEmpty = semesterData.subjects.length === 0;
    const MIN_SEMESTERS_NUMBER = 8;
    const canDelete = !isSuggestedPlansView && isEmpty && isHighestSemester && semesterData.semesterId > MIN_SEMESTERS_NUMBER;


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
                    <IconButton  
                        aria-label="Delete semester"  
                        onClick={(e) => {  
                            e.stopPropagation();  
                            deleteSemester();  
                        }}  
                        sx = {{ padding: 0 }}
                    >  
                        <StyledClearIcon />  
                    </IconButton>  
                )}
                <SemesterInfoText>
                    {semesterData.semesterId}º Período
                </SemesterInfoText>
                {completed &&
                    <SemesterCompletedText color="green">
                        Semestre já cursado
                    </SemesterCompletedText>
                }
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
            sx={completed && active && {
                opacity: 0.5
            }}
        >
            <DroppableCardContainer
                id={semesterData.semesterId}
                key={semesterData.semesterId}
                spacing={{ xs: 1, sm: 2 }}
                disabled={!isExpanded || completed}
                Placeholder={isSuggestedPlansView ? null : <SubjectPlaceholder semesterId={semesterData.semesterId} />}
            >
                <SortableGrid items={semesterData.subjects}>
                    {semesterData.subjects.map((subject) => {
                        const subjectData = subjectDataMap[subject.code];
	                    const requiredScheduled = isSuggestedPlansView && plansSet.has(subject.code);
                        
                        if(!subjectData) return null;

                        return (
                            <SortableCard
                                id={subject.code}
                                key={subject.code}
                                subjectCode={subject.code}
                                container={semesterData.semesterId}
                                ghost={false}
                                blockDrag={subject.completed}
                                showBadge={requiredScheduled}
                                badgeColor="green"
                                badgeTooltip="Matéria planejada"
                            />
                        );
                    })}
                </SortableGrid>
            </DroppableCardContainer>
        </Accordion>
    );
};

export default Semester;
