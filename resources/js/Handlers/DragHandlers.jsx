import { arrayMove } from '@dnd-kit/sortable';

/**
 * Extracts the base ID from a composite string ID.
 * Useful when IDs contain additional metadata (e.g., "mac123@1").
 * 
 * @param {string | number} id - The original ID, possibly containing metadata.
 * @returns {string | number} - The base ID without metadata.
 */
function extractBaseId(id) {
	return typeof id === 'string' ? id.split('@')[0] : id;
}

/**
 * Determines the container (e.g., a semester or the course picker) associated with a given element.
 * 
 * @param {Object} element - The dragged element from DnD.
 * @returns {string} - The container name (e.g., semester ID or "coursePicker").
 */
function getContainerName(element) {
	return element?.data?.current?.container ?? element?.id;
}

/**
 * Retrieves the list of subjects for a given semester.
 * 
 * @param {string} semesterId - The unique identifier of the semester.
 * @param {Array} plans - The collection of semester plans.
 * @returns {Array} - A list of subjects for the specified semester, or an empty array if not found.
 */
function getSemesterSubjects(semesterId, plans) {
	return plans.find((semester) => semester.semesterId === semesterId)?.subjects || [];
}

/**
 * Determines the appropriate drop index for a dragged item within a target container.
 * 
 * @param {Object} over - The target drop area.
 * @param {Object} draggingRect - The bounding rectangle of the dragged item.
 * @param {Array} targetSubjects - The list of subjects currently in the target container.
 * @returns {number} - The calculated index at which the item should be inserted.
 */
function calculateDropIndex(over, draggingRect, targetSubjects) {
	const overId = extractBaseId(over.id);
	const overIndex = targetSubjects.findIndex((subject) => subject.code === overId);
	if (overIndex === -1) return targetSubjects.length; // If not found, place at the end.

	const isAfterLastItem =
		over &&
		draggingRect &&
		overIndex === targetSubjects.length - 1 &&
		(draggingRect.offsetTop > over.rect.offsetTop + over.rect.height ||
			draggingRect.offsetLeft > over.rect.offsetLeft + over.rect.width);

	return overIndex + (isAfterLastItem ? 1 : 0);
}

/**
 * Handles the start of a drag event.
 * Initializes the overlay display and stores details of the dragged subject.
 * 
 * @param {Object} event - The drag event object.
 * @param {Function} setDraggedItem - State updater function for storing the dragged item data.
 */
function handleDragStart(event, setDraggedItem) {
	const { active } = event;

	const data = active.data.current;

	setDraggedItem({
		code: data.code,
		container: data.container,
	});
}

/**
 * Handles a drag-over event.
 * Updates semester plans when a subject is dragged between different semesters or the course picker.
 * 
 * @param {Object} event - The drag event object.
 * @param {Object} draggedItem - The currently dragged subject.
 * @param {Function} updatePlans - State updater function for modifying semester plans.
 */
function handleDragOver(event, draggedItem, setDraggedItem, updatePlans) {
	const { over } = event;
	const targetContainer = getContainerName(over);

	if (!targetContainer || draggedItem.container === targetContainer) return;

	updatePlans((prevPlans) => {
		return prevPlans.map((semester) => {
			if (semester.semesterId === draggedItem.container) {
				// Remove the subject from its original semester
				return {
					...semester,
					subjects: semester.subjects.filter((subject) => subject.code !== draggedItem.code),
				};
			} else if (semester.semesterId === targetContainer) {
				// Add the subject to the new semester
				return {
					...semester,
					subjects: [...semester.subjects.filter((subject) => subject.code !== draggedItem.code), draggedItem],
				};
			}
			return semester;
		});
	});

	setDraggedItem((prev) => ({
		...prev,
		container: targetContainer,
	}));
}

/**
 * Handles the completion of a drag event.
 * Updates the semester plans by repositioning the dragged subject within the appropriate semester.
 * 
 * @param {Object} event - The drag event object.
 */
function handleDragEnd(event, commitPlans) {
	const { active, over, draggingRect } = event;
	const targetContainer = getContainerName(over);

	if (!targetContainer) return;

	const activeId = extractBaseId(active.id);

	const action = {
		key: activeId,
		changes: {
			"semesterTo": targetContainer === "subjectPicker" ? null : targetContainer
		} 
	  };

	commitPlans((prevPlans) => {
		const targetSubjects = getSemesterSubjects(targetContainer, prevPlans);
		const sourceIndex = targetSubjects.findIndex((subject) => subject.code === activeId);
		const targetIndex =
			active.data.current.container === "subjectPicker"
				? targetSubjects.length
				: calculateDropIndex(over, draggingRect, targetSubjects);

		console.log("targetSubjects: ", targetSubjects);
		console.log("sourceIndex: ", sourceIndex);
		console.log("targetIndex: ", targetIndex);
		console.log("targetContainer: ", targetContainer);

		if (sourceIndex !== targetIndex) {
			return prevPlans.map((semester) => {
				if (semester.semesterId === targetContainer) {
					return { ...semester, subjects: arrayMove(semester.subjects, sourceIndex, targetIndex) };
				}
				return semester;
			});
		}
		return prevPlans;
	}, action);
}

export {
	getContainerName,
	handleDragStart,
	handleDragOver,
	handleDragEnd
};