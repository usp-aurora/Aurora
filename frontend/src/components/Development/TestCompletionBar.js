import styled from 'styled-components';
import CompletionBar from '../Header/CompletionBar/CompletionBar.js';


const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;


const TestCompletionBar = () => {
  return (
    <MainContainer>
        <CompletionBar />
    </MainContainer>
  );
};

export default TestCompletionBar;