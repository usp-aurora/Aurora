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
    const courseId = active.id.split('@')[0];
  
    const course = courseMap.get(Number(courseId));
    const containerAlias = course.semester ? `Semester ${course.semester}` : 'coursePicker';

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
    const { _active, over } = event;
    const overId = over?.id.split('@')[0];
  
    const overContainer = findContainer(overId, courseMap);
    console.log(`De: ${dragObject.container}`);
    console.log(`Para: ${overContainer}`);
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
          return {
            ...semester,
            credits: [
                semester.courses.reduce((acc, course) => acc + Number(course.credits[0]), dragObject.course.credits[0]*(1)),
                semester.courses.reduce((acc, course) => acc + Number(course.credits[1]), dragObject.course.credits[1]*(1)),
            ],
            courses: [...semester.courses.filter((course) => course.id !== dragObject.id), dragObject.course],
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
export const handleDragEnd = (event, courseMap, setCourseMap, dragObject, setDragObject) => {
  const { _active, over } = event;
  const overId = over?.id.split('@')[0];
  
  const overContainer = findContainer(overId, courseMap);
  
  console.log(`Destino: ${overContainer.alias? overContainer.alias : overContainer}`);
  // update courseMap when plans changes
  const updatedMap = new Map(courseMap);  
  const semesterId = (overContainer === 'coursePicker') ? null : Number(overContainer.split(' ')[1]);
  updatedMap.set(dragObject.id, {...courseMap.get(dragObject.id), semester: semesterId});
  
  setCourseMap(updatedMap);
  setDragObject(null);
};  