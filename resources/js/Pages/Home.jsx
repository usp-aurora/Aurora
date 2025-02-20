import React, { useState } from 'react';
import { styled } from "@mui/material/styles";
import Stack from '@mui/material/Stack';

import Header from '../Components/Header/Header'
import CompletionBar from '../Components/CompletionBar/CompletionBar' 
import Background from '../Components/Background/HomeBackground.jsx';

import Semesters from '../Components/Semesters/Semesters.jsx';
import CoursePicker from '../Components/CoursePicker/CoursePicker.jsx';
import LoadingScreen from '../Components/Atomsold/LoadingScreen';

import useCourseMap from '../Hooks/useCourseMap.jsx';
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
coreCurriculum[0].subjects.push({
  code: "MAC0425",
  name: "Introdução à Computação",
  credits: [4, 0],
});

coreCurriculum[0].suggestions.push({
  group: "Optativa Livre",
});

const Home = ({ groups }) => { 
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [subjectDataMap, plannedSubjects, updateSubject, bulkUpdateSubjects] = useSubjectDataMap(groups);
  const [plans, setPlans] = usePlansManager(subjectDataMap, bulkUpdateSubjects, setIsLoadingData);

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
                <Semesters 
                    plans={plans} 
                    coreCurriculum={coreCurriculum}
                    plannedSubjects={plannedSubjects} 
                    updatePlans={setPlans} 
                    updateSubject={updateSubject}  
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