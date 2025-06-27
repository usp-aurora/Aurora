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
	ghost,
	blockDrag,
	badgeColor,
	showBadge,
 	badgeTooltip
}) => {
	const { showSubjectInfo } = useSubjectInfoContext();

	const theme = useTheme(); 

	const handleClick = useCallback(() => {
		if (!ghost) {
			showSubjectInfo(subjectCode);
		}
	}, [ghost, subjectCode]);

	return (
		<SortableItem
			id={id}
			key={subjectCode}
			itemData={{ code: subjectCode, container: container }}
			isStatic={ghost  || blockDrag}
		>
			<MemoizedSubjectCard
				subjectCode={subjectCode}
				onClick={handleClick}
				ghost={ghost}
				badgeColor={badgeColor}
				showBadge={showBadge}
				badgeTooltip={badgeTooltip}
			/>
		</SortableItem>
	);
};

export default SortableCard;
