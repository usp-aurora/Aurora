import styled from 'styled-components';
import Header from '../Components/Header/Header';
import Semester from '../Components/Semesters/Semesters';
import CoursePicker from '../Components/CoursePicker/CoursePicker';

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
  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <Semester plans={plans}/>
        <CoursePicker />
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;