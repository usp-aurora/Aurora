import styled from 'styled-components';
import UserNav from '../../Components/Header/TopBar/UserNav/UserNav';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 20px 10px;
  align-items: right;
  justify-content: top;
  background: linear-gradient(135deg, #949EE5, #B3E7DC); 
`;

function TestUserNav() {
  return (
    <MainContainer>
      <UserNav textColor={'#0D1B2A'}/>
    </MainContainer>
  );
}

export default TestUserNav;