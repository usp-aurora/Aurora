import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { memo } from "react";

import { usePlansContext } from "../../Contexts/PlansContext";
import AuxiliaryCard from "../../ui/Card/AuxiliaryCard";
import Semester from "./Components/Semester";

const SemestersContainer = styled(Stack)(({ }) => ({
	height: "100%",
	overflowY: "auto",
	borderRadius: "12px",
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
