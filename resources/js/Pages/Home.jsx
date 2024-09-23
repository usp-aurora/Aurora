import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header/Header';
import Semester from '../Components/Semesters/Semesters';
import CoursePicker from '../Components/CoursePicker/CoursePicker';
import {
  DndContext, 
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors, 
} from '@dnd-kit/core';
import {arrayMove, sortableKeyboardCoordinates} from '@dnd-kit/sortable';
import SortableItem from '../Components/Atoms/SortableItem';


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

  const [courses, setCourses] = useState(plans.map(plan => ({
    ...plan,  // Inclui os outros campos do plano original
    colors: {
      background: "#FFFFFF",
      innerLine: "#51A1E0",
      outerLine: "#17538D",
    },
    pokeball: "#C2DCF5"
  })));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handler when drag starts
  function handleDragStart(event) {
    const {active} = event;
    const {id} = active;

    setActiveId(id);
  }

  // Handler when drag ends
  const handleDragEnd = (event) => {
    const { active, over } = event;
  };

  return (
    <AppContainer>
      <Header />
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        // onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      > 
        <ContentContainer>
          <Semester courses={courses}/>
          <CoursePicker id="coursePicker"/>
        </ContentContainer>
      
      </DndContext>
    </AppContainer>
  );
};

export default Home;