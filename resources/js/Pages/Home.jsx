import React, { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import Card from '../Components/Atoms/Card';
import CardContentCourse from '../Components/Atoms/CardContentCourse';
import Header from '../Components/Header/Header';
import Semester from '../Components/Semesters/Semesters';
import CoursePicker from '../Components/CoursePicker/CoursePicker';
import {
  DndContext, 
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  closestCorners, 
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


const Home = ({ plans }) => {
  const [activeId, setActiveId] = useState();
  const [activeCourse, setActiveCourse] = useState();
  const [curriculum, setCurriculum] = useState(plans);


  const courseMap = useMemo(() => {
    const newCourseMap = new Map();
    curriculum.forEach(semester => {
      semester.courses.forEach(course => {
        newCourseMap.set(course.id, { course, semester });
      });
    });
    return newCourseMap;
  }, [curriculum]);


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );


  const findContainer = useCallback((id) => {
    if (id === 'coursePicker') {
      return id;
    }
  
    if (courseMap.has(id)) {
      return courseMap.get(id).semester;
    }
  
    return curriculum.find((sem) => sem.alias === id);
  }, [courseMap, curriculum]);


  // Handler when 'Semesters' sends data
  function handleDataFromSemesters(data) {
    setCurriculum(data);
  }

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

    setCurriculum((prev) => {
      const activeItems = activeContainer.courses;
      const overItems = overContainer.courses;

      const activeIndex = activeItems.findIndex(course => course.id === activeId);
      const overIndex = overItems.findIndex(course => course.id === overId);

      console.log(overId);
      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
          const isAfterLastItem = over && (
            (overIndex === overItems.length - 1 && 
              draggingRect.offsetTop > over.rect.offsetTop + over.rect.height) ||
            (overIndex === overItems.length - 1 && 
              draggingRect.offsetLeft > over.rect.offsetLeft + over.rect.width)  
          );
        
        newIndex = overIndex >= 0 ? overIndex + (isAfterLastItem ? 1 : 0) : overItems.length + 1;
      }

      return prev.map(semester => {
        if (semester.id === activeContainer.id) {
          return {
            ...semester,
            courses: semester.courses.filter(course => course.id !== activeId),
          };
        }
        if (semester.id === overContainer.id) {
          return {
            ...semester,
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
      setCurriculum((curriculum) =>
        curriculum.map(semester => {
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
      <Header />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ContentContainer>
          <Semester semesters={curriculum} sendDataToParent={handleDataFromSemesters} />
          <CoursePicker id="coursePicker"/>
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