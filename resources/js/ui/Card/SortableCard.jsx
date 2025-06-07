import { useMediaQuery } from "@mui/material";
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
	...props
}) => {
	const { showSubjectInfo } = useSubjectInfoContext();

	const theme = useTheme(); 
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
			isStatic={isBlocked || isMobile}
		>
			<MemoizedSubjectCard
				subjectCode={subjectCode}
				onClick={handleClick}
				ghost={isBlocked}
				{...props}
			/>
		</SortableItem>
	);
};

export default SortableCard;
