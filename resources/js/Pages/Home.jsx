import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';

import Header from '../Components/Header/Header'
import CompletionBar from '../Components/CompletionBar/CompletionBar' 
import Background from '../Components/Background/HomeBackground.jsx';


import Semester from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import CoursePopUp from '../Components/PopUps/CoursePopUp.jsx';
import LoadingScreen from '../Components/Atomsold/LoadingScreen';

import useCourseMap from '../Hooks/useCourseMap.jsx';
import usePlansManager from '../Hooks/usePlansManager.jsx';
import { DragAndDropProvider } from '../Components/Dnd/DragAndDropContext.jsx';


const AppContainer = styled("div")(() => ({
  position: 'relative'
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: "8px", 
  
  [theme.breakpoints.up('sm')]: {
    padding: '16px',
  }
}));

const Home = ({ subjects, groups }) => { 
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [addDisciplineActive, setAddDisciplineActive] = useState(false);
  const [coursePopUpActive, setCoursePopUpActive] = useState(false);

  const [courseMap, setCourseMap] = useCourseMap(subjects);
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
      <Background />
      <CoursePopUp isOpen={coursePopUpActive} onClose={toggleCoursePopUp} 
                    pokeball_color={course.pokeball_color} 
                    pokemonURL={course.pokemonURL}
                    title={course.title}
                    code={course.code}
                    tags={course.tags}
                    credits={course.credits}
                    desc={course.desc}
      />


      <ContentContainer>
        <Stack spacing={1}>
          <Header />
          <DragAndDropProvider setCourseMap={setCourseMap} setPlans={setPlans}>
            <Stack spacing={2} direction="row">
              <Stack spacing={1} sx={{ width: "60vw" }}>
                <CompletionBar />
                <Semester courseMap={courseMap} plans={plans} setPlans={setPlans} displayCourse={showCourseDetails} />
              </Stack>
              <CoursePicker courseMap={courseMap} data={groups} displayCourse={showCourseDetails} openDisciplinePopUp={toggleDiscipline} />        
            </Stack>
          </DragAndDropProvider>
        </Stack>
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;