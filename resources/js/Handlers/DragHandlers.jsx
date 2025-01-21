import {arrayMove} from '@dnd-kit/sortable';

function getId(id) {return typeof id === 'string' ? id.split('@')[0] : id}

function getContainer(alias, plans) {return plans.find((sem) => sem.alias === alias)}

function findContainer(id, courseMap) {
  if (courseMap.has(Number(id))) {
    const semesterId = courseMap.get(Number(id)).semester
    return semesterId ? `Semester ${semesterId}` : 'coursePicker'
  }
  return id
}

function calculateNewIndex(over, draggingRect, overItems, overId) {
  const overIndex = overItems.findIndex((course) => course.id === Number(overId))

  if (overIndex === -1) return overItems.length

  const isAfterLastItem = over && draggingRect && overIndex === overItems.length - 1 &&
    (draggingRect.offsetTop > over.rect.offsetTop + over.rect.height ||
    draggingRect.offsetLeft > over.rect.offsetLeft + over.rect.width)

  return overIndex + (isAfterLastItem ? 1 : 0)
}

// Handler when drag starts
function handleDragStart(event, courseMap, setOverlayObject, setDragObject) {
    const { active } = event
    const courseId = getId(active.id)

    const course = courseMap.get(Number(courseId))
    const containerAlias = findContainer(courseId, courseMap)

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

// Handler when drag is over another element
function handleDragOver(event, courseMap, setPlans, dragObject, setDragObject) {
  const { over, draggingRect } = event
  const overId = getId(over?.id)

  const overContainer = findContainer(overId, courseMap)
  if (!overContainer || dragObject.container === overContainer) return

  setPlans((prevPlans) => 
    prevPlans.map((semester) => {
      if (semester.alias === dragObject.container) {
        return {
          ...semester,
          credits: semester.credits.map(
            (credit, i) => Number(credit) - Number(dragObject.course.credits[i])
          ),
          courses: semester.courses.filter((course) => course.id !== dragObject.id),
        };
      } else if (semester.alias === overContainer) {
        const overItems = getContainer(overContainer, prevPlans).courses.filter((course) => course.id !== dragObject)
        const newIndex = calculateNewIndex(over, draggingRect, overItems, overId)

        return {
          ...semester,
          credits: semester.credits.map(
            (credit, i) => Number(credit) + Number(dragObject.course.credits[i])
          ),
          courses: [
            ...overItems.slice(0, newIndex),
            dragObject.course,
            ...overItems.slice(newIndex),
          ],
        };
      }
      return semester
    })
  )

  setDragObject((prev) => {
      return {
        ...prev,
        container: overContainer
  }})
}
  
// Handler when drag ends
function handleDragEnd(event, courseMap, dragObject, setPlans) {
  const { over } = event
  const overId = getId(over?.id)

  const overContainer = findContainer(overId, courseMap)
  if (!dragObject.container || !overContainer || dragObject.container !== overContainer) return

  setPlans((prevPlans) => {
    const activeIndex = getContainer(dragObject.container, prevPlans)?.courses.findIndex((course) => course.id === dragObject.id)
    const overIndex = getContainer(overContainer, prevPlans)?.courses.findIndex((course) => course.id === Number(overId))
    if (activeIndex !== overIndex) 
      return prevPlans.map(semester => {
        if (semester.alias === overContainer) 
          return { ...semester, courses: arrayMove(semester.courses, activeIndex, overIndex) }
        else return semester
      })
    else return prevPlans
  })
}

export {handleDragStart, handleDragOver, handleDragEnd}