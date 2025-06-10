import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { memo } from "react";

import { usePlansContext } from "../../Contexts/PlansContext";
import { useViewMode } from "../../Contexts/ViewModeContext";
import AuxiliaryCard from "../../ui/Card/AuxiliaryCard";
import Semester from "./Components/Semester";

const SemestersContainer = styled(Stack)(({ }) => ({
	height: "100%",
	overflowY: "auto",
	borderRadius: "12px",
}));

const MemoizedSemester = memo(Semester);

function Semesters() {
	const { plans, commitPlans } = usePlansContext();
	const { isSuggestedPlansView, suggestedPlans } = useViewMode();

	const shownPlans = isSuggestedPlansView ? suggestedPlans : plans;

	function addSemester(){
		if(isSuggestedPlansView) return;

		commitPlans((prevPlans) => [...prevPlans, { semesterId: prevPlans.length + 1, subjects: [] }], "Add empty semester");
	}
	
	return (
		<SemestersContainer spacing={{ xs: 1, sm: 2 }}>
			{shownPlans.map((semester) => (
				<MemoizedSemester
					key={semester.semesterId}
					semesterData={semester}
				/>
			))}
			{!isSuggestedPlansView && <AuxiliaryCard icon={AddIcon} text="Adicionar período" onClick={addSemester} />}
		</SemestersContainer>
	);
};

export default Semesters;
