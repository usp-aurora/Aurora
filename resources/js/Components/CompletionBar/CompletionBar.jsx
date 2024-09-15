import React from 'react';
import styled from 'styled-components';

const CompletionBarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 150px;
  box-sizing: border-box;

  background-color: #f6c7ff;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 20px;
  border: 2px solid #00bcd4;
  position: relative;
`;

const ProgressBarAndPercentage = styled.div`
  display: flex;
  justify-content: left;
`;

const ProgressFill = styled.div`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: #00bcd4;
  position: absolute;
  top: 0;
  left: 0;
`;

const PlannedProgressFill = styled.div`
  width: ${({ plannedPercentage }) => plannedPercentage}%;
  height: 100%;
  background-color: rgba(0, 255, 255);
  position: absolute;
  top: 0;
  left: 0;
`;

const BadgeSection = styled.div`
  height: 70%;
  width: 40%;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
`;

const Badge = styled.div`
  display: flex;
  flex-basis: 50%;
  align-items: center;
  gap: 10px;
  margin-left: 18px;
`;

const BadgeIcon = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid black;
  transform: rotate(45deg);
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 60px;
  height: 40px;
  border: 2px solid black;
  background: none;
  cursor: pointer;
`;


const CompletionBar = () => {
  const progressData = [
    { text: 'Obrigatórias', percentage: 40, plannedPercentage: 100, total: 100 },
    { text: 'Eletivas', percentage: 0, plannedPercentage: 0, total: 100 },
    { text: 'Livres', percentage: 0, plannedPercentage: 0, total: 100 },
  ];


  const badges = [
     'Ciência de Dados', 
    'Inteligência Artificial', 
    'Sistemas de Software', 
    'Teoria da computação', 
    'Optativa de Estatística', 
    'Optativa de Ciências'
  ];

  return (
    <CompletionBarContainer>
      <ProgressSection>
        {progressData.map((item, index) => (
          <ProgressBarContainer key={index}>
            <span>{item.text}</span>
            <ProgressBarAndPercentage>
              <ProgressBar>
                <PlannedProgressFill plannedPercentage={(item.plannedPercentage / item.total) * 100} />
                <ProgressFill percentage={(item.percentage / item.total) * 100} />
              </ProgressBar>
              <span>{`${item.percentage}/${item.total}`}</span>
            </ProgressBarAndPercentage>
          </ProgressBarContainer>
        ))}
      </ProgressSection>
      <BadgeSection>
        {badges.map((badge, index) => (
          <Badge key={index}>
            <BadgeIcon />
            <span>{badge}</span>
          </Badge>
        ))}
      </BadgeSection>
      <ButtonSection>
        <Button>button</Button>
        <Button>button</Button>
      </ButtonSection>
    </CompletionBarContainer>
  );
};

export default CompletionBar;