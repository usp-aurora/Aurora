import React, { useState } from 'react';
import Stack from '@mui/material/Stack';

import AuxiliarCard from '../Atoms/Card/AuxiliarCard';

import Semester from './Semester';
import { useDragAndDrop } from '../Dnd/DragAndDropContext';

const mandatoryCurriculum = [
  {
    semesterId: 1,
    subjects: [
      {
        id: 1,
        code: "MAC0110",
        credits: [ "4", "0"],
      },
    ],
  },
  { semesterId: 2, subjects: [], },
  { semesterId: 3, subjects: [], },
  { semesterId: 4, subjects: [], },
  { semesterId: 5, subjects: [], },
  { semesterId: 6, subjects: [], },
  { semesterId: 7, subjects: [], },
  { semesterId: 8, subjects: [], },
];

const Semesters = ({ plans, setPlans, displayCourse, courseMap }) => {
  const { setIsDragDisabled } = useDragAndDrop();

  // Controls whether to show required courses or the custom plan
  const [showRequiredCourses, setShowRequiredCourses] = useState(false);
  const displayedSemesters = showRequiredCourses ? mandatoryCurriculum : plans;

  const addSemester = () => {
    const newId = plans.length + 1;

    const newSemester = {
      semesterId: newId,
      subjects: [],
    };

    setPlans([...plans, newSemester]);
  };

  return (
      <Stack spacing={1}>
        {displayedSemesters.map(semester => (
          <Semester 
            key={semester.semesterId}  
            semesterData={semester} 
            isRequired={showRequiredCourses}
            displayCourse={displayCourse}
            courseMap={courseMap}
          />
        ))}

        <AuxiliarCard text="Adicionar período" onClick={addSemester}/>
      </Stack>
  );
};

export default Semesters;