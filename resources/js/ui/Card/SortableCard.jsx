import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { memo, useCallback } from "react";

import { usePlansContext } from "../../Contexts/PlansContext";
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
	isRecommendedView
}) => {
	const { plansSet } = usePlansContext();
	const { showSubjectInfo } = useSubjectInfoContext();

	const requiredScheduled = isRecommendedView && plansSet.has(subjectCode);

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
			isStatic={isBlocked || isMobile || completed}
		>
			<MemoizedSubjectCard
				subjectCode={subjectCode}
				onClick={handleClick}
				ghost={isBlocked && !completed}
				moon={requiredScheduled}
			/>
		</SortableItem>
	);
};

export default SortableCard;
