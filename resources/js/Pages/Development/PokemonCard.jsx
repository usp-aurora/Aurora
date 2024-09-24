import styled from 'styled-components';
import Card from '../../Components/Atoms/Card'
import CardCourseCourse from '../../Components/Atoms/CardContentCourse'


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
                        pokemonURL = "/pokemons/ditto.png"
                        />
      </Card> 
    </AppContainer>
  );
};

export default PokemonCard;