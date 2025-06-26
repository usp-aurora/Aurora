import { useTheme } from "@mui/material/styles";
import { memo, useCallback } from "react";

import SortableItem from "../../Features/DragAndDrop/SortableItem";
import { useSubjectInfoContext } from "../../Features/SubjectInfo/SubjectInfoContext";
import SubjectCard from "./SubjectCard";

const MemoizedSubjectCard = memo(SubjectCard);

const SortableCard = ({
	id,
	subjectCode,
	container,
	isBlocked,
	completed,
	badgeColor,
	showBadge,
 	badgeTooltip
}) => {
	const { showSubjectInfo } = useSubjectInfoContext();

	const theme = useTheme(); 

	const handleClick = useCallback(() => {
		if (!isBlocked) {
			showSubjectInfo(subjectCode);
		}
	}, [isBlocked, subjectCode]);

	return (
		<SortableItem
			id={id}
			key={subjectCode}
			itemData={{ code: subjectCode, container: container }}
			isStatic={isBlocked  || completed}
		>
			<MemoizedSubjectCard
				subjectCode={subjectCode}
				onClick={handleClick}
				ghost={isBlocked && !completed}
				badgeColor={badgeColor}
				showBadge={showBadge}
				badgeTooltip={badgeTooltip}
			/>
		</SortableItem>
	);
};

export default SortableCard;
