import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import AuxiliaryCard from "../Atoms/Card/AuxiliaryCard";
import Semester from "./Semester";
import { usePlansContext } from "../../Hooks/usePlansContext";


const SemestersContainer = styled(Stack)(({ }) => ({
	height: "100vh",
	overflowY: "auto",
	borderRadius: "12px",
	paddingBottom: "100vh",
}));

const MemoizedSemester = memo(Semester);

function Semesters({ isRecommendedView }) {
	const { plans, commitPlans } = usePlansContext();

	function addSemester(){
		commitPlans((prevPlans) => [...prevPlans, { semesterId: prevPlans.length + 1, subjects: [] }], "Add empty semester");
	}
	
	return (
		<SemestersContainer spacing={{ xs: 1, sm: 2 }}>
			{plans.map((semester) => (
				<MemoizedSemester
					key={semester.semesterId}
					semesterData={semester}
					isRecommendedView={isRecommendedView}
				/>
			))}
			{!isRecommendedView && <AuxiliaryCard icon={AddIcon} text="Adicionar período" onClick={addSemester} />}
		</SemestersContainer>
	);
};

export default Semesters;
