import styled from 'styled-components';
import React, { useState } from 'react';
import Header from '../Components/Header/Header.jsx';
import Semester from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import AddDisciplinePopUp from '../Components/PopUps/AddDisciplinePopUp.jsx';
import CoursePopUp from '../Components/PopUps/CoursePopUp.jsx';

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

  const [addDisciplineActive, setAddDisciplineActive] = useState(false);
  const [coursePopUpActive, setCoursePopUpActive] = useState(false);

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
      <ContentContainer>
        <Semester plans={plans} openCourse={toggleCoursePopUp} changeCourseDisplay={toggleCourse} />
        <CoursePicker openCourse={toggleCoursePopUp} changeCourseDisplay={toggleCourse} openDisciplinePopUp={toggleDiscipline} />
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;