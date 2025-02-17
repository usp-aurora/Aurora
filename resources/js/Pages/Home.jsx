import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header/Header.jsx';
import Semester from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import AddDisciplinePopUp from '../Components/PopUps/AddDisciplinePopUp.jsx';
import CoursePopUp from '../Components/PopUps/CoursePopUp.jsx';
import LoadingScreen from '../Components/Atoms/LoadingScreen.jsx';
import useCourseMap from '../Hooks/useCourseMap.jsx';
import usePlansManager from '../Hooks/usePlansManager.jsx';
import { DragAndDropProvider } from '../Components/Dnd/DragAndDropContext.jsx';

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
      { id : 1 },
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
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [addDisciplineActive, setAddDisciplineActive] = useState(false);
  const [coursePopUpActive, setCoursePopUpActive] = useState(false);

  const [courseMap, setCourseMap] = useCourseMap(subjects, categories);
  const [plans, setPlans] = usePlansManager(courseMap, setCourseMap, setIsLoadingData);
  
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

  return  isLoadingData ? (
	  <LoadingScreen />
  ) : (
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
      <DragAndDropProvider setCourseMap={setCourseMap} setPlans={setPlans}>
        <ContentContainer>
          <Semester courseMap={courseMap} plans={plans} setPlans={setPlans} displayCourse={showCourseDetails} />
          <CoursePicker courseMap={courseMap} categories={categories} displayCourse={showCourseDetails} openDisciplinePopUp={toggleDiscipline} />
        </ContentContainer>
      </DragAndDropProvider>
    </AppContainer>
  );
};

export default Home;