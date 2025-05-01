import Mandatory from "./Mandatory";
import Elective from "./Elective";
import Free from "./Free";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import React, { useState } from 'react';
import axios from 'axios';


const RetanguloBox = styled(Box)({
    width: '100%',
    maxwidth: '880px',
    minHeight: '280px', // começa com esse tamanho, mas pode crescer
    borderRadius: '12px',
    background: 'var(--glass-diurno, #FFFFFF33)',
    border: '1px solid white',
    backdropFilter: 'blur(20px)',
    position: 'relative',
    paddingBottom: '64px'
});


const Title = styled(Typography)({
    position: 'absolute',
    top: '16px',
    left: '16px',
    width: '154px',
    height: '32px',
    fontFamily: 'Rubik',
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '32px',
    letterSpacing: '0%',
    textTransform: 'uppercase',
    color: '#424242',
});

export default function Course() {

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

        await axios.post("/api/criterios", payload);
        alert("Critérios salvos com sucesso! ✨");
        } catch (error) {
        console.error("Erro ao salvar critérios:", error);
        alert("Erro ao salvar critérios. 😢");
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
}
