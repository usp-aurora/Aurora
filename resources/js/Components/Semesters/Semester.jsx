import React from 'react';
import styled from 'styled-components';
import SortableCard from '../Dnd/SortableCard';
import {slideIn, slideOut, bounce, bounceBack} from '../Atoms/Animations';
import Droppable from '../Dnd/Droppable';
import SortableGrid from '../Dnd/SortableGrid';

const SemesterContainer = styled.div`
  // animation: ${props => props.isOpen ? bounceBack : bounce} 2s ease-in-out -0.5s;
  // animation-fill-mode: both;
  width: 100%;
  padding: 2%;
  margin-bottom: 2%;

  background-color: #E4EEFA;

  clip-path: polygon(
    0px calc(100% - 8px),
    4px calc(100% - 8px),
    4px calc(100% - 4px),
    8px calc(100% - 4px),
    8px 100%,
    calc(100% - 8px) 100%,
    calc(100% - 8px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 8px),
    100% calc(100% - 8px),
    100% 8px,
    calc(100% - 4px) 8px,
    calc(100% - 4px) 4px,
    calc(100% - 8px) 4px,
    calc(100% - 8px) 0px,
    8px 0px,
    8px 4px,
    4px 4px,
    4px 8px,
    0px 8px
  );
`;

const SemesterHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const SemesterInfos = styled.div`
  flex: 85;
  display: flex;
  justify-content: align-left;
  align-items: center;  
`;

const SemesterWarnings = styled.div`
  margin-left: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SemesterCreditsAndIcon = styled.div`
  flex: 15;  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DroppableCourseGrid = styled(Droppable)`
  list-style: none;
  padding: 0;
  overflow: hidden;  /* Importante para esconder o conteúdo quando fechado */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: ${({ disabled }) => (disabled ? '0' : '1%')};
  max-height: ${({ disabled }) => (disabled ? '0' : '500px')}; /* Define o limite de altura */
  animation:  ${({ disabled }) => (disabled ? slideOut : slideIn)} 1s ease-in-out ${({ disabled }) => (disabled ? '-0.6s' : '-0.1s')};
`;

const NewCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 136px;
  height: 136px;

  background-color: #C2DCF5;

  clip-path: polygon(
    0px calc(100% - 8px),
    4px calc(100% - 8px),
    4px calc(100% - 4px),
    8px calc(100% - 4px),
    8px 100%,
    calc(100% - 8px) 100%,
    calc(100% - 8px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 4px),
    calc(100% - 4px) calc(100% - 8px),
    100% calc(100% - 8px),
    100% 8px,
    calc(100% - 4px) 8px,
    calc(100% - 4px) 4px,
    calc(100% - 8px) 4px,
    calc(100% - 8px) 0px,
    8px 0px,
    8px 4px,
    4px 4px,
    4px 8px,
    0px 8px
  );
`;

const Semester = ({ semester, expanded, toggleSemester, displayCourse, courseMap }) => {

  return (
    <SemesterContainer>
        <SemesterHeader onClick={() => {toggleSemester(semester.id)}}>
            <SemesterInfos>
                <h1 style={{marginRight: "20px"}}>{semester.id}º Período</h1>
                <SemesterWarnings>
                    <img style={{paddingRight: '5px'}} src='/icons/warning_yellow.png' />
                    <p style={{color: "#ECA706"}}>Provável conflito de horário.</p>
                </SemesterWarnings>
                {semester.credits[0] + semester.credits[1] > 40 ?
                    <SemesterWarnings>
                        <img style={{paddingRight: '5px'}} src='/icons/warning.png'/>
                       <p style={{color: "#C11414"}}>Máximo de 40 créditos por período.</p>
                    </SemesterWarnings>
                 : semester.credits[0] + semester.credits[1] < 12 ?
                    <SemesterWarnings>
                        <img style={{paddingRight: '5px'}} src='/icons/warning.png'/>
                        <p style={{color: "#C11414"}}>Mínimo de 12 créditos por período.</p>
                    </SemesterWarnings>
                 : null
                }
              </SemesterInfos>
            <SemesterCreditsAndIcon>
              <p style={{color: "#757575"}}>{semester.credits[0] ? semester.credits[0] : ''} {semester.credits[0] && semester.credits[1] ? '+ ' : ''} {semester.credits[1] ? semester.credits[1] : ''} {semester.credits[0] || semester.credits[1] ? 'créditos' : ''}</p>
              <span>{expanded ? '▼' : '▶'}</span>
            </SemesterCreditsAndIcon>
        </SemesterHeader>
        <DroppableCourseGrid id={semester.alias} key={semester.alias} disabled={!expanded}>
            <SortableGrid items={semester.courses} name={semester.alias}>
                {!semester.courses.length ?
                  <NewCard>
                    <p>Arraste uma disciplina</p>
                  </NewCard>
                :
                semester.courses.map((course) => (
                  <SortableCard
                    id={course.id}
                    key={course.id}
                    course={courseMap.get(course.id)} 
                    container={semester.alias}
                    disabled={!expanded}
                    handleClick={displayCourse}
                  />
                ))}
            </SortableGrid>
        </DroppableCourseGrid>
    </SemesterContainer>
  );
};

export default Semester;