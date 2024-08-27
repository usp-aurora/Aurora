import styled from 'styled-components';
import React, { useState } from 'react';
import Header from './Header/Header.js';
import Semester from './Semesters/Semesters.js';
import CoursePicker from './CoursePicker/CoursePicker.js';
import AddDisciplinePopUp from './PopUps/AddDisciplinePopUp.js';
import CoursePopUp from './PopUps/CoursePopUp.js';

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


const Home = () => {

  return (
    <AppContainer>
      {/* <AddDisciplinePopUp /> */}
      {/* <CoursePopUp /> */}
      <Header />
      <ContentContainer>
        <Semester />
        <CoursePicker/>
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;