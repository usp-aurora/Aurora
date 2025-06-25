import CardsGrid from "../../../ui/Card/CardsGrid";
import SortableCard from "../../../ui/Card/SortableCard";

import { useSubjectMapContext } from "../../../Contexts/SubjectMapContext";
import { usePlansContext } from "../../../Contexts/PlansContext";

const SubjectsContainer = ({ containerName, subjects }) => {
	const { subjectDataMap } = useSubjectMapContext();
	const { plansSet } = usePlansContext();

	const sortedSubjects = [...subjects].sort((a, b) => a.code.localeCompare(b.code));

	return (
		<CardsGrid>
			{sortedSubjects.map((subject) => {
				const isBlocked = plansSet.has(subject.code);
				const subjectData = subjectDataMap[subject.code];
				if(!subjectData) return null;

				return (
					<SortableCard
						key={subject.code}
						id={`${subject.code}@${containerName}`}
						subjectCode={subject.code}
						container="subjectPicker"
						isBlocked={isBlocked}
						badgeColor="red"
						showBadge={subject.mandatory}
					/>
				);
			})}
		</CardsGrid>
	);
};

export default SubjectsContainer;
