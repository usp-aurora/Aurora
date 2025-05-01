import React from "react";
import CardsGrid from "../../Atoms/CardsGrid/CardsGrid";
import SubjectCard from "../../Atoms/Card/SubjectCard";
import SortableItem from "../../Dnd/SortableItem";

import { useSubjectInfoContext } from "../../../Hooks/useSubjectInfoContext";

const SubjectsContainer = ({ containerName, subjectDataMap, plannedSubjects = new Set(), subjects }) => {
	const {
		subjectInfo,
		isSubjectInfoModalOpen,
		closeSubjectInfoModal,
		showSubjectInfo,
	} = useSubjectInfoContext();

	return (
		<CardsGrid>
			{subjects.map((subject) => {
				const isBlocked = plannedSubjects.has(subject.code);
				const subjectTags = subjectDataMap ? subjectDataMap.get(subject.code)?.tags || [] : [];

				return (
					<SortableItem
						key={subject.code}
						id={`${subject.code}@${containerName}`}
						container={"subjectPicker"}
						subjectData={subject}
						disabled={isBlocked}
					>
						<SubjectCard
							subjectCode={subject.code}
							subjectName={subject.name}
							planetURL="/icons/planeta.png"
							ghost={isBlocked}
							onClick={() => {!isBlocked && showSubjectInfo({
								...subject,
								tags: subjectTags,
								isPlanned: false,
							})}}
						/>
					</SortableItem>
				);
			})}
		</CardsGrid>
	);
};

export default SubjectsContainer;
