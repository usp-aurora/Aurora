import styled from 'styled-components';
import React, { useState } from 'react';
import Header from '../Components/Header/Header.jsx';
import Semesters from '../Components/Semesters/Semesters.jsx';
import CourseInfo from '../Components/CourseInfo/CourseInfo.jsx';
// import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
// import AddDisciplinePopUp from '../Components/PopUps/AddDisciplinePopUp.jsx';
// import CoursePopUp from '../Components/PopUps/CoursePopUp.jsx';



const AppContainer = styled.div`
  position: relative; 

  /* display: flex;
    height: 100vh;
    flex-direction: column;
    
    align-items: center;
    justify-content: center;
    background-color: grey; */
    /* background-color: black; */
`;

const Background = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -1;

  width: 100%; 
  height: max(100%, 100vh);
  background: url('./images/Background-Noturno.png') no-repeat center center;
  background-size: auto 100%;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.h1`
  color: white;
  font-size: 2em;
`;


const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;


const Home = ({ plans }) => {
  const [courseInfoActive, setCourseInfo] = useState(false);
  const [courseCode, setCourseCode] = useState("");


  const toggleCourseInfo = (courseCode) => {
    setCourseCode(courseCode);
    setCourseInfo(!courseInfoActive);
  }

  const closeCourseInfoPopUp = () => {
    setCourseInfo(false);
  }

  return (
    <AppContainer>
      <Background />
      <Header />
      <CourseInfo isOpen={courseInfoActive}
                  onClose={closeCourseInfoPopUp}
                  title="Introdução à Computação" 
                  code={courseCode} 
                  tags={[{"color": "#51A1E0", "name":"Obrigatória"}, {"color": "#51A1E0", "name":"Obrigatória"}, {"color": "#51A1E0", "name":"Obrigatória"}]}
                  credits={{lectureCredits: 4, workCredits: 2}}
                  desc="Descrição genérica"/>
      <ContentContainer>
        <Semesters plans={plans} toggleCourseInfo={toggleCourseInfo} />
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;