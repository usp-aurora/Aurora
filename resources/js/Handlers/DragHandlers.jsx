import {arrayMove} from '@dnd-kit/sortable';

const getId = (id) => {
  if (typeof(id) == 'number')
    return id;
  return id.split('@')[0];
}

const getContainer = (semesterAlias, plans) => {
  return plans.find((sem) => sem.alias === semesterAlias);
}

const findContainer = (id, courseMap) => {
    if (courseMap.has(Number(id))) {
      const semesterId = courseMap.get(Number(id)).semester;
      return semesterId ? `Semester ${semesterId}` : 'coursePicker';
    }
  
    return id;
};

// Handler when drag starts
export const handleDragStart = (event, courseMap, setOverlayObject, setDragObject) => {
    const { active } = event;
    const courseId = getId(active.id);
  
    const course = courseMap.get(Number(courseId));
    const containerAlias = findContainer(courseId, courseMap);

    setOverlayObject({ 
      code: course.code, 
      title: course.title,
      colors: course.colors,
      pokeball: course.pokeball,
    });

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
    });
};


// Handler when drag is over another element
export const handleDragOver = (event, courseMap, setPlans, dragObject, setDragObject) => {
    const { _active, over, draggingRect } = event;
    const overId = getId(over?.id);
  
    const overContainer = findContainer(overId, courseMap);
    if (!overContainer || dragObject.container === overContainer) {
      return;
    }
  
    setPlans((prevPlans) =>
      prevPlans.map((semester) => {
        if (semester.alias === dragObject.container) {
          return {
            ...semester,
            credits: [ 
                semester.courses.reduce((acc, course) => acc + Number(course.credits[0]), dragObject.course.credits[0]*(-1)),
                semester.courses.reduce((acc, course) => acc + Number(course.credits[1]), dragObject.course.credits[1]*(-1)),
            ],
            courses: semester.courses.filter((course) => course.id !== dragObject.id),
          };
        } else if (semester.alias === overContainer) {
          const overItems = getContainer(overContainer, prevPlans).courses;
          const overIndex = overItems.findIndex(course => course.id === Number(overId));
          const isAfterLastItem = over && draggingRect &&
            ((overIndex === overItems.length - 1 && draggingRect.offsetTop > over.rect.offsetTop + over.rect.height) ||
             (overIndex === overItems.length - 1 && draggingRect.offsetLeft > over.rect.offsetLeft + over.rect.width));
          
          const newIndex = overIndex >= 0 ? overIndex + (isAfterLastItem ? 1 : 0) : overItems.length;
          
          return {
            ...semester,
            credits: [
                semester.courses.reduce((acc, course) => acc + Number(course.credits[0]), dragObject.course.credits[0]*(1)),
                semester.courses.reduce((acc, course) => acc + Number(course.credits[1]), dragObject.course.credits[1]*(1)),
            ],
            courses: [
              ...semester.courses.slice(0, newIndex).filter((course) => course.id !== dragObject),
              dragObject.course,
              ...semester.courses.slice(newIndex).filter((course) => course.id !== dragObject.id),
            ],
          };
        }
        return semester;
      })
    );
  
    setDragObject((prev) => {
        return {
          ...prev,
          container: overContainer
    }});
  };
  
  
// Handler when drag ends
export const handleDragEnd = (event, courseMap, setCourseMap, plans, setPlans, dragObject, setDragObject) => {
  const { _active, over } = event;
  const overId = getId(over?.id);
  
  const overContainer = findContainer(overId, courseMap);
  
  // update courseMap
  const updatedMap = new Map(courseMap);  
  const semesterId = (dragObject.container == 'coursePicker') ? null : Number(overContainer.split(' ')[1]);
  updatedMap.set(dragObject.id, {...courseMap.get(dragObject.id), semester: semesterId});
  setCourseMap(updatedMap);

  if (!dragObject.container || !overContainer || dragObject.container !== overContainer) {
    setDragObject(null);
    return;
  }

  const activeIndex = getContainer(dragObject.container, plans)?.courses.findIndex((course) => course.id === dragObject.id);
  const overIndex = getContainer(overContainer, plans)?.courses.findIndex((course) => course.id === Number(overId));

  if (activeIndex !== overIndex) {
      setPlans((prevPlans) =>
      prevPlans.map(semester => {
          if (semester.alias === overContainer) 
            return { ...semester, courses: arrayMove(semester.courses, activeIndex, overIndex) };
          return semester;
      })
      );
  }

  setDragObject(null);
};  