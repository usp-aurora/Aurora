import React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import glassmorphismStyle from '../../../styles/MUI/glassmorphismMUI';
import ProgressBar from '../../Atoms/ProgressBar/ProgressBar';

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

const CompletionBar = () => {
  const obrigatorias = {label: "Obrigatórias", coursed: 10, planned: 40, needed: 54 };
  const eletivas = {label: "Eletivas", coursed: 10, planned: 40, needed: 60 };
  const livres = {label: "Livres", coursed: 20, planned: 23, needed: 24 }

  return (
    <CompletionBarContainer>
      <ProgressBar label={obrigatorias.label} coursed={obrigatorias.coursed} planned={obrigatorias.planned} needed={obrigatorias.needed} color="primary" />
      <ProgressBar label={eletivas.label} coursed={eletivas.coursed} planned={eletivas.planned} needed={eletivas.needed} color="orange" />
      <ProgressBar label={livres.label} coursed={livres.coursed} planned={livres.planned} needed={livres.needed} color="green" />
    </CompletionBarContainer>
  );
};

export default CompletionBar;