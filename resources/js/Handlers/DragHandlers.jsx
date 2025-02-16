import { arrayMove } from '@dnd-kit/sortable';

/**
 * Extracts the base ID from a composite string ID.
 * @param {string | number} id - The ID to process.
 * @returns {string | number} - Extracted ID.
 */
function extractBaseId(id) { return (typeof id === 'string' ? id.split('@')[0] : id); }

/**
 * Determines the container alias for a given element.
 * @param {Object} element - The DnD element.
 * @returns {string} - The container alias (e.g., "Semester X" or "coursePicker").
 */
function getContainerAlias(element) { return element?.data.current?.container ?? element?.id; }

/**
 * Retrieves the list of courses for a given semester alias.
 * @param {string} alias - The semester alias.
 * @param {Array} plans - The list of plans.
 * @returns {Array} - List of courses for the semester, or an empty array if not found.
 */
function getSemesterCourses(alias, plans) {
  return plans.find((semester) => semester.alias === alias)?.courses || [];
};

/**
 * Calculates the drop position for a dragged item.
 * @param {Object} over - The target drop area.
 * @param {Object} draggingRect - The rectangle of the dragged item.
 * @param {Array} targetCourses - Courses currently in the drop container.
 * @returns {number} - The new index for the dragged item.
 */
function calculateDropIndex(over, draggingRect, targetCourses) {
  const overId = extractBaseId(over.id);
  const overIndex = targetCourses.findIndex((course) => course.code === overId);
  if (overIndex === -1) return targetCourses.length;

  const isAfterLastItem =
    over &&
    draggingRect &&
    overIndex === targetCourses.length - 1 &&
    (draggingRect.offsetTop > over.rect.offsetTop + over.rect.height ||
      draggingRect.offsetLeft > over.rect.offsetLeft + over.rect.width);

  return overIndex + (isAfterLastItem ? 1 : 0);
}

/**
 * Handles the start of a drag event.
 * @param {Object} event - The drag event object.
 * @param {Function} setOverlay - State updater for the overlay object.
 * @param {Function} setDraggedItem - State updater for the dragged object.
 */
function handleDragStart(event, setOverlay, setDraggedItem) {
  const { active } = event;
  const course = active.data.current.course;
  const container = active.data.current.container;

  setOverlay({
    code: course.code,
    title: course.title,
    colors: course.colors,
    pokeball: course.pokeball,
  });

  setDraggedItem({
    id: course.code,
    container: container,
    course: {
      id: course.id,
      code: course.code,
      credits: course.credits,
      desc: course.desc,
      plan: course.plan,
      title: course.title,
    },
  });
}

/**
 * Handles a drag-over event.
 * @param {Object} event - The drag event object.
 * @param {Function} updatePlans - State updater for plans.
 * @param {Object} draggedItem - The current dragged item.
 * @param {Function} setDraggedItem - State updater for dragged item.
 */
function handleDragOver(event, updatePlans, draggedItem, setDraggedItem) {
  const { over, draggingRect } = event;
  const targetContainer = getContainerAlias(over);

  if (!targetContainer || draggedItem.container === targetContainer) return;

  updatePlans((prevPlans) =>
    prevPlans.map((semester) => {
      if (semester.alias === draggedItem.container) {
        return {
          ...semester,
          credits: semester.credits.map((credit, i) => Number(credit) - Number(draggedItem.course.credits[i])),
          courses: semester.courses.filter((course) => course.code !== draggedItem.id),
        };
      } else if (semester.alias === targetContainer) {
        const targetCourses = semester.courses.filter((course) => course.code !== draggedItem.id);
        const newIndex = calculateDropIndex(over, draggingRect, targetCourses);

        return {
          ...semester,
          credits: semester.credits.map((credit, i) => Number(credit) + Number(draggedItem.course.credits[i])),
          courses: [...targetCourses.slice(0, newIndex), draggedItem.course, ...targetCourses.slice(newIndex)],
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
 * @param {Object} event - The drag event object.
 * @param {Object} draggedItem - The currently dragged item.
 * @param {Function} updatePlans - State updater for plans.
 */
function handleDragEnd(event, draggedItem, updatePlans) {
  const { over } = event;
  const targetContainer = getContainerAlias(over);

  if (!targetContainer || draggedItem.container !== targetContainer) return;

  updatePlans((prevPlans) => {
    const sourceIndex = getSemesterCourses(draggedItem.container, prevPlans).findIndex((course) => course.code === draggedItem.id);
    const targetIndex = getSemesterCourses(targetContainer, prevPlans).findIndex((course) => course.code === extractBaseId(over.id));

    if (sourceIndex !== targetIndex) {
      return prevPlans.map((semester) => {
        if (semester.alias === targetContainer) {
          return { ...semester, courses: arrayMove(semester.courses, sourceIndex, targetIndex) };
        }
        return semester;
      });
    }
    return prevPlans;
  });
}

export { handleDragStart, handleDragOver, handleDragEnd };