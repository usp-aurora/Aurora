import styled from 'styled-components';
import StyledButton from '../../Components/Atoms/StyledButton';


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
      <StyledButton>
         <svg width="25" height="25" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1071 1.71498L10.1071 0.964982L9.35712 0.964983L6.78502 0.964983L6.03502 0.964983L6.03502 1.71498L6.03502 5.46395L2.28605 5.46395L1.53605 5.46395V6.21395V8.78605V9.53605L2.28605 9.53605L6.03502 9.53605L6.03502 13.285L6.03502 14.035L6.78502 14.035L9.35712 14.035L10.1071 14.035L10.1071 13.285L10.1071 9.53605H13.8561L14.6061 9.53605L14.6061 8.78605V6.21395L14.6061 5.46395L13.8561 5.46395H10.1071L10.1071 1.71498Z" fill="white" stroke="#1B68AE" stroke-width="1.5"/>
        </svg>
      </StyledButton>
    </AppContainer>
  );
};

export default PokemonCard;