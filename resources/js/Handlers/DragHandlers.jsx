import {arrayMove} from '@dnd-kit/sortable'

/**
 * Extracts the usable ID from a string ID.
 * @param {string | number} id - The ID to process.
 * @returns {string} = The important part of the ID 
 */
function getId(id) { return typeof id === 'string' ? id.split('@')[0] : id }

/**
 * Finds a semester by its alias in the plans.
 * @param {string} alias - The alias of the semester.
 * @param {Array} plans - The list of plans grouped by semester.
 * @returns {Object} The semester object or undefined if not found.
 */
function findSemesterByAlias(alias, plans) { return plans.find((semester) => semester.alias === alias) }

/**
 * Determines the container alias for a given course ID using the course map.
 * @param {string | null} id - The course ID or the container alias itself .
 * @param {Map} courseMap - The course map.
 * @returns {string | null} The container alias ('Semester X' or 'coursePicker').
 */
function determineContainerAlias(id, courseMap) {
  if (courseMap.has(Number(id))) {
    const semesterId = courseMap.get(Number(id)).semester
    return semesterId ? `Semester ${semesterId}` : 'coursePicker'
  }
  return id
}


/**
 * Calculates the new index for the dragged item.
 * @param {Object} over - The target element.
 * @param {Object} draggingRect - The rectangle of the dragging item.
 * @param {Array} overItems - The list of items in the target container.
 * @param {number} overId - The ID of the item being dragged over.
 * @returns {number} The new index for the dragged item.
 */
function calculateDropIndex(over, draggingRect, overItems, overId) {
  const overIndex = overItems.findIndex((course) => course.id === overId)

  if (overIndex === -1) return overItems.length

  const isAfterLastItem = over && draggingRect && overIndex === overItems.length - 1 &&
    (draggingRect.offsetTop > over.rect.offsetTop + over.rect.height ||
      draggingRect.offsetLeft > over.rect.offsetLeft + over.rect.width)

  return overIndex + (isAfterLastItem ? 1 : 0)
}

/**
 * Handles the start of a drag event.
 * @param {Object} event - The drag event object from DnD Kit.
 * @param {Map} courseMap - The course map containing course details.
 * @param {Function} setOverlayObject - State updater for the overlay object.
 * @param {Function} setDragObject - State updater for the drag object.
 */
function handleDragStart(event, courseMap, setOverlayObject, setDragObject) {
  const { active } = event
  const courseId = getId(active.id)

  const course = courseMap.get(Number(courseId))
  const containerAlias = determineContainerAlias(courseId, courseMap)

  setOverlayObject({ 
    code: course.code, 
    title: course.title,
    colors: course.colors,
    pokeball: course.pokeball,
  })

  setDragObject({
    id: course.id,
    container: containerAlias,
    course: {
      id: course.id,
      code: course.code,
      credits: course.credits,
      desc: course.desc,
      plan: course.plan,
      title: course.title,
    },
  })
}

/**
 * Handles dragging over another element.
 * @param {Object} event - The drag event object from DnD Kit.
 * @param {Map} courseMap - The course map containing course details.
 * @param {Function} updatePlans - State updater for the plans.
 * @param {Object} dragObject - The current drag object.
 * @param {Function} updateDragObject - State updater for the drag object.
 */
function handleDragOver(event, courseMap, updatePlans, dragObject, updateDragObject) {
  const { over, draggingRect } = event
  const overId = getId(over?.id)
  
  const targetContainer = determineContainerAlias(overId, courseMap)
  if (!targetContainer || dragObject.container === targetContainer) return

  updatePlans((previousPlans) => 
    previousPlans.map((semester) => {
      if (semester.alias === dragObject.container) {
        return {
          ...semester,
          credits: semester.credits.map(
            (credit, i) => Number(credit) - Number(dragObject.course.credits[i])
          ),
          courses: semester.courses.filter((course) => course.id !== dragObject.id),
        }
      } else if (semester.alias === targetContainer) {
        const targetCourses = findSemesterByAlias(targetContainer, previousPlans).courses.filter(
          (course) => course.id !== dragObject.id
        )
        const newIndex = calculateDropIndex(over, draggingRect, targetCourses, overId)

        return {
          ...semester,
          credits: semester.credits.map(
            (credit, i) => Number(credit) + Number(dragObject.course.credits[i])
          ),
          courses: [
            ...targetCourses.slice(0, newIndex),
            dragObject.course,
            ...targetCourses.slice(newIndex),
          ],
        }
      }
      return semester
    })
  )

  updateDragObject((previous) => ({
    ...previous,
    container: targetContainer,
  }))
}
  
/**
 * Handles the end of a drag event.
 * @param {Object} event - The drag event object from DnD Kit.
 * @param {Map} courseMap - The course map containing course details.
 * @param {Object} dragObject - The current drag object.
 * @param {Function} updatePlans - State updater for the plans.
 */
function handleDragEnd(event, courseMap, dragObject, updatePlans) {
  const { over } = event
  const overId = getId(over?.id)

  const targetContainer = determineContainerAlias(overId, courseMap)
  if (!targetContainer || dragObject.container !== targetContainer) return

  updatePlans((previousPlans) => {
    const sourceIndex = findSemesterByAlias(dragObject.container, previousPlans)?.courses.findIndex(
      (course) => course.id === dragObject.id
    )
    const targetIndex = findSemesterByAlias(targetContainer, previousPlans)?.courses.findIndex(
      (course) => course.id === overId
    )
    if (sourceIndex !== targetIndex) {
      return previousPlans.map((semester) => {
        if (semester.alias === targetContainer) {
          return { ...semester, courses: arrayMove(semester.courses, sourceIndex, targetIndex) }
        }
        return semester
      })
    }
    return previousPlans
  })
}

export {handleDragStart, handleDragOver, handleDragEnd}