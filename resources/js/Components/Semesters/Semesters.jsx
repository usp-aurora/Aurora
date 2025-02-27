import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import AuxiliaryCard from "../Atoms/Card/AuxiliaryCard";

import { useDndMonitor } from "@dnd-kit/core";
import { handleDragEnd } from "../../Handlers/DragHandlers";
import Semester from "./Semester";
import SemesterPlaceHolder from "./SemesterPlaceholder";

const SemestersContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  overflowY: "auto",
  borderRadius: "12px",
  paddingBottom: "100vh",
}));

function Semesters({
  semesters,
  pushPlans,
  updateSubject,
  subjectDataMap,
  plannedSubjects,
  customPlan = true
}) {
  const [expandedSemesters, setExpandedSemesters] = useState(semesters.map(() => true));
  const toggleSemester = (index) => {
    const newExpandedSemester = [...expandedSemesters];
    newExpandedSemester[index] = !newExpandedSemester[index];
    setExpandedSemesters(newExpandedSemester);
  }

  // Adds a new empty semester to the plans
  function addSemester() {
    pushPlans((prevPlans) => [...prevPlans, { semesterId: prevPlans.length + 1, subjects: [] }], "Add empty semester");
  }

  useDndMonitor({
    onDragEnd: (event) => handleDragEnd(event, updateSubject, pushPlans),
  });

  return (
    <SemestersContainer spacing={{ xs: 1, sm: 2 }}>
      {semesters.map((semester, index) => (
        <Semester
          key={semester.semesterId}
          semesterData={semester}
          subjectDataMap={subjectDataMap}
          plannedSubjects={plannedSubjects}
          placeholder={<SemesterPlaceHolder />}
          isRequiredView={!customPlan}
          isExpanded={expandedSemesters[index]}
          onClick={() => toggleSemester(index)}
        />
      ))}
      {customPlan && <AuxiliaryCard icon={AddIcon} text="Adicionar período" onClick={addSemester} />}
    </SemestersContainer>
  );
};

export default Semesters;
