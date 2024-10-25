import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header/Header.jsx';
import Semester from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import AddDisciplinePopUp from '../Components/PopUps/AddDisciplinePopUp.jsx';
import CoursePopUp from '../Components/PopUps/CoursePopUp.jsx';
import DragOverlayComponent from '../Components/Dnd/DragOverlayComponent.jsx';
import { handleDragStart, handleDragOver, handleDragEnd } from '../Handlers/DragHandlers.jsx';
import {
  DndContext, 
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {sortableKeyboardCoordinates} from '@dnd-kit/sortable';

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


const categories = [
  {
    name: 'Ciência de dados',
    courses: [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5},
    ],
    color: '#FFD12B',
  },
  {
    name: 'Inteligência Artificial',
    courses: [
      {id: 6},
      {id: 1},
      {id: 8},
      {id: 9},
      {id: 10},
    ],
    color: '#E83030',
  },
  {
    name: 'Sistemas de Software',
    courses: [      
      {id: 6},
      {id: 5},
      {id: 11},
      {id: 22},
      {id: 7},,
    ],
    color: '#15B48F',
  },
  {
    name: 'Teoria da Computação',
    courses: [
      {id: 30},
      {id: 27},
      {id: 41},
      {id: 52},
      {id: 4},
    ],
    color: '#6762CD',
  },
  {
    name: 'Optativa de Estatística',
    courses: [
      {id: 10},
      {id: 16},
      {id: 20},
      {id: 19},
      {id: 25},
    ],
    color: '#EA7F38',
  },
  {
    name: 'Optativa de Ciências',
    courses: [
      {id: 49},
      {id: 64},
      {id: 81},
      {id: 100},
      {id: 36},
    ],
    color: '#09DE5A',
  },
  {
    name: 'Outras Optativas Eletivas',
    courses: [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5},
    ],
    color: '#F73EF6',
  },
  {
    name: 'Optativas Livres',
    courses: [
     
      {id: 44},
      {id: 55},
      {id: 33},
      {id: 22},
      {id: 11},
    ],
    color: '#533F30'
  },
];


const Home = ({ userPlans }) => {
  const [dragObject, setDragObject] = useState(null);
  const [addDisciplineActive, setAddDisciplineActive] = useState(false);
  const [coursePopUpActive, setCoursePopUpActive] = useState(false);


  const createInitialCourseMap = (plans, categories) => {
    const newMap = new Map();

    categories.forEach((category) => {
      category.courses.forEach((course) => {
        if (newMap.has(course.id)) {
          const existingEntry = newMap.get(course.id);
          newMap.set(course.id, {
            ...existingEntry,
            tags: [
              ...existingEntry.tags,
              {
                name: category.name,
                color: category.color,
              }
            ]
          });
        } else {
          newMap.set(course.id, {
            id: course.id,
            // course: {
            // code: course.code,
            // title: course.title,
            // desc: course.desc,
            // credits: course.credits,},          
            tags: [{
              name: category.name,
              color: category.color,
            }]
          });
        }
      });
    });

    plans.forEach((semester) => {
      semester.courses.forEach((course) => {
        if (newMap.has(course.id)) {
          const existingEntry = newMap.get(course.id);
          newMap.set(course.id, {
            ...existingEntry,
            course,
            tags: existingEntry.tags,
            semester: semester.id,
          });
        } else {
          newMap.set(course.id, {
            course,
            tags: [],
            semester: semester.id,
          });
        }
      });
    });

    return newMap;
  };

  const [courseMap, setCourseMap] = useState(() =>
    createInitialCourseMap(userPlans, categories)
  );

  const [plans, setPlans] = useState(
    userPlans.map((semester) => ({
      ...semester,
      courses: semester.courses.map((course) => ({
        ...course,
        tags: courseMap.get(course.id)?.tags || [],
        colors: {
          background: "#FFFFFF",
          innerLine: "#51A1E0",
          outerLine: "#17538D",
        },
        pokeball: "#C2DCF5",
      })),
    }))
  );

  // update courseMap when plans or categories changes
  useEffect(() => {
    const updatedCourseMap = createInitialCourseMap(plans, categories);
    setCourseMap(updatedCourseMap);
  }, [plans, categories]);


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


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // importante para identificar o evento onClick
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );



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
        onDragStart={(event) => handleDragStart(event, courseMap, setDragObject)}
        onDragOver={(event) => handleDragOver(event, courseMap, plans, setPlans, dragObject)}
        onDragEnd={(event) => handleDragEnd(event, courseMap, plans, setPlans, dragObject, setDragObject)}
      >
        <ContentContainer>
          <Semester semesters={plans} openCourse={toggleCoursePopUp} changeCourseDisplay={toggleCourse} setSemesters={setPlans} />
          <CoursePicker openCourse={toggleCoursePopUp} changeCourseDisplay={toggleCourse} openDisciplinePopUp={toggleDiscipline} />
        </ContentContainer>
        <DragOverlayComponent dragObject={dragObject} />
      </DndContext>
    </AppContainer>
  );
};

export default Home;