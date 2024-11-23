import styled from 'styled-components';
import SubjectCard from '../../Components/Atoms/Card/SubjectCard';
import AuxiliarCard from '../../Components/Atoms/Card/AuxiliarCard';


const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  gap: 50px;

  align-items: center;
  justify-content: center;
  background-color: grey;
`;


const Test = () => {
  return (
    <AppContainer>
      <SubjectCard
        courseCode="MAC9999"
        courseTitle="Introdução à computação"
        planetURL="./icons/planeta.png">
      </SubjectCard> 
      <AuxiliarCard
        iconURL="./icons/plus.svg"
        message="Teste">
      </AuxiliarCard>
    </AppContainer>
  );
};

export default Test;