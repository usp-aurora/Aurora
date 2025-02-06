import styled from 'styled-components';
import Semesters from '../../Components/Semesters/Semesters';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  background-color: #182538;
`;

const Teste = () => {
  return (
    <AppContainer>
      <Semesters /> 
    </AppContainer>
  );
};

export default Teste;