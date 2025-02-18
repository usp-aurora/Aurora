import styled from "styled-components";

const ButtonContainer = styled.button`
  cursor: pointer;
  outline: none;  
  border: none;
  background: none;

  &:active {
    transform: translateY(2px);
  }
`;


export default ButtonContainer;