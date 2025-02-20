import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  cursor: pointer;
  outline: none;  
  border: none;
  background: none;

  &:active {
    transform: translateY(2px);
  }
`;

const ButtonContainerBackground = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainerIcon = styled.div`
  position: absolute;

  top: 10%;
  right: 10%;
`;

const StyledButton = ({children, background_image, onClick}) => {
  return(
    <ButtonContainer onClick={onClick}>
        <ButtonContainerBackground>
            <img src={background_image} />
            <ButtonContainerIcon>
                {children}
            </ButtonContainerIcon>
        </ButtonContainerBackground>
    </ButtonContainer>
  )
}

export default StyledButton;