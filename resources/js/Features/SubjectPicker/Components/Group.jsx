import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import Accordion from "../../../ui/Accordion/Accordion";
import CompletionHeader from "./Completion/CompletionHeader";
import CompletionMetrics from "./Completion/CompletionMetrics";
import SubGroup from "./SubGroup";
import SubjectsContainer from "./SubjectsContainer";

import { usePlansContext } from "@/Contexts/PlansContext";
import { useSubjectMapContext } from "@/Contexts/SubjectMapContext";
import { isComplete, calculateMetrics, requirementTypes } from '../utils/completionUtils';

const GroupContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),

    [theme.breakpoints.up("sm")]: {
        gap: theme.spacing(2),
    },


}));

const GroupText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
    },
}));

const SubGroupContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

const Group = ({ groupData, expanded, onClick }) => {
    const { plansSet } = usePlansContext();
    const { subjectDataMap } = useSubjectMapContext();
    
    const [metrics] = useMemo(() => 
        calculateMetrics(groupData, plansSet, subjectDataMap),
        [groupData, plansSet, subjectDataMap]
    );

    const completed = useMemo(() => 
        isComplete(groupData, metrics),
        [groupData, metrics]
    );

    const completionMetrics = useMemo(() => 
        groupData.completionRequirements.map((requirement) => ({
            name: requirement.type.toLowerCase(),
            value: metrics[requirementTypes[requirement.type]],
            total: requirement.value,
        })),
        [groupData.completionRequirements, metrics]
    );

    return (
        <Accordion
            summary={
                <CompletionHeader
                    title={groupData.title}
                    color={groupData.color}
                    completed={completed}
                />
            }
            expanded={expanded}
            onClick={onClick}
            TransitionProps={{ unmountOnExit: true }}
        >
            <GroupContainer>
                <CompletionMetrics metrics={completionMetrics}/>
                <GroupText>{groupData.description}</GroupText>
                <SubjectsContainer
                    containerName={groupData.title}
                    subjects={groupData.subjects}
                />
                <SubGroupContainer>
                    {groupData.subgroups.map((subgroup) => (
                        <SubGroup
                            key={subgroup.title}
                            depth={1}
                            subgroupData={subgroup}
                        />
                    ))}
                </SubGroupContainer>
            </GroupContainer >
        </Accordion >
    );
};

export default Group;
