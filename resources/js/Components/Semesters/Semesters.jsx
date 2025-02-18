import React, { useState } from 'react';
import Stack from '@mui/material/Stack';

import AuxiliarCard from '../Atoms/Card/AuxiliarCard';

import Semester from './Semester';
import { useDragAndDrop } from '../Dnd/DragAndDropContext';

const mandatoryCurriculum = [
  {
    semesterId: 1,
    courses: [
      {
        id: 1,
        code: "MAC0110",
        credits: [ "4", "0"],
      },
    ],
  },
  { semesterId: 2, courses: [], },
  { semesterId: 3, courses: [], },
  { semesterId: 4, courses: [], },
  { semesterId: 5, courses: [], },
  { semesterId: 6, courses: [], },
  { semesterId: 7, courses: [], },
  { semesterId: 8, courses: [], },
];

const Semesters = ({ plans, setPlans, displayCourse, courseMap }) => {
  const { setIsDragDisabled } = useDragAndDrop();

  // Controls whether to show required courses or the custom plan
  const [showRequiredCourses, setShowRequiredCourses] = useState(false);
  const displayedSemesters = showRequiredCourses ? mandatoryCurriculum : plans;

  const [expandedSemesters, setExpandedSemesters] = useState(
    plans.reduce((acc, semester) => {
      acc[semester.semesterId] = false;
      return acc;
    }, {})
  );

  const toggleSemester = (semesterId) => {
    setExpandedSemesters((prev) => ({
      ...prev,
      [semesterId]: !prev[semesterId],
    }));
  };

  const addSemester = () => {
    const newId = plans.length + 1;

    const newSemester = {
      semesterId: newId,
      courses: [],
    };

    setExpandedSemesters((prev) => ({
      ...prev,
      [newId]: false,
    }));
    setPlans([...plans, newSemester]);
  };

  return (
      <Stack spacing={1}>
        {displayedSemesters.map(semester => (
          <Semester 
          key={semester.semesterId}  
          semesterData={semester} 
          isExpanded={expandedSemesters[semester.semesterId]}
          isRequired={showRequiredCourses}
          toggleSemester={toggleSemester} 
          displayCourse={displayCourse}
          courseMap={courseMap}
          />
        ))}

        <AuxiliarCard text="Adicionar período" onClick={addSemester}/>
      </Stack>
  );
};

export default Semesters;