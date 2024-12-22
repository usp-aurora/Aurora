import React from 'react';
import styled from 'styled-components';
import { fadeIn, fadeOut } from '../Atoms/Animations'
import glassmorphismStyle from '../../styles/glassmorphism';

import CourseInfoHeader from './CourseInfoHeader';
import CourseInfoTags from './CourseInfoTags';
import CourseInfoText from './CourseInfoText';

const CourseInfoBackground = styled.div`
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

const CourseInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.5%;

    width: 100%;
    height: 100%;
    padding: 2%;

    ${glassmorphismStyle}
`;

const CourseInfoBody = styled.div`
  flex: 90;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2.5%;
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
  justify-content: flex-end; 
  width: 100%; 
  padding: 10px; 
`;

const ButtonPlaceholder = styled.div`
  width: 30px;
  height: 30px;
  background-color: red;
`;

const CourseInfo = ({ isOpen, onClose, title, code, tags, credits, desc }) => {

  return (
    <CourseInfoBackground onClick={onClose} open={isOpen}>
      <CourseInfoContainer onClick={(e) => e.stopPropagation()}>
        <CourseInfoHeader onClose={onClose} title={title} code={code} />
        <CourseInfoBody>
          <CourseInfoTags tags={tags} credits={credits} />
          <CourseInfoText desc={desc} />
          <CourseReqsPlaceholder>
            Aqui vai o lindo código do João e do Pedro.
          </CourseReqsPlaceholder>
          <ActionsButtonsContainer>
            <ButtonPlaceholder />
          </ActionsButtonsContainer>
        </CourseInfoBody>
      </CourseInfoContainer>
    </CourseInfoBackground>
  );
};

export default CourseInfo;