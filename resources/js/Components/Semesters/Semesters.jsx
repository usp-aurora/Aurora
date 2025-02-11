import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';
import Semester from './Semester';

const getUniqueSemesters = (plans) => {
  const uniqueSemesters = new Set();

  plans.forEach(plan => {
    uniqueSemesters.add(plan.semester);
  });

  return Array.from(uniqueSemesters);
};

const getSemesterData = (plans, semester) => {
  let semesterData = { "semester": semester, "courses": plans.filter(plan => plan.semester === semester) };
  return semesterData;
}

const Semesters = ({ plans, toggleCourseInfo }) => {
  const semesters = getUniqueSemesters(plans);

  return (
    <Stack spacing={1}>
      {semesters.map(semester => (
        <Semester semesterData = {getSemesterData(plans, semester)} toggleCourseInfo={toggleCourseInfo}/>
      ))}
    </Stack>
  );
};

export default Semesters;