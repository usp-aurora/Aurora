import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import StyledButton from '../Atoms/StyledButton';
import CourseTag from '../Atoms/CourseTag';
// import Pokeball from '../Atoms/Pokeball';
import { fadeIn, fadeOut } from '../Atoms/Animations'
import glassmorphismStyle from '../../styles/glassmorphism';

import Planet from '../Atoms/Planet';
import CloseButton from '../Atoms/Buttons/CloseButton';

const CoursePopUpBackground = styled.div`
  animation: ${props => (props.open ? fadeIn : fadeOut)} 1s ease-in-out -0.3s;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  padding: 1em;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CoursePopUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5%;

    width: 100%;
    height: 100%;
    padding: 2%;

    ${glassmorphismStyle}
`;

const CoursePopUpHeader = styled.div`
  flex: 10;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HeaderInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1em;

  overflow: hidden;
`;

const HeaderIconAndCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`;

const HeaderIconContainer = styled.div`
  width: 45px;
  height: 45px;
`

const CloseButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
`;

const CoursePopUpBody = styled.div`
  flex: 90;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2.5%;
`;

const CourseTags = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;

  overflow-x: auto;
  white-space: nowrap; 

  
  -ms-overflow-style: none;  
  scrollbar-width: none;  

  &::-webkit-scrollbar {
    display: none;  
  }
`;

const CourseDescContainer = styled.div`

`;

const CourseDescText = styled.div`
  max-height: 3lh;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  transition: max-height 0.5s;
`;

const ReadMoreLabel = styled.label`
  cursor: pointer;
  font-size: 1em;
  color: #2A85CD;
  text-decoration: underline;
`;

const ReadMoreCheckbox = styled.input`
  bottom: 0;
  clip: rect(0);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;

  &:checked + ${CourseDescText} {
    -webkit-line-clamp: unset;
    max-height: 100lh;
  }

  &:not(:checked) ~ ${ReadMoreLabel}::after {
    content: "Ver mais";
  }
  
  &:checked ~ ${ReadMoreLabel}:after {
    content: "Ver menos";
  }
`;

const CourseReqsPlaceholder = styled.div`
  width: 100%;
  
  border-radius: 16px;
  background-color: #18273C;
  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  color:white;
`;

const ActionsButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align items to the right */
  width: 100%; /* Ensure it takes the full width */
  padding: 10px; /* Add some padding for visibility */
`;

const ButtonPlaceholder = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
`;

const CoursePopUp = ({ isOpen, onClose, title, code, tags, credits, desc }) => {

  return (
    <CoursePopUpBackground onClick={onClose} open={isOpen}>
      <CoursePopUpContainer onClick={(e) => e.stopPropagation()}>
        <CoursePopUpHeader>

          <HeaderInfo>
            <HeaderIconAndCode>
              <HeaderIconContainer>
                <Planet src="./icons/planeta.png"></Planet>
              </HeaderIconContainer>
              <p>{code.toUpperCase()}</p>
            </HeaderIconAndCode>
            <h1>{title.toUpperCase()}</h1>
          </HeaderInfo>

          <CloseButtonContainer>
            <CloseButton onClick={onClose}/>
          </CloseButtonContainer>

        </CoursePopUpHeader>

        <CoursePopUpBody>

          <CourseTags>
            {tags
              .map(tag => (
                <CourseTag key={tag.name} color={tag.color} name={tag.name} />
              ))}
            <CourseTag 
              color="white" 
              name={credits["lectureCredits"] + " + " + credits["workCredits"] + " créditos"}/>
          </CourseTags>
          

          <CourseDescContainer>
            <ReadMoreCheckbox type="checkbox" name="read-more" id="read-more"/>
            <CourseDescText>
              <p>{desc}</p>
            </CourseDescText>
            <ReadMoreLabel for="read-more" />
          </CourseDescContainer>

          <CourseReqsPlaceholder>
            Aqui vai o lindo código do João e do Pedro.
          </CourseReqsPlaceholder>

          <ActionsButtonsContainer>
            <ButtonPlaceholder/>
          </ActionsButtonsContainer>
        </CoursePopUpBody>

      </CoursePopUpContainer>
    </CoursePopUpBackground>
  );
};

export default CoursePopUp;