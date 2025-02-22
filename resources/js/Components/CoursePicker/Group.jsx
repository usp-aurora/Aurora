import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import CompletionHeader from "../Atoms/CompletionHeader/CompletionHeader";
import CompletionMetrics from "../Atoms/CompletionHeader/CompletionMetrics";
import Accordion from "../Atoms/Accordion/Accordion";
import CardContainer from "../Atoms/CardContainer/CardContainer";
import SubjectCard from "../Atoms/Card/SubjectCard";

import SortableItem from "../Dnd/SortableItem";

import SubGroup from "./SubGroup";

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

const SubGroupContainer = styled("div")(({ theme, depth }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

const Group = ({ groupData, plannedSubjects }) => {
    return (
        <Accordion
            summary={
                <CompletionHeader
                    title={groupData.title}
                    color={"red"}
                    completed={false}
                />
            }
        >
            <GroupContainer>
                <CompletionMetrics
                    metrics={[
                        {
                            name: "disciplinas",
                            value: "10",
                            total: "50",
                        },
                        {
                            name: "blocos",
                            value: "9",
                            total: "10",
                        },
                    ]}
                />
                <GroupText>{groupData.description}</GroupText>
                <CardContainer>
                    {groupData.subjects.map((subject) => {
                        const blocked = plannedSubjects.has(subject.code);
                        
                        return (
                            <SortableItem
                                key={subject.code}
                                id={`${subject.code}@${groupData.title}`}
                                container={"coursePicker"}
                                subjectData={subject}
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
                <SubGroupContainer>
                    {groupData.subgroups.map((subgroup) => (
                        <SubGroup key={subgroup.title} depth={1} subgroupData={subgroup} plannedSubjects={plannedSubjects}/>
                    ))}
                </SubGroupContainer>
            </GroupContainer>
        </Accordion>
    );
};

export default Group;
