import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery} from "@mui/material";

import CardsGrid from "../../Atoms/CardsGrid/CardsGrid";
import SubjectCard from "../../Atoms/Card/SubjectCard";
import SortableItem from "../../Dnd/SortableItem";

import { useSubjectInfoContext } from "../../../Hooks/useSubjectInfoContext";

const SubjectsContainer = ({ containerName, plannedSubjects = new Set(), subjects }) => {
	const {
		subjectInfo,
		isSubjectInfoModalOpen,
		closeSubjectInfoModal,
		showSubjectInfo,
	} = useSubjectInfoContext();

	const theme = useTheme(); 
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<CardsGrid>
			{subjects.map((subject) => {
				const isBlocked = plannedSubjects.has(subject.code);

				return (
					<SortableItem
						key={subject.code}
						id={`${subject.code}@${containerName}`}
						itemData={{subject, container: "subjectPicker"}}
						isStatic={isBlocked || isMobile}
					>
						<SubjectCard
							subjectCode={subject.code}
							subjectName={subject.name}
							planetURL="/icons/planeta.png"
							ghost={isBlocked}
							onClick={() => {!isBlocked && showSubjectInfo({
								...subject,
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
