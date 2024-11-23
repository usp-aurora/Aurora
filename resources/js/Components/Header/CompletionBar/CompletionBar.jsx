import React from 'react';
import styled from 'styled-components';
import glassmorphismStyle from '../../../styles/glassmorphism';

const CompletionBarContainer = styled.div`
  ${glassmorphismStyle}

  width: 100%;

  padding: 16px;

  display: grid;
  grid-template-columns: auto 1fr auto;

  grid-auto-rows: 1rem; // altura da linha
  grid-column-gap: 1rem;
  grid-row-gap: 1.3rem;

  background-color: rgb(194, 220, 245, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari support */

`;

const ProgressText = styled.p`
    font-size: 10px;
    line-height: 10px;
`

const ProgressBar = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 80px;

    position: relative;
    background-color: white;
`;

const PlannedProgressFill = styled.div`
    width: ${(props) => props.percentage}%;
    height: 100%;
    background-color: ${(props) => props.color};
    
    position: absolute;
    top: 0;
    left: 0;

    border-radius: inherit;
`;

const ProgressFill = styled.div`
    width: ${(props) => props.percentage}%;
    height: 100%;
    background-color: ${(props) => props.color};
    
    position: absolute;
    top: 0;
    left: 0;

    border-radius: inherit;
`;

const CompletionBar = () => {
  const obrigatorias = { coursed: 10, planned: 40, needed: 54 };
  const eletivas = { coursed: 10, planned: 40, needed: 60 };
  const livres = { coursed: 20, planned: 23, needed: 24 }

  return (
    <CompletionBarContainer>
      <ProgressText>Obrigatórias</ProgressText>
      <ProgressBar>
        <PlannedProgressFill color="rgba(141, 192, 236, 1)" percentage={(obrigatorias.planned / obrigatorias.needed) * 100} />
        <ProgressFill color="rgba(81, 161, 224, 1)" percentage={(obrigatorias.coursed / obrigatorias.needed) * 100} />
      </ProgressBar>
      <ProgressText>{`${obrigatorias.coursed} / ${obrigatorias.needed}`}</ProgressText>

      <ProgressText>Eletivas</ProgressText>
      <ProgressBar>
        <PlannedProgressFill color="rgba(255, 167, 255, 1)" percentage={(eletivas.planned / eletivas.needed) * 100} />
        <ProgressFill color="rgba(247, 62, 246, 1)" percentage={(eletivas.coursed / eletivas.needed) * 100} />
      </ProgressBar>
      <ProgressText>{`${eletivas.coursed} / ${eletivas.needed}`}</ProgressText>

      <ProgressText>Livres</ProgressText>
      <ProgressBar>
        <PlannedProgressFill color="#c4b580" percentage={(livres.planned / livres.needed) * 100} />
        <ProgressFill color="#837143" percentage={(livres.coursed / livres.needed) * 100} />
      </ProgressBar>
      <ProgressText>{`${livres.coursed} / ${livres.needed}`}</ProgressText>
    </CompletionBarContainer>
  );
};

export default CompletionBar;