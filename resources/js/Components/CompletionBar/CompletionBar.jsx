import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import glassmorphismStyle from '../../styles/MUI/glassmorphismMUI';
import ProgressBar from './ProgressBar/ProgressBar';

const CompletionBarContainer = styled(Stack)(({ theme }) => ({
  ...glassmorphismStyle(theme, 'level2'),

  borderRadius: '8px',
  
  width: '100%',
  padding: '8px',
  [theme.breakpoints.up('sm')]: {
    padding: '16px',
    borderRadius: '12px',
  },
}));

function CompletionBar({subjectDataMap, plans}){
  const [mandatoryCoursed, setMandatoryCoursed] = useState(0);
  const [electiveCoursed, setElectiveCoursed] = useState(0);

  useEffect(() => {
    let mandatory = 0;
    let elective = 0;

    plans.forEach(semester => {
      semester.subjects.forEach(subject => {
        if (subjectDataMap.get(subject.code).tags.includes("Obrigatória")) {
            mandatory += parseInt(subject.credits[0], 10);
          mandatory += parseInt(subject.credits[1], 10);
        } else {
          elective += parseInt(subject.credits[0], 10);
          elective += parseInt(subject.credits[1], 10);
        }
      });
    });

    setMandatoryCoursed(mandatory);
    setElectiveCoursed(elective);
  }, [subjectDataMap, plans]);


 
  const mandatory = {label: "Obrigatórias", coursed: mandatoryCoursed, planned: 0, needed: 108 };
  const elective = {label: "Optativas", coursed: electiveCoursed, planned: 0, needed: 87 };
  // const livres = {label: "Livres", coursed: 20, planned: 23, needed: 24 }

  return (
    <CompletionBarContainer>
      <ProgressBar label={mandatory.label} coursed={mandatory.coursed} planned={mandatory.planned} needed={mandatory.needed} color="primary" />
      <ProgressBar label={elective.label} coursed={elective.coursed} planned={elective.planned} needed={elective.needed} color="orange" />
      {/* <ProgressBar label={livres.label} coursed={livres.coursed} planned={livres.planned} needed={livres.needed} color="green" /> */}
    </CompletionBarContainer>
  );
};

export default CompletionBar;