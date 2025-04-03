import React, { memo, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import SubjectCard from "./SubjectCard";
import SortableItem from "../../Dnd/SortableItem";
import { useSubjectInfoContext } from "../../../Hooks/useSubjectInfoContext";
import { usePlansContext } from "../../../Hooks/usePlansContext";

const MemoizedSubjectCard = memo(SubjectCard);

const SortableCard = ({
	id,
	subjectCode,
	container,
	isBlocked,
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
			isStatic={isBlocked || isMobile}
		>
			<MemoizedSubjectCard
				subjectCode={subjectCode}
				onClick={handleClick}
				ghost={isBlocked}
				moon={requiredScheduled}
			/>
		</SortableItem>
	);
};

export default SortableCard;
