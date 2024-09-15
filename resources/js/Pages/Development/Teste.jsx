import styled from 'styled-components';


const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  background-color: grey;
`;


const Teste = () => {
  return (
    <AppContainer>
      <h1>Teste</h1>
    </AppContainer>
  );
};

export default Teste;