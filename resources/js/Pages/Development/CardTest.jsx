import styled from 'styled-components';
import Card from '../../Components/Atoms/Card/SubjectCard'


const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  background-color: grey;
`;


const PokemonCard = () => {
  return (
    <AppContainer>
      <Card
        courseCode="MAC9999"
        courseTitle="Uma matéria com um nome muito grande"
        planetURL="./icons/planeta.png">
      </Card> 
    </AppContainer>
  );
};

export default PokemonCard;