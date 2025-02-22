import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';

import Header from '../Components/Header/Header'
import CompletionBar from '../Components/CompletionBar/CompletionBar' 
import Background from '../Components/Background/HomeBackground.jsx';

import MainTools from '../Components/Tools/MainTools.jsx';
import Semesters from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import LoadingScreen from '../Components/Atomsold/LoadingScreen';

import useHistoryState from "../Hooks/useHistoryState";
import usePlansManager from '../Hooks/usePlansManager.jsx';
import { DragAndDropProvider } from '../Components/Dnd/DragAndDropContext.jsx';

const AppContainer = styled("div")(() => ({
  position: 'relative'
}));

const ContentContainer = styled("div")(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: "8px", 
  
  [theme.breakpoints.up('sm')]: {
    padding: '16px',
  }
}));

// Define the core curriculum with empty semesters
const coreCurriculum = Array.from({ length: 8 }, (_, i) => ({ semesterId: i + 1, subjects: [], suggestions: [] }));
coreCurriculum[0].subjects = [
{
  code: "MAC0101",
  name: "Integração na Universidade e na Profissão",
  credits: [2, 0],
},
{
  code: "MAC0105",
  name: "Fundamentos de Matemática para a Computação",
  credits: [4, 0],
},
{
  code: "MAC0110",
  name: "Introdução à Computação",
  credits: [4, 0],
},
{
  code: "MAC0329",
  name: "Álgebra Booleana e Aplicações no Projeto de Arquitetura de Computadores",
  credits: [4, 0],
},
{
  code: "MAT2453",
  name: "Cálculo Diferencial e Integral I",
  credits: [6, 0],
},
{
  code: "MAT0112",
  name: "Vetores e Geometria",
  credits: [4, 0],
}];


for (let i = 0; i <6; i++) {
  coreCurriculum[5].suggestions.push({
    group: "Optativa Livre",
  });
}

const Home = ({ groups }) => { 
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showCurriculum, setShowCurriculum] = useState(false);

  const [plans, updatePlans, pushPlans, restoreCurrentPlans, undo, redo] = useHistoryState();
  const [subjectDataMap, plannedSubjects, updateSubject, bulkUpdateSubjects] = useSubjectDataMap(groups);

  const defaultPlans = coreCurriculum.map(({ semesterId, subjects }) => ({ semesterId, subjects }));
  usePlansManager(plans, defaultPlans, pushPlans, subjectDataMap, bulkUpdateSubjects, setIsLoadingData);
  
  /**
  * Applies an undo or redo action and updates the subject semester accordingly.
  * Prevents history actions when required courses are being displayed.
  * 
  * @param {Function} historyFunc - The function to execute (undo or redo)
  */
  function applyHistoryAction(historyFunc) {
    if (showCurriculum) return;
    const action = historyFunc();
    if (action?.changes?.semester) 
      updateSubject(action.key, {semester: historyFunc.name === "undo" ? action.changes.semester.from : action.changes.semester.to});
  }    


  return isLoadingData ? (
	  <LoadingScreen />
  ) : (
    <AppContainer>
      <Background />
      <ContentContainer>
        <Stack spacing={1}>
          <Header />
          <DragAndDropProvider plans={plans} setPlans={updatePlans} resetPlans={restoreCurrentPlans} disabled={showCurriculum}>
            <Stack spacing={2} direction="row">
              <Stack spacing={2} sx={{ width: "60vw" }}>
                <CompletionBar />     
                <MainTools 
                    undo={() => applyHistoryAction(undo)} 
                    redo={() => applyHistoryAction(redo)} 
                    toggleCurriculum={() => setShowCurriculum(prev => !prev)}
                />
                <Semesters
                    semesters={showCurriculum ? coreCurriculum : plans}
                    pushPlans={pushPlans}
                    updateSubject={updateSubject}
                    plannedSubjects={plannedSubjects}
                    customPlan={!showCurriculum}
                />
              </Stack>
              <CoursePicker plannedSubjects={plannedSubjects} data={groups} />        
            </Stack>
          </DragAndDropProvider>
        </Stack>
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;