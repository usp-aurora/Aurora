import React from "react";

import { Typography } from "@mui/material/";
import { styled } from "@mui/material/styles";

import Accordion from "../Atoms/Accordion/Accordion";
import SubjectCard from "../Atoms/Card/SubjectCard";
import { red } from "@mui/material/colors";


const SemesterInfoText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.h4.fontSize,
    lineHeight: theme.typography.h4.lineHeight,
    [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.h1.fontSize,
        lineHeight: theme.typography.h1.lineHeight,
    },
}));

const SemesterCreditsText = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.small.fontSize,
    lineHeight: theme.typography.small.lineHeight,

    [theme.breakpoints.up("sm")]: {
        fontSize: theme.typography.p.fontSize,
        lineHeight: theme.typography.p.lineHeight,
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

const CardContainer = styled("div")(({}) => ({
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
}));

const Semester = ({ semesterData, toggleCourseInfo }) => {
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
                {lectureCredits ? lectureCredits : ""}
                {workCredits ? " + " : ""}
                {workCredits ? workCredits : ""}
                {lectureCredits || workCredits ? " créditos" : ""}
            </SemesterCreditsText>
        </SummaryContainer>
    );

    return (
        <Accordion
            summary={Summary}
            sx={{ borderRadius: "160px" }}
        >
            <CardContainer>
                {semesterData.courses.map((course) => (
                    <SubjectCard
                        courseCode={course.code}
                        courseTitle={course.title}
                        planetURL="/icons/planeta.png"
                        onClick={toggleCourseInfo}
                    ></SubjectCard>
                ))}
            </CardContainer>
        </Accordion>
    );
};

export default Semester;
