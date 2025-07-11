import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Tooltip, Typography } from "@mui/material";

import SubjectsContainer from "./SubjectsContainer";

import { usePlansContext } from "../../../Contexts/PlansContext";
import { useSubjectMapContext } from "../../../Contexts/SubjectMapContext";
import { calculateMetrics } from '../utils/completionUtils';
import { COMPLETION_TYPE_LABELS } from '@/constants/completionTypes';

const SubGroupContainer = styled("div")(({ theme, depth }) => ({
    display: "flex",
    flexDirection: "column",

    marginLeft: theme.spacing(depth),
    borderLeft: "1px solid white",
    gap: theme.spacing(1),
    paddingLeft: theme.spacing(1),

    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(depth),
        gap: theme.spacing(2),
    },
}));

const SubGroupHeader = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
}));

const SubGroupTitle = styled(Typography)(({ theme }) => ({
    ...theme.typography.h5,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h4,
    },
}));

const SubGroupText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
    },
}));

const SubGroup = ({ depth, subgroupData }) => {
    const { plansSet } = usePlansContext();
    const { subjectDataMap } = useSubjectMapContext();
    
    const [metrics] = useMemo(() => 
        calculateMetrics(subgroupData, plansSet, subjectDataMap),
        [subgroupData, plansSet, subjectDataMap]
    );
    
    const completionMetrics = subgroupData.completionRequirements.map((requirement) => ({
        name: requirement.type.toLowerCase(),
        value: metrics[requirement.type],
        total: requirement.value,
    }));

    return (
        <SubGroupContainer depth={depth}>
            <SubGroupHeader> 
                <Tooltip title={!!subgroupData.mandatory ? "Bloco obrigatório" : ""}>
                    <SubGroupTitle>{subgroupData.title + (!!subgroupData.mandatory ? "*" : "")}</SubGroupTitle>
                </Tooltip>
                {completionMetrics.map(metric => {
                    const name = COMPLETION_TYPE_LABELS[metric.name];
                    return (
                        <SubGroupText key={name}>
                            {metric.value}/{metric.total} {name}
                        </SubGroupText>
                    )
                })}
            </SubGroupHeader>
            <SubGroupText>{subgroupData.description}</SubGroupText>
            {subgroupData.subgroups.map((subgroup) => (
                <SubGroup key={subgroup.title} depth={depth + 1} subgroupData={subgroup} />
            ))}
            <SubjectsContainer 
                containerName={subgroupData.title}
                subjects={subgroupData.subjects}
            />
        </SubGroupContainer>
    );
};

export default SubGroup;
