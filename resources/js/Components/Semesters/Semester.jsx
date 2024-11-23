import React, { useState } from 'react';
import styled from 'styled-components';

import SemesterHeader from './SemesterHeader';
import SubjectCard from '../Atoms/Card/SubjectCard';
import AuxiliarCard from '../Atoms/Card/AuxiliarCard';
import { slideIn, slideOut } from '../Atoms/Animations';

import glassmorphismStyle from '../../styles/glassmorphism';


const SemesterContainer = styled.div`
  ${glassmorphismStyle}

  width: 100%;
  padding: 2% 3%;
  margin-bottom: 5%;
`;

const CoursesList = styled.ul`
  margin-top: ${props => (props.expanded ? '2%' : '0')};
  list-style: none;
  padding: 0;
  overflow: hidden;  /* Importante para esconder o conteúdo quando fechado */
  max-height: ${props => (props.expanded ? '50000px' : '0')}; /* Define o limite de altura, 
  quando aberto, é alto para não dar problema */
  animation: ${props => (props.expanded ? slideIn : slideOut)} 1s ease-in-out ${props => (props.expanded ? '-0.1s' : '-0.6s')};
  
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const Semester = ({ semesterData }) => {

    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    return (
        <SemesterContainer>
            <SemesterHeader semesterData={semesterData} expanded={expanded} onClick={toggleExpanded} />
            <CoursesList expanded={expanded}>
                {semesterData.courses.map(course => (
                    <SubjectCard
                        courseCode={course.code}
                        courseTitle={course.title}
                        planetURL="/icons/planeta.png"
                        onClick={() => { }}
                        onCreate={() => { }}>
                    </SubjectCard>
                ))}
                <AuxiliarCard iconURL="./icons/plus.svg" message="Adicionar">
                </AuxiliarCard>
            </CoursesList>
        </SemesterContainer>
    )
}

export default Semester;