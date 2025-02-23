import React from "react";
import { useDndMonitor } from "@dnd-kit/core";
import { handleDragEnd } from "../../Handlers/DragHandlers";

import Stack from "@mui/material/Stack";
import AddIcon from '@mui/icons-material/Add';
import AuxiliarCard from "../Atoms/Card/AuxiliarCard";

import Semester from "./Semester";
import SemesterPlaceHolder from "./SemesterPlaceholder";

const Semesters = ({ 
  semesters,
  pushPlans,
  updateSubject,
  plannedSubjects,
  customPlan = true
}) => {
 
  // Adds a new empty semester to the plans
  function addSemester() {
    pushPlans((prevPlans) => [...prevPlans, { semesterId: prevPlans.length + 1, subjects: [] }], "Add empty semester");
  }

  // Monitors drag-and-drop events and updates the subject's semester accordingly
  useDndMonitor({
    onDragEnd: (event) => handleDragEnd(event, updateSubject, pushPlans),
  });

  return (
    <Stack spacing={1}>
      {semesters.map((semester) => (
        <Semester
            key={semester.semesterId}
            semesterData={semester}
            plannedSubjects={plannedSubjects}
            placeholder={<SemesterPlaceHolder />}
            customPlan={customPlan}
          />
      ))}
      {customPlan && <AuxiliarCard icon={AddIcon} text="Adicionar período" onClick={addSemester} />}
    </Stack>
  );
};

export default Semesters;
