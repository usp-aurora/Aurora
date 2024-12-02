import React, { useEffect } from 'react';
import styled from 'styled-components';
import glassmorphismStyle from '../../../styles/glassmorphism';

import Planet from '../Planet';

const CardComponent = styled.div`
  width: 104px;
  height: 104px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

  position: relative;

  &:active {
    transform: translateY(2px);
  }
`;

const CardContainer = styled.div`
  ${glassmorphismStyle}
  width: 104px;
  height: 94px;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  text-align: center;

  transform: translateY(-10px);
`;

const CardIconContainer = styled.div`
  width: 48px;
  height: 48px;
`

const CardTextCode = styled.h2`
  line-height: 24px;
`

const truncateText = (text, maxLength) => {
  if(!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
}

const SubjectCard = ({courseCode, courseTitle, planetURL, onClick, onCreate}) => {
  // console.log(courseTitle);

  return (
    <CardComponent onClick={onClick} onLoad={onCreate}>
      <CardContainer>
        <CardContent>
          <CardIconContainer>
            <Planet src={planetURL}/>
          </CardIconContainer>
          <CardTextCode> {courseCode} </CardTextCode>
          <p>{truncateText(courseTitle, 25)}</p>
        </CardContent>
      </CardContainer>
    </CardComponent>
  );
};

export default SubjectCard;