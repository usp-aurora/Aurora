import React, { useState } from 'react';
import styled from 'styled-components';
import Semester from './Semester';

const SemestersContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

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
    <SemestersContainer>
      {semesters.map(semester => (
        <Semester semesterData = {getSemesterData(plans, semester)} toggleCourseInfo={toggleCourseInfo}/>
      ))}
    </SemestersContainer>
  );
};

export default Semesters;