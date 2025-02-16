import React from 'react';
import styled from 'styled-components';
import {slideIn, slideOut, bounce, bounceBack} from '../Atoms/Animations';
import Droppable from '../Dnd/Droppable';
import Card from "../Atoms/Card";
import CardContentCourse from "../Atoms/CardContentCourse";
import SortableItem from '../Dnd/SortableItem';
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

const DroppableSemester = styled(Droppable)`
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

const Semester = ({ semesterData, isExpanded, isRequired, toggleSemester, displayCourse, courseMap }) => {
  let workCredits = 0;
  let lectureCredits = 0;

  semesterData.courses.forEach((course) => {
      lectureCredits += parseInt(course.credits[0], 10);
      workCredits += parseInt(course.credits[1], 10);
  });

  return (
    <SemesterContainer>
        <SemesterHeader onClick={() => {toggleSemester(semesterData.id)}}>
            <SemesterInfos>
                <h1 style={{marginRight: "20px"}}>{semesterData.id}º Período</h1>
                <SemesterWarnings>
                    <img style={{paddingRight: '5px'}} src='/icons/warning_yellow.png' />
                    <p style={{color: "#ECA706"}}>Provável conflito de horário.</p>
                </SemesterWarnings>
                {lectureCredits + workCredits > 40 ?
                    <SemesterWarnings>
                        <img style={{paddingRight: '5px'}} src='/icons/warning.png'/>
                       <p style={{color: "#C11414"}}>Máximo de 40 créditos por período.</p>
                    </SemesterWarnings>
                 : lectureCredits + workCredits < 12 ?
                    <SemesterWarnings>
                        <img style={{paddingRight: '5px'}} src='/icons/warning.png'/>
                        <p style={{color: "#C11414"}}>Mínimo de 12 créditos por período.</p>
                    </SemesterWarnings>
                 : null
                }
              </SemesterInfos>
            <SemesterCreditsAndIcon>
              <p style={{color: "#757575"}}>{lectureCredits ? lectureCredits : ''} {lectureCredits && workCredits ? '+ ' : ''} {workCredits ? workCredits : ''} {lectureCredits || workCredits ? 'créditos' : ''}</p>
              <span>{isExpanded ? '▼' : '▶'}</span>
            </SemesterCreditsAndIcon>
        </SemesterHeader>
        <DroppableSemester id={semesterData.id} key={semesterData.id} disabled={!isExpanded}>
          <SortableGrid items={semesterData.courses}>
            {semesterData.courses.length === 0 ? (!isRequired &&
              <NewCard>
                <p>Arraste uma disciplina</p>
              </NewCard>
            ) : (
              semesterData.courses.map((course) => {
                const courseDetails = courseMap.get(course.id);
                const isRequiredScheduled = isRequired && courseDetails.semester;

                return (
                  <SortableItem
                    id={courseDetails.code}
                    key={courseDetails.code}
                    courseData={courseDetails}
                    containerName={semesterData.id}
                    isDisabled={!isExpanded}
                  >
                    <Card
                      colors={isRequiredScheduled ? {
                        background: "#FFFFFF",
                        innerLine: "#09DE5A",
                        outerLine: "#15B48F",
                      } : courseDetails.colors}
                      onClick={() => displayCourse(courseDetails)}
                    >
                      <CardContentCourse
                        pokeball={courseDetails.pokeball}
                        courseCode={courseDetails.code}
                        courseTitle={courseDetails.title}
                        pokemonURL="/pokemons/ditto.png"
                      />
                    </Card>
                  </SortableItem>
                );
              })
            )}
          </SortableGrid>
        </DroppableSemester>
    </SemesterContainer>
  );
};

export default Semester;