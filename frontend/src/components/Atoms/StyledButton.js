import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  cursor: pointer;
  outline: none;  
  border: none;

  &:active {
    box-shadow: inset 0 3px 0 #1d7bc1; /* Invert shadow on click to simulate button press */
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

  top: 15%;
  right: 15%;
`;

const StyledButton = ({children, color}) => {
  return(
    <ButtonContainer>
        <ButtonContainerBackground>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0H36V40H4V0Z" fill="#2A85CD"/>
                  <path d="M2 2H38V38H2V2Z" fill="#2A85CD"/>
                  <path d="M0 4H40V36H0V4Z" fill="#2A85CD"/>
                  <path d="M0 4H2V36H0V4Z" fill={color}/>
                  <path d="M4 40V38H36V40H4Z" fill={color}/>
                  <path d="M6 36H34V37H6V36Z" fill="white"/>
                  <path d="M8 35H32V36H8V35Z" fill="white"/>
                  <path d="M3 34V6H4V34H3Z" fill="white"/>
                  <path d="M4 32V8H5V32H4Z" fill="white"/>
                  <path d="M2 38V36H4V38H2Z" fill={color}/>
                  <path d="M36 38V36H38V38H36Z" fill={color}/>
                  <path d="M2 4V2H4V4H2Z" fill={color}/>
              </svg>
            <ButtonContainerIcon>
                {children}
            </ButtonContainerIcon>
        </ButtonContainerBackground>
    </ButtonContainer>
  )
}

export default StyledButton;