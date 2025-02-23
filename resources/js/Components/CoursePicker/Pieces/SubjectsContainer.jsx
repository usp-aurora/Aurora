import React from "react";
import CardsGrid from "../../Atoms/CardsGrid/CardsGrid";
import SubjectCard from "../../Atoms/Card/SubjectCard";
import SortableItem from "../../Dnd/SortableItem";

import { useSubjectInfoContext } from "../../../Hooks/useSubjectInfoContext";

const SubjectsContainer = ({ containerName, courseMap, subjects }) => {
    const {
        subjectInfo,
        isSubjectInfoModalOpen,
        closeSubjectInfoModal,
        showSubjectInfo,
    } = useSubjectInfoContext();

    return (
		<CardsGrid>
			{subjects.map((subject) => {
				const subjectInfo = courseMap.get(subject.code);
				const isBlocked = subjectInfo.semester !== null

				return (
					<SortableItem
						id={subject.code}
						key={subject.code}
						subjectData={subject}
						containerName={containerName}
						disabled={isBlocked}
					>
						<SubjectCard
							courseCode={subject.code}
							courseName={subject.name}
							planetURL="/icons/planeta.png"
							ghost={isBlocked}
							onClick={() => {!isBlocked && showSubjectInfo({
								...subject,
								tags: subjectInfo.tags,
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
