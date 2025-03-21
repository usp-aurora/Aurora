import React from "react";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery} from "@mui/material";

import SubjectCard from "./SubjectCard";
import SortableItem from "../../Dnd/SortableItem";
import { useSubjectInfoContext } from "../../../Hooks/useSubjectInfoContext";

const SortableCard = ({
	id,
	subjectCode,
	container,
	isBlocked,
	requiredScheduled
}) => {

	const { showSubjectInfo } = useSubjectInfoContext();
	const theme = useTheme(); 
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<SortableItem
			id={id}
			key={subjectCode}
			itemData={{ code: subjectCode, container: container }}
			isStatic={isBlocked || isMobile}
		>
			<SubjectCard
				subjectCode={subjectCode}
				onClick={() =>
					!isBlocked && showSubjectInfo(subjectCode)
				}
				ghost={isBlocked}
				moon={requiredScheduled}
			/>
		</SortableItem>
	);
};

export default SortableCard;
