import React, { useState, useMemo } from "react";
import Stack from "@mui/material/Stack";

import Semester from "./Semester";
import SemestersHeader from "./SemestersHeader";
import AddIcon from '@mui/icons-material/Add';
import AuxiliarCard from "../Atoms/Card/AuxiliarCard";

import { useDndMonitor } from "@dnd-kit/core";
import { useDragAndDrop } from "../Dnd/DragAndDropContext";
import { getContainerName } from "../../Handlers/DragHandlers";
import useHistoryState from "../../Hooks/useHistoryState";


const Semesters = ({ plans, updatePlans, plannedSubjects, updateSubject, coreCurriculum }) => {
  const { setIsDragDisabled } = useDragAndDrop();
  const [pushState, getCurrentState, undo, redo] = useHistoryState(plans, updatePlans);
  const [showCurriculum, setShowCurriculum] = useState(false);
  
  const displayedSemesters = showCurriculum ? coreCurriculum : plans;

  // Adds a new empty semester to the plans
  function addSemester() {
    pushState([...plans, { semesterId: plans.length + 1, subjects: [] }]);
  }

  // Toggle display of core curriculum and handles drag and drop disable.
  function toggleCurriculum() {
    setShowCurriculum(prev => {
        setIsDragDisabled(!prev);
        return !prev;
    });
  }

  /**
   * Applies an undo or redo action and updates the subject semester accordingly.
   * Prevents history actions when required courses are being displayed.
   * 
   * @param {Function} historyFunc - The function to execute (undo or redo)
   */
  function applyHistoryAction(historyFunc) {
    if (showRequiredCourses) return;
    const action = historyFunc();
    if (action && action.changes?.semester) 
      updateSubject(action.key, {semester: historyFunc.name === "undo" ? action.changes.semester.from : action.changes.semester.to});
  }

  // Monitors drag-and-drop events and updates the subject's semester accordingly
  useDndMonitor({
    onDragEnd: (event) => {
      const subjectCode = event.active.id;
      const targetContainer = getContainerName(event.over);
      const diff = updateSubject(subjectCode, {semester: targetContainer === "coursePicker" ? null : targetContainer});
      pushState(plans, diff);
    },
    onDragCancel: () => updatePlans(getCurrentState),
  });

  return (
    <Stack spacing={2}>
      <SemestersHeader 
        toggleCurriculum={toggleCurriculum} 
        undo={() => applyHistoryAction(undo)} 
        redo={() => applyHistoryAction(redo)}
      />
      <Stack spacing={1}>
        {displayedSemesters.map((semester) => (
          <Semester
            key={semester.semesterId}
            semesterData={semester}
            plannedSubjects={plannedSubjects}
            coreCurriculum={showCurriculum}
          />
        ))}
        <AuxiliarCard icon={AddIcon} text="Adicionar período" onClick={addSemester} />
      </Stack>
    </Stack>
  );
};

export default Semesters;
