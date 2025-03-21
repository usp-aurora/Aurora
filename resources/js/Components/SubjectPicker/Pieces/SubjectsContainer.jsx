import React from "react";

import CardsGrid from "../../Atoms/CardsGrid/CardsGrid";
import SortableCard from "../../Atoms/Card/SortableCard";

import { useSubjectMapContext } from "../../../Hooks/useSubjectMapContext";
import { usePlansContext } from "../../../Hooks/usePlansContext";

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
