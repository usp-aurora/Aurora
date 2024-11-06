import {arrayMove} from '@dnd-kit/sortable';

const findContainer = (id, courseMap, plans) => {
    if (!id) return null; 

    if (id === 'coursePicker') {
      return id;
    }
  
    if (courseMap.has(id)) {
      const semester = courseMap.get(id).semester;
      return semester ? plans.find((sem) => sem.id === courseMap.get(id).semester) : 'coursePicker';
    }
  
    return plans.find((sem) => sem.alias === id);
};


// Handler when drag starts
export const handleDragStart = (event, courseMap, setDragObject) => {
    const { active } = event;
    const { id } = active;
  
    setDragObject({
      id: id,
      course: courseMap.get(id),
    });
};


// Handler when drag is over another element
export const handleDragOver = (event, courseMap, plans, setPlans, dragObject) => {
    const { active, over, draggingRect } = event;
    const { id: activeId } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(activeId, courseMap, plans);
    const overContainer = findContainer(overId, courseMap, plans);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
        return;
    }

    if (overId === 'coursePicker') {
        return;
    }

    setPlans((prevPlans) => {
        const activeItems = activeContainer.courses;
        const overItems = overContainer.courses;

        const activeIndex = activeItems.findIndex(course => course.id === activeId);
        const overIndex = overItems.findIndex(course => course.id === overId);

        let newIndex;
        if (overId in prevPlans) {
        newIndex = overItems.length;
        } else {
        const isAfterLastItem = over && draggingRect && (
            (overIndex === overItems.length - 1 &&
            draggingRect.offsetTop > over.rect.offsetTop + over.rect.height) ||
            (overIndex === overItems.length - 1 &&
            draggingRect.offsetLeft > over.rect.offsetLeft + over.rect.width)
        );

        newIndex = overIndex >= 0 ? overIndex + (isAfterLastItem ? 1 : 0) : overItems.length;
        }

        return prevPlans.map(semester => {
        if (semester.id === activeContainer.id) {
            return {
            ...semester,
            credits: [
                Number(semester.credits[0]) - Number(dragObject.course.credits[0]),
                Number(semester.credits[1]) - Number(dragObject.course.credits[1]),
            ],
            courses: semester.courses.filter(course => course.id !== activeId),
            };
        }
        if (semester.id === overContainer.id) {
            return {
            ...semester,
            credits: [
                Number(semester.credits[0]) + Number(dragObject.course.credits[0]),
                Number(semester.credits[1]) + Number(dragObject.course.credits[1]),
            ],
            courses: [
                ...semester.courses.slice(0, newIndex),
                activeItems[activeIndex],
                ...semester.courses.slice(newIndex),
            ],
            };
        }
        return semester;
        });
    });
};


// Handler when drag ends
export const handleDragEnd = (event, courseMap, plans, setPlans, setDragObject) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id, courseMap, plans);
    const overContainer = findContainer(overId, courseMap, plans);

    if (!activeContainer || !overContainer || activeContainer.id !== overContainer.id) {
        return;
    }

    const activeIndex = activeContainer.courses.findIndex((course) => course.id === id);
    const overIndex = overContainer.courses.findIndex((course) => course.id === overId);

    if (activeIndex !== overIndex) {
        setPlans((prevPlans) =>
        prevPlans.map(semester => {
            if (semester.id === overContainer.id) {
            const updatedCourses = arrayMove(semester.courses, activeIndex, overIndex);
            return { ...semester, courses: updatedCourses };
            }
            return semester;
        })
        );
    }

    setDragObject(null);
};
  