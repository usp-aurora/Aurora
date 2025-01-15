const findContainer = (id, courseMap, plans) => {
    if (!id || id === 'coursePicker') {
      return id;
    }
  
    if (courseMap.has(Number(id))) {
      const semester = courseMap.get(Number(id)).semester;
      return semester ? plans.find((sem) => sem.id === semester) : 'coursePicker';
    }
  
    return plans.find((sem) => sem.alias === id);
};


// Handler when drag starts
export const handleDragStart = (event, courseMap, plans, setDragObject, setActiveContainer) => {
    const { active } = event;
    const courseId = active.id.split('@')[0];
  
    setDragObject({
      id: Number(courseId),
      course: courseMap.get(Number(courseId)),
    });

    setActiveContainer(findContainer(courseId, courseMap, plans));
};


// Handler when drag is over another element
export const handleDragOver = (event, courseMap, plans, setPlans, dragObject, activeContainer, setActiveContainer) => {
    const { active, over } = event;
    const activeId = active.id.split('@')[0];
    const overId = over?.id.split('@')[0];
  
    const overContainer = findContainer(overId, courseMap, plans);
  
    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
  
    setPlans((prevPlans) =>
      prevPlans.map((semester) => {
        if (semester.id === activeContainer.id) {
          return {
            ...semester,
            credits: [ 
                semester.courses.reduce((acc, course) => acc + Number(course.credits[0]), dragObject.course.credits[0]*(-1)),
                semester.courses.reduce((acc, course) => acc + Number(course.credits[1]), dragObject.course.credits[1]*(-1)),
            ],
            courses: semester.courses.filter((course) => course.id != Number(activeId)),
          };
        } else if (semester.id === overContainer.id) {
          return {
            ...semester,
            credits: [
                semester.courses.reduce((acc, course) => acc + Number(course.credits[0]), dragObject.course.credits[0]*(1)),
                semester.courses.reduce((acc, course) => acc + Number(course.credits[1]), dragObject.course.credits[1]*(1)),
            ],
            courses: [...semester.courses.filter((course) => course.id != Number(activeId)), dragObject.course],
          };
        }
        return semester;
      })
    );
  
    setActiveContainer(overContainer);
  };
  
  
// Handler when drag ends
export const handleDragEnd = (event, courseMap, setCourseMap, plans, dragObject, setDragObject) => {
  const { active, over } = event;
  const overId = over?.id.split('@')[0];
  
  const overContainer = findContainer(overId, courseMap, plans);
  
  console.log(`Destino: ${overContainer.alias? overContainer.alias : overContainer}`);

  // update courseMap when plans changes
  const updatedMap = new Map(courseMap);

   plans.forEach((semester) => {
     semester.courses.forEach((course) => {
       const existingEntry = updatedMap.get(course.id);
       if (existingEntry) {
         updatedMap.set(course.id, {
           ...existingEntry,
           plan: course.plan,
           semester: semester.id, 
         });
       }
     });
   });
  
    if (overContainer === 'coursePicker') {
       updatedMap.set(dragObject.id, {...dragObject.course, semester: null});
    }
  
    setCourseMap(updatedMap);  
    setDragObject(null);
};  