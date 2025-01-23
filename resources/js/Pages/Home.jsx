import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header/Header.jsx';
import Semester from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import AddDisciplinePopUp from '../Components/PopUps/AddDisciplinePopUp.jsx';
import CoursePopUp from '../Components/PopUps/CoursePopUp.jsx';
import usePlanSync from '../Hooks/usePlanSync.jsx';
import useLifecycleHandlers from '../Hooks/useLifecycleHandlers.jsx';
import { computeCollision, DragMonitor } from '../Components/Dnd/Utilities.jsx';
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ClipLoader } from "react-spinners";

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5em;
  color: #555;
`;


const categories = [
  {
    name: 'Ciência de dados',
    courses: [
      { id: 1 },
      { id: 2 }, 
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ],
    color: '#FFD12B',
    completed: 0,
    total: 7,
  },
  {
    name: 'Inteligência Artificial',
    courses: [
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
    ],
    color: '#E83030',
    completed: 0,
    total: 7,
  },
  {
    name: 'Sistemas de Software',
    courses: [
      { id: 11 },
      { id: 12 }, 
      { id: 13 },
      { id: 14 },
      { id: 15 },
    ],
    color: '#15B48F',
    completed: 0,
    total: 7,
  },
  {
    name: 'Teoria da Computação',
    courses: [
      { id: 16 },
      { id: 17 }, 
      { id: 18 },
      { id: 19 },
    ],
    color: '#6762CD',
    completed: 0,
    total: 7,
  },
  {
    name: 'Optativa de Estatística',
    courses: [
      { id: 21 },
      { id: 22 }, 
      { id: 23 },
      { id: 24 },
      { id: 25 },
    ],
    color: '#EA7F38',
    completed: 0,
    total: 1,
  },
  {
    name: 'Optativa de Ciências',
    courses: [
      { id: 26 },
      { id: 27 }, 
      { id: 28 },
      { id: 29 },
      { id: 30 },
    ],
    color: '#09DE5A',
    completed: 0,
    total: 1,
  },
  {
    name: 'Outras Optativas Eletivas',
    courses: [
      { id: 31 },
      { id: 32 }, 
      { id: 33 },
      { id: 34 },
      { id: 35 },
    ],
    color: '#F73EF6',
  },
  {
    name: 'Optativas Livres',
    courses: [
      { id: 36 },
      { id: 37 }, 
      { id: 38 },
      { id: 39 },
      { id: 40 },
    ],
    color: '#533F30'
  },
];

const Home = ({ subjects }) => {
  const [plans, setPlans] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [addDisciplineActive, setAddDisciplineActive] = useState(false);
  const [coursePopUpActive, setCoursePopUpActive] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const [courseMap, setCourseMap] = useState(() => {
    const initialCourseMap = new Map(
      subjects.map((subject) => [
        subject.id,
        {
          ...subject,
          tags: [], // init tags
          plan: null, // init with plan as null
          semester: null, // init with semester as null
          // init card data
          colors: {
            background: "#FFFFFF",
            innerLine: "#51A1E0",
            outerLine: "#17538D",
          },
          pokeball: "#C2DCF5" },
      ])
    );

    categories.forEach((category) => {
      category.courses.forEach((course) => {
        const existingEntry = initialCourseMap.get(course.id);
        if (existingEntry) {
          initialCourseMap.set(course.id, {
            ...existingEntry,
            tags: [
              ...existingEntry.tags,
              {
                name: category.name,
                color: category.color,
              },
            ],
          });
        }
      });
    });

    return initialCourseMap;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 } // it's important to trigger onClick events right
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useLifecycleHandlers(courseMap, unsavedChanges, setIsLoading, setPlans, setCourseMap)
  usePlanSync(courseMap, setCourseMap, setPlans, setUnsavedChanges)
  
  const toggleDiscipline = () => {
    setAddDisciplineActive(!addDisciplineActive);
  }

  const toggleCoursePopUp = () => {
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

  const showCourseDetails = (course) => {
    toggleCoursePopUp();
    toggleCourse(
      course?.pokeball, 
      "/pokemons/ditto.png", 
      course?.title, 
      course?.code, 
      course?.tags, 
      course?.credits, 
      course?.desc
    );
  };

  if (isLoading) {
    return (
      <LoadingContainer>
         <ClipLoader color="#51A1E0" size={50} />
      </LoadingContainer>
    );
  } 

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
      <DndContext sensors={sensors} collisionDetection={(props) => computeCollision(props)}>
        <DragMonitor courseMap={courseMap} setCourseMap={setCourseMap} setPlans={setPlans} setUnsavedChanges={setUnsavedChanges}/>
        <ContentContainer>
          <Semester courseMap={courseMap} semesters={plans} setSemesters={setPlans} displayCourse={showCourseDetails} />
          <CoursePicker courseMap={courseMap} categories={categories} displayCourse={showCourseDetails} openDisciplinePopUp={toggleDiscipline} />
        </ContentContainer>
      </DndContext>
    </AppContainer>
  );
};

export default Home;