import CardsGrid from "../../../ui/Card/CardsGrid";
import SortableCard from "../../../ui/Card/SortableCard";

import { useSubjectMapContext } from "../../../Contexts/SubjectMapContext";
import { usePlansContext } from "../../../Contexts/PlansContext";
import { useTheme, useMediaQuery } from "@mui/material";

const SubjectsContainer = ({ containerName, subjects }) => {
	const { subjectDataMap } = useSubjectMapContext();
	const { plansSet } = usePlansContext();

	const sortedSubjects = [...subjects].sort((a, b) => {
		if (a.mandatory === b.mandatory) {
			return a.code.localeCompare(b.code);
		}
		return a.mandatory ? -1 : 1;
	});

	return (
		<CardsGrid>
			{sortedSubjects.map((subject) => {
				const isPlanned = plansSet.has(subject.code);
				const subjectData = subjectDataMap[subject.code];
				if(!subjectData) return null;

				const theme = useTheme();
				const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

				return (
					<SortableCard
						key={subject.code}
						id={`${subject.code}@${containerName}`}
						subjectCode={subject.code}
						container="subjectPicker"
						ghost={isPlanned}
						blockDrag={isMobile}
						badgeColor="red"
						showBadge={subject.mandatory}
						badgeTooltip="Matéria obrigatória"
					/>
				);
			})}
		</CardsGrid>
	);
};

export default SubjectsContainer;
