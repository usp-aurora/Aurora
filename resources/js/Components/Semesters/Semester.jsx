import React from "react";

import { Typography } from "@mui/material/";
import { styled } from "@mui/material/styles";

import Accordion from "../Atoms/Accordion/Accordion";
import SubjectCard from "../Atoms/Card/SubjectCard";

const SemesterInfoText = styled(Typography)(({ theme }) => ({
    ...theme.typography.h4,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h1,
    },
}));

const SemesterCreditsText = styled(Typography)(({ theme }) => ({
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.p,
    },
}));

const SummaryContainer = styled("div")(({}) => ({
    width: "100%",
    padding: "8px", 

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
}));

const CardContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "8px",
    [theme.breakpoints.up("sm")]: {
        gap: "16px"
    }
}));

const Semester = ({ semesterData, openCourseInfoPopUp }) => {
    let workCredits = 0;
    let lectureCredits = 0;

    semesterData.courses.forEach((course) => {
        workCredits += parseInt(course.workCredits, 10);
        lectureCredits += parseInt(course.lectureCredits, 10);
    });

    const Summary = (
        <SummaryContainer>
            <SemesterInfoText>{semesterData.semester}º Período</SemesterInfoText>
            <SemesterCreditsText>
                {(lectureCredits ? lectureCredits : "0") + " "}
                +
                {" " + (workCredits ? workCredits : "0") + " "}
                créditos
            </SemesterCreditsText>
        </SummaryContainer>
    );

    return (
        <Accordion
            summary={Summary}
        >
            <CardContainer>
                {semesterData.courses.map((course) => (
                    <SubjectCard
                        key={course.code}
                        courseCode={course.code}
                        courseTitle={course.title}
                        planetURL="/icons/planeta.png"
                        onClick={openCourseInfoPopUp}
                    ></SubjectCard>
                ))}
            </CardContainer>
        </Accordion>
    );
};

export default Semester;
