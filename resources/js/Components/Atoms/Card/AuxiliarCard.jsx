import React, { useEffect } from 'react';
import styled from 'styled-components';
import glassmorphismStyle from '../../../styles/glassmorphism';

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
  width: 104px;
  height: 94px;

  border-radius: 8px;
  background-color: #2A85CD;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  text-align: center;
`;

const CardIcon = styled.img`
  width: 48px;
  height: 48px;
`


const Card = ({iconURL, message, onClick, onCreate}) => {
  return (
    <CardComponent onClick={onClick} onLoad={onCreate}>
      <CardContainer>
        {/* <CardContent> */}
          <CardIcon src={iconURL}/>
          <p>{message}</p>
        {/* </CardContent> */}
      </CardContainer>
    </CardComponent>
  );
};

export default Card;