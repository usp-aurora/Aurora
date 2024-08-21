import styled from 'styled-components';
import Card from '../Atoms/Card.js'
import CardCourseCourse from '../Atoms/CardContentCourse.js'


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
      <Card colors={{
            background: "white",
            innerLine: "green",
            outerLine: "red" }}>
        <CardCourseCourse pokeball = "blue"
                        courseCode = "MAC0110" 
                        courseTitle = "Introdução à computação"
                        pokemonURL = "/ditto.png"
                        />
      </Card> 
    </AppContainer>
  );
};

export default PokemonCard;