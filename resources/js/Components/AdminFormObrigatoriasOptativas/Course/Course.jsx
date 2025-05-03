/* Course is the complete form, combining the mandatory, elective, and free sections */


import React, { useState } from 'react';
import axios from 'axios';

import Mandatory from "./Mandatory";
import Elective from "./Elective";
import Free from "./Free";

import { Stack, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';


/* Styling the form structure */
const RetanguloBox = styled(Box)({
    width: '100%',
    maxwidth: '880px',
    minHeight: '280px', 
    paddingBottom: '64px',
    border: '1px solid white',
    borderRadius: '12px',
    background: 'var(--glass-diurno, #FFFFFF33)',
    backdropFilter: 'blur(20px)',
    position: 'relative',
});


/* Styling for the text: DISCIPLINAS */
const Title = styled(Typography)({
    position: 'absolute',
    top: '16px',
    left: '16px',
    width: '154px',
    height: '32px',
    lineHeight: '32px',
    letterSpacing: '0%',
    fontFamily: 'Rubik',
    fontWeight: '700',
    fontSize: '24px',
    textTransform: 'uppercase',
    color: '#424242',
});


/* Course component */
const Course = () => {

  const [mandatoryCriteria, setMandatoryCriteria] = useState({});
  const [electiveCriteria, setElectiveCriteria] = useState({});
  const [freeCriteria, setFreeCriteria] = useState({});

  const [mandatorySubjects, setMandatorySubjects] = useState([]);
  const [electiveSubjects, setElectiveSubjects] = useState([]);
  const [freeSubjects, setFreeSubjects] = useState([]);

  const handleSave = async () => {
    
    try {
      const payload = {
        mandatory: {
          criteria: mandatoryCriteria,
          subjects: mandatorySubjects
        },
        elective: {
          criteria: electiveCriteria,
          subjects: electiveSubjects
        },
        free: {
          criteria: freeCriteria,
          subjects: freeSubjects
        }
      };
      await axios.post("/formCourse", payload);
      alert("Informações salvas com sucesso! ✨");
    } 
    
    catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar. 😢");
    }

  };


  return (
    <RetanguloBox>
      <Title>DISCIPLINAS</Title>
      <Stack spacing={2} sx={{ marginTop: '64px' }}>
        <Mandatory
          onChangeCriteria={setMandatoryCriteria}
          onChangeSubjects={setMandatorySubjects}
        />
        <Elective
          onChangeCriteria={setElectiveCriteria}
          onChangeSubjects={setElectiveSubjects}
        />
        <Free
          onChangeCriteria={setFreeCriteria}
          onChangeSubjects={setFreeSubjects}
        />
        <Button variant="contained" onClick={handleSave}>
          Salvar critérios
        </Button>
      </Stack>
    </RetanguloBox>
    );
};

export default Course;
