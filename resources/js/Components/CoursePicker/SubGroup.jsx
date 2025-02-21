import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import CardContainer from "../Atoms/CardContainer/CardContainer";
import SubjectCard from "../Atoms/Card/SubjectCard";

import SortableItem from "../Dnd/SortableItem";

const SubGroupContainer = styled("div")(({ theme, depth }) => ({
    display: "flex",
    flexDirection: "column",

    marginLeft: theme.spacing(depth),
    borderLeft: "1px solid white",
    gap: theme.spacing(1),
    paddingLeft: theme.spacing(1),

    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(2 * depth),
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

const SubGroup = ({ depth, subgroupData, plannedSubjects }) => {               
    return (
        <SubGroupContainer depth={depth}>
            <SubGroupHeader>
                <SubGroupTitle>{subgroupData.title}</SubGroupTitle>
                <SubGroupText>99/99 créditos</SubGroupText>
            </SubGroupHeader>
            <SubGroupText>{subgroupData.description}</SubGroupText>
            <CardContainer>
                {subgroupData.subjects.map((subject) => {
                    const blocked = plannedSubjects.has(subject.code);
                    
                    return (
                        <SortableItem
                            id={subject.code}
                            key={subject.code}
                            subjectData={subject}
                            containerName={subgroupData.title}
                            disabled={blocked}
                        >
                            <SubjectCard
                                courseCode={subject.code}
                                courseTitle={subject.name}
                                ghost={blocked}
                                planetURL={blocked ? null : "/icons/planeta.png"}
                                // onClick={openCourseInfoPopUp}
                            />
                        </SortableItem>
                    );
                })}
            </CardContainer>
            {subgroupData.subgroups.map((subgroup) => (
                <SubGroup key={subgroup.title} depth={depth + 1} subgroupData={subgroup} />
            ))}
        </SubGroupContainer>
    );
};

export default SubGroup;
