import styled from 'styled-components';


const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;


const NotFoundPage = () => {
  return (
    <MainContainer>
        <img src="./images/psyduck404.png"></img>
        <h1>Pelo visto sua página não está aqui.</h1>
    </MainContainer>
  );
};

export default NotFoundPage;