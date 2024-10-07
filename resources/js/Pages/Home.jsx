import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../Components/Atoms/Card';
import CardContentCourse from '../Components/Atoms/CardContentCourse';
import Header from '../Components/Header/Header.jsx';
import Semester from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import AddDisciplinePopUp from '../Components/PopUps/AddDisciplinePopUp.jsx';
import CoursePopUp from '../Components/PopUps/CoursePopUp.jsx';
import {
  DndContext, 
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';


const AppContainer = styled.div`
  /* display: flex;
  height: 100vh;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  background-color: grey; */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;


const Home = ({ userPlans }) => {
  const [activeId, setActiveId] = useState();
  const [activeCourse, setActiveCourse] = useState()
  
  const [addDisciplineActive, setAddDisciplineActive] = useState(false);
  const [coursePopUpActive, setCoursePopUpActive] = useState(false);


  const [plans, setPlans] = useState(
    userPlans.map(semester => ({
      ...semester,
      courses: semester.courses.map(course => ({
        ...course,
        tags: [],
        colors: {
          background: "#FFFFFF",
          innerLine: "#51A1E0",
          outerLine: "#17538D",
        },
        pokeball: "#C2DCF5"
      }))
    }))
  );
  
  const courseMap = useMemo(() => {
    const newCourseMap = new Map();
    plans.forEach(semester => {
      semester.courses.forEach(course => {
        newCourseMap.set(course.id, { course, semester: semester.id });
      });
    });
    return newCourseMap;
  }, [plans]);


  const toggleDiscipline = () => {
    setAddDisciplineActive(!addDisciplineActive);
  }

  const toggleCoursePopUp = () => {
    console.log('click')
    setCoursePopUpActive(!coursePopUpActive);
  }

  const [course, setCourse] = useState({
    pokeball_color: '',
    pokemonURL: '',
    title: '',
    code: '',
    tags: [{
      color: '',
      name: ''
    }],
    credits: [0,0],
    desc: ''
  })

  const toggleCourse = (p_color, p_url, title, code, tags, credits, desc) => {
    setCourse({
      pokeball_color: p_color,
      pokemonURL: p_url,
      title: title,
      code: code,
      tags: tags,
      credits: credits,
      desc: desc
    })
  }


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // importante para possibilitar o evento onClick
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );


  const findContainer = useCallback((id) => {
    if (id === 'coursePicker') {
      return id;
    }
  
    if (courseMap.has(id)) {
      const semester = courseMap.get(id).semester;
      return (semester ? plans.find((sem) => sem.id === courseMap.get(id).semester) : 'coursePicker');
    }
    
    return plans.find((sem) => sem.alias === id);
  }, [courseMap, plans]);

  // Handler when drag starts
  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    
    setActiveCourse(courseMap.get(id).course);
    setActiveId(id);

  };

  // Handler when drag is over another element
  const handleDragOver = (event) => {
    const { active, over, draggingRect } = event;
    const { id: activeId } = active;
    const { id: overId } = over;

  
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

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
              Number(semester.credits[0]) - Number(activeCourse.credits[0]), // Subtrai créditos de aula
              Number(semester.credits[1]) - Number(activeCourse.credits[1]), // Subtrai créditos de trabalho
            ],
            courses: semester.courses.filter(course => course.id !== activeId),
          };
        }
        if (semester.id === overContainer.id) {
          return {
            ...semester,
            credits: [
              Number(semester.credits[0]) + Number(activeCourse.credits[0]), // Subtrai créditos de aula
              Number(semester.credits[1]) + Number(activeCourse.credits[1]), // Subtrai créditos de trabalho
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
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

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
    setActiveId(null);
  };


  return (
    <AppContainer>
      <AddDisciplinePopUp isOpen={addDisciplineActive} onClose={toggleDiscipline} />
      <CoursePopUp isOpen={coursePopUpActive} onClose={toggleCoursePopUp} 
                    pokeball_color={course.pokeball_color} 
                    pokemonURL={course.pokemonURL}
                    title={course.title}
                    code={course.code}
                    tags={course.tags}
                    credits={course.credits}
                    desc={course.desc}
      />
      <Header />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ContentContainer>
          <Semester semesters={plans} openCourse={toggleCoursePopUp} changeCourseDisplay={toggleCourse} setSemesters={setPlans} />
          <CoursePicker openCourse={toggleCoursePopUp} changeCourseDisplay={toggleCourse} openDisciplinePopUp={toggleDiscipline} />
        </ContentContainer>
        
        <DragOverlay modifiers={[restrictToWindowEdges]}> {activeId ?
          <Card colors={activeCourse.colors}>
            <CardContentCourse 
              pokeball={activeCourse.pokeball} 
              courseCode={activeCourse.code} 
              courseTitle={activeCourse.title} 
              pokemonURL="/pokemons/ditto.png"
            />
          </Card> 
          : null} 
        </DragOverlay>
      </DndContext>
    </AppContainer>
  );
};

export default Home;