import styled from 'styled-components';
import Header from './Header/Header.js';
import Semester from './Semesters/Semesters.js';
import CoursePicker from './CoursePicker/CoursePicker.js';

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
      <Header />
      <ContentContainer>
        <Semester />
        <CoursePicker />
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;