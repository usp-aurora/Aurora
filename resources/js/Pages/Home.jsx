import React, { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';

import Header from '../Components/Header/Header'
import CompletionBar from '../Components/CompletionBar/CompletionBar' 
import Semesters from '../Components/Semesters/Semesters.jsx';
import CourseInfo from '../Components/CourseInfo/CourseInfo.jsx';
import Background from '../Components/Background/HomeBackground.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';


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

const Home = ({ plans, subjects }) => {
  const [courseInfoActive, setCourseInfo] = useState(false);
  const [courseCode, setCourseCode] = useState("");

  const openCourseInfoPopUp = (course) => {
    console.log(course);
    setCourseInfo(true);
  }

  const closeCourseInfoPopUp = () => {
    setCourseInfo(false);
  }

  return (
    <AppContainer>
      <Background />
      <CourseInfo isOpen={courseInfoActive}
                  onClose={closeCourseInfoPopUp}
                  title="Introdução à Computação" 
                  code={courseCode} 
                  tags={[{"color": "#51A1E0", "name":"Obrigatória2"}, {"color": "#51A1E0", "name":"Obrigatória3"}, {"color": "#51A1E0", "name":"Obrigatória4"}]}
                  credits={{lectureCredits: 4, workCredits: 2}}
                  desc="Descrição genérica"/>
      <ContentContainer>
        <Stack spacing={1}> 
          <Header />
          <Stack spacing={2} direction="row">
            <Stack spacing={1}>
              <CompletionBar />
              <Semesters plans={plans} openCourseInfoPopUp={openCourseInfoPopUp} />
            </Stack>
            <CoursePicker open={false} data={subjects}/>
          </Stack>
        </Stack>
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;