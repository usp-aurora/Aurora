import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import Accordion from "../../../ui/Accordion/Accordion";
import CompletionHeader from "./Completion/CompletionHeader";
import CompletionMetrics from "./Completion/CompletionMetrics";
import SubGroup from "./SubGroup";
import SubjectsContainer from "./SubjectsContainer";

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
    return (
        <Accordion
            summary={
                <CompletionHeader
                    title={groupData.title}
                    color={"red"}
                    completed={false}
                />
            }
            expanded={expanded}
            onClick={onClick}
            TransitionProps={{ unmountOnExit: true }}
        >
            <GroupContainer>
                {/* <CompletionMetrics
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
                /> */}
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
