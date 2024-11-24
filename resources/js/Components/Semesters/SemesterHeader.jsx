import React from 'react';
import styled from 'styled-components';

const SemesterHeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SemesterInfos = styled.div`
  flex: 85;
  display: flex;
  justify-content: space-between;
  align-items: center;  
`;

const SemesterWarnings = styled.div`
  margin-left: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SemesterCreditsAndIcon = styled.div`
  flex: 45;  
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;


const SemesterHeader = ({ semesterData, expanded, onClick}) => {
    let workCredits = 0;
    let lectureCredits = 0;
    
    semesterData.courses.forEach(course => {
      workCredits += parseInt(course.workCredits, 10);
      lectureCredits += parseInt(course.lectureCredits, 10);
    });
    
    let totalCredits = lectureCredits + workCredits;

    const warnings = totalCredits > 40 && (
        <SemesterWarnings>
            <img src='/icons/warning.png' />
            {/* <p style={{ color: "#C11414" }}>Máximo de 40 créditos por período.</p> */}
        </SemesterWarnings>
    );

    console.log(warnings);

    const creditsText = (
        <p>
            {lectureCredits ? lectureCredits : ''}
            {workCredits ? ' + ' : ''}
            {workCredits ? workCredits : ''}
            {lectureCredits || workCredits ? ' créditos' : ''}
        </p>
    );

    return (
        <SemesterHeaderContainer onClick={onClick}>
            <SemesterInfos>
                <h1>{semesterData.semester}º Período</h1>
                {warnings}
            </SemesterInfos>
            <SemesterCreditsAndIcon>
                {creditsText}
                <span>{expanded ? '▼' : '▶'}</span>
            </SemesterCreditsAndIcon>
        </SemesterHeaderContainer>
    );
};

export default SemesterHeader;