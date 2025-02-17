import React, { useState } from 'react';
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
  return { "semester": semester, "courses": plans.filter(plan => plan.semester === semester) }; 
}

const Semesters = ({ plans, openCourseInfoPopUp }) => {
  const semesters = getUniqueSemesters(plans);
  return (
    <Stack spacing={1}>
      {semesters.map(semester => (
        <Semester key={semester} semesterData = {getSemesterData(plans, semester)} openCourseInfoPopUp={openCourseInfoPopUp}/>
      ))}
    </Stack>
  );
};

export default Semesters;