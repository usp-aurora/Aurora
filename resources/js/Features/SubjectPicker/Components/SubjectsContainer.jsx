import CardsGrid from "../../../ui/Card/CardsGrid";
import SortableCard from "../../../ui/Card/SortableCard";

import { useSubjectMapContext } from "../../../Contexts/SubjectMapContext";
import { usePlansContext } from "../../../Contexts/PlansContext";

const SubjectsContainer = ({ containerName, subjects }) => {
	const { subjectDataMap } = useSubjectMapContext();
	const { plansSet } = usePlansContext();

	return (
		<CardsGrid>
			{subjects.map((subject) => {
				const isBlocked = plansSet.has(subject);
				const subjectData = subjectDataMap[subject];
				if(!subjectData) return null;

				return (
					<SortableCard
						key={subject}
						id={`${subject}@${containerName}`}
						subjectCode={subject}
						container="subjectPicker"
						isBlocked={isBlocked}
						requiredScheduled={false}/>
				);
			})}
		</CardsGrid>
	);
};

export default SubjectsContainer;
