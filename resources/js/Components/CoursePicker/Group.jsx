import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import Accordion from "../Atoms/Accordion/Accordion";
import CardContainer from "../Atoms/CardsGrid/CardsGrid";
import SubjectCard from "../Atoms/Card/SubjectCard";
import SortableItem from "../Dnd/SortableItem";
import CompletionHeader from "./Pieces/Completion/CompletionHeader";
import CompletionMetrics from "./Pieces/Completion/CompletionMetrics";
import SubGroup from "./SubGroup";
import SubjectsContainer from "./Pieces/SubjectsContainer";

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

const Group = ({ groupData, courseMap }) => {
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
                <SubjectsContainer
                    groupName={groupData.title}
                    courseMap={courseMap}
                    subjects={groupData.subjects}
                />
                <SubGroupContainer>
                    {groupData.subgroups.map((subgroup) => (
                        <SubGroup
                            key={subgroup.title}
                            depth={1}
                            subgroupData={subgroup}
                            courseMap={courseMap}
                        />
                    ))}
                </SubGroupContainer>
            </GroupContainer>
        </Accordion>
    );
};

export default Group;
