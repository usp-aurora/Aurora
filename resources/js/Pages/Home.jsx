import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';

import Header from '../Components/Header/Header'
import CompletionBar from '../Components/CompletionBar/CompletionBar' 
import Background from '../Components/Background/HomeBackground.jsx';


import Semesters from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import LoadingScreen from '../Components/Atomsold/LoadingScreen';

import usePlansManager from '../Hooks/usePlansManager.jsx';
import useSubjectDataMap from '../Hooks/useSubjectDataMap.jsx';
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

const Home = ({ subjects, groups }) => { 
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [subjectDataMap, setSubjectDataMap, updateSubjectSemester] = useSubjectDataMap(subjects, groups);
  const [plans, setPlans] = usePlansManager(subjectDataMap, setSubjectDataMap, setIsLoadingData);

  return  isLoadingData ? (
	  <LoadingScreen />
  ) : (
    <AppContainer>
      <Background />
      <ContentContainer>
        <Stack spacing={1}>
          <Header />
          <DragAndDropProvider setPlans={setPlans}>
            <Stack spacing={2} direction="row">
              <Stack spacing={2} sx={{ width: "60vw" }}>
                <CompletionBar />
                <Semesters courseMap={subjectDataMap} updateSubjectSemester={updateSubjectSemester} plans={plans} setPlans={setPlans} />
              </Stack>
              <CoursePicker courseMap={subjectDataMap} data={groups} />        
            </Stack>
          </DragAndDropProvider>
        </Stack>
      </ContentContainer>
    </AppContainer>
  );
};

export default Home;