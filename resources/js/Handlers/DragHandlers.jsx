import { arrayMove } from '@dnd-kit/sortable';

/**
 * Extracts the base ID from a composite string ID.
 * Useful when an ID includes metadata (e.g., "mac123@1").
 * 
 * @param {string | number} id - The original ID.
 * @returns {string | number} - The extracted base ID.
 */
function extractBaseId(id) { 
  return (typeof id === 'string' ? id.split('@')[0] : id); 
}

/**
 * Determines the container (semester or coursePicker) for a given element.
 * 
 * @param {Object} element - The dragged element from DnD.
 * @returns {string} - The container name (e.g., "1" for semester ID or "coursePicker").
 */
function getContainerName(element) { 
  return element?.data.current?.container ?? element?.id; 
}

/**
 * Retrieves the list of subjects for a specific semester.
 * 
 * @param {string} semesterId - The semester identifier.
 * @param {Array} plans - The list of plans containing semester data.
 * @returns {Array} - List of subjects for the given semester, or an empty array if not found.
 */
function getSemesterSubjects(semesterId, plans) {
  return plans.find((semester) => semester.semesterId === semesterId)?.subjects || [];
}

/**
 * Calculates the drop index for a dragged item within a container.
 * 
 * @param {Object} over - The target drop area.
 * @param {Object} draggingRect - The bounding rectangle of the dragged item.
 * @param {Array} targetSubjects - List of subjects in the target container.
 * @returns {number} - The index where the item should be inserted.
 */
function calculateDropIndex(over, draggingRect, targetSubjects) {
  const overId = extractBaseId(over.id);
  const overIndex = targetSubjects.findIndex((subject) => subject.code === overId);
  if (overIndex === -1) return targetSubjects.length; // Place at the end if not found.

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
 * Initializes overlay display and sets the dragged item details.
 * 
 * @param {Object} event - The drag event object.
 * @param {Function} setOverlay - State updater for the overlay object.
 * @param {Function} setDraggedItem - State updater for the dragged object.
 */
function handleDragStart(event, setOverlay, setDraggedItem) {
  const { active } = event;
  const subject = active.data.current.subject;
  const container = active.data.current.container;

  setOverlay({
    code: subject.code,
    name: subject.name,
  });

  setDraggedItem({
    id: subject.code,
    container: container,
    subject: {
      plan: subject.plan,
      code: subject.code,
      name: subject.name,
      desc: subject.desc,
      credits: subject.credits,
    },
  });
}

/**
 * Handles a drag-over event.
 * Updates the plans when a subject is dragged between semesters or coursePicker.
 * 
 * @param {Object} event - The drag event object.
 * @param {Function} updatePlans - State updater for plans.
 * @param {Object} draggedItem - The current dragged item.
 * @param {Function} setDraggedItem - State updater for dragged item.
 */
function handleDragOver(event, updatePlans, draggedItem, setDraggedItem) {
  const { over, draggingRect } = event;
  const targetContainer = getContainerName(over);

  if (!targetContainer || draggedItem.container === targetContainer) return;

  updatePlans((prevPlans) =>
    prevPlans.map((semester) => {
      if (semester.semesterId == draggedItem.container) {
        // Remove the dragged subject from the original semester
        return {
          ...semester,
          subjects: semester.subjects.filter((subject) => subject.code !== draggedItem.id),
        };
      } else if (semester.semesterId == targetContainer) {
        // Insert the dragged subject into the target semester
        const targetSubjects = semester.subjects.filter((subject) => subject.code !== draggedItem.id);
        const newIndex = calculateDropIndex(over, draggingRect, targetSubjects);

        return {
          ...semester,
          subjects: [...targetSubjects.slice(0, newIndex), draggedItem.subject, ...targetSubjects.slice(newIndex)],
        };
      }
      return semester;
    })
  );

  setDraggedItem((prev) => ({
    ...prev,
    container: targetContainer,
  }));
}

/**
 * Handles the end of a drag event.
 * Updates the plans state by moving the dragged item within the same semester.
 * 
 * @param {Object} event - The drag event object.
 * @param {Object} draggedItem - The currently dragged item.
 * @param {Function} updatePlans - State updater for plans.
 */
function handleDragEnd(event, draggedItem, updatePlans) {
  const { over } = event;
  const targetContainer = getContainerName(over);

  if (!targetContainer || draggedItem.container !== targetContainer) return;

  updatePlans((prevPlans) => {
    const sourceIndex = getSemesterSubjects(draggedItem.container, prevPlans).findIndex((subject) => subject.code === draggedItem.id);
    const targetIndex = getSemesterSubjects(targetContainer, prevPlans).findIndex((subject) => subject.code === extractBaseId(over.id));

    if (sourceIndex !== targetIndex) {
      return prevPlans.map((semester) => {
        if (semester.semesterId == targetContainer) {
          return { ...semester, subjects: arrayMove(semester.subjects, sourceIndex, targetIndex) };
        }
        return semester;
      });
    }
    return prevPlans;
  });
}

export { getContainerName, handleDragStart, handleDragOver, handleDragEnd };