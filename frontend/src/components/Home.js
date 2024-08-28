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

  const [addDisciplineActive, setAddDisciplineActive] = useState(false);
  const [coursePopUpActive, setCoursePopUpActive] = useState(false);

  const toggleDiscipline = () => {
    setAddDisciplineActive(!addDisciplineActive);
  }

  const toggleCourse = () => {
    setCoursePopUpActive(!coursePopUpActive);
  }

  return (
    <AppContainer>
      <AddDisciplinePopUp isOpen={addDisciplineActive} onClose={toggleDiscipline} />
      <CoursePopUp isOpen={coursePopUpActive} onClose={toggleCourse} pokeball={"red"} pokemonURL={"/pokemons/ditto.png"}/>
      <Header />
      <ContentContainer>
        <Semester openCourse={toggleCourse} />
        <CoursePicker openCourse={toggleCourse} openDisciplinePopUp={toggleDiscipline} />
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;