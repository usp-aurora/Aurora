import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import AuxiliaryCard from "../Atoms/Card/AuxiliaryCard";
import Semester from "./Semester";
import SemesterPlaceholder from "./SemesterPlaceholder";
import { usePlansContext } from "../../Hooks/usePlansContext";
import { handleDragEnd } from "../../Handlers/DragHandlers";
import { useDndMonitor } from "@dnd-kit/core";


const SemestersContainer = styled(Stack)(({ }) => ({
	height: "100vh",
	overflowY: "auto",
	borderRadius: "12px",
	paddingBottom: "100vh",
}));

function Semesters({ isRecommendedView }) {
	const { plans, commitPlans } = usePlansContext();

	const [expandedSemesters, setExpandedSemesters] = useState(plans.map(() => true));
	const toggleSemester = (index) => {
		const newExpandedSemester = [...expandedSemesters];
		newExpandedSemester[index] = !newExpandedSemester[index];
		setExpandedSemesters(newExpandedSemester);
	}

	// Adds a new empty semester to the plans
	function addSemester() {
		commitPlans((prevPlans) => [...prevPlans, { semesterId: prevPlans.length + 1, subjects: [] }], "Add empty semester");
	}

	useDndMonitor({
		onDragEnd: (event) => handleDragEnd(event, commitPlans),
	});

	return (
		<SemestersContainer spacing={{ xs: 1, sm: 2 }}>
			{plans.map((semester, index) => (
				<Semester
					key={semester.semesterId}
					semesterData={semester}
					placeholder={<SemesterPlaceholder />}
					isRecommendedView={isRecommendedView}
					isExpanded={expandedSemesters[index]}
					onClick={() => toggleSemester(index)}
				/>
			))}
			{!isRecommendedView && <AuxiliaryCard icon={AddIcon} text="Adicionar período" onClick={addSemester} />}
		</SemestersContainer>
	);
};

export default Semesters;
