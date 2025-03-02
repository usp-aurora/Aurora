import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import SubjectsContainer from "./SubjectsContainer";

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

const SubGroup = ({ depth, subgroupData, subjectDataMap, plannedSubjects }) => {    
    return (
        <SubGroupContainer depth={depth}>
            <SubGroupHeader>
                <SubGroupTitle>{subgroupData.title}</SubGroupTitle>
                {/* <SubGroupText>99/99 créditos</SubGroupText> */}
            </SubGroupHeader>
            <SubGroupText>{subgroupData.description}</SubGroupText>
            {subgroupData.subgroups.map((subgroup) => (
                <SubGroup key={subgroup.title} depth={depth + 1} subgroupData={subgroup} />
            ))}
            <SubjectsContainer 
                containerName={subgroupData.title}
                subjectDataMap={subjectDataMap}
                plannedSubjects={plannedSubjects}
                subjects={subgroupData.subjects}
            />
        </SubGroupContainer>
    );
};

export default SubGroup;
