import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";

import Header from "../Components/Header/Header";
import CompletionBar from "../Components/CompletionBar/CompletionBar";
import Background from "../Components/Background/HomeBackground";
import SubjectInfo from "../Components/SubjectInfo/SubjectInfo";
import Semesters from "../Components/Semesters/Semesters";
import SubjectPicker from "../Components/SubjectPicker/SubjectPicker";
import LoadingScreen from "../Components/Atoms/LoadingScreen";

import MainTools from '../Components/Tools/MainTools.jsx';
import useHistoryState from "../Hooks/useHistoryState";
import usePlansManager from '../Hooks/usePlansManager.jsx';
import useSubjectDataMap from '../Hooks/useSubjectDataMap.jsx';
import { DragAndDropProvider } from '../Components/Dnd/DragAndDropContext.jsx';
import { SubjectInfoProvider } from "../Hooks/useSubjectInfoContext";
import { SubjectPickerProvider } from "../Hooks/useSubjectPickerContext";

const AppContainer = styled(Box)(() => ({
    position: "relative",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "8px",

    [theme.breakpoints.up("sm")]: {
        padding: "16px",
    },
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


for (let i = 0; i < 6; i++) {
    coreCurriculum[5].suggestions.push({
        group: "Optativa Livre",
    });
}

const Home = ({ groups }) => {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [showCurriculum, setShowCurriculum] = useState(false);

    const [plans, updatePlans, pushPlans, restoreCurrentPlans, undo, redo] = useHistoryState();
    const [subjectDataMap, plannedSubjects, updateSubject, bulkUpdateSubjects] = useSubjectDataMap(groups);
    // console.log("subjectDataMap", subjectDataMap);
    // console.log("plans", plans);
    
    const defaultPlans = coreCurriculum.map(({ semesterId, subjects }) => ({ semesterId, subjects })); // keeps only a subset of the properties
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
            updateSubject(action.key, { semester: historyFunc.name === "undo" ? action.changes.semester.from : action.changes.semester.to });
    }

    return isLoadingData ? (
        <LoadingScreen />
    ) : (
    // return (
        <SubjectInfoProvider>
            <SubjectPickerProvider>
                <DragAndDropProvider
                    setPlans={updatePlans}
                    resetPlans={restoreCurrentPlans}
                    disabled={showCurriculum}
                >
                    <AppContainer>
                        <Background />
                        <SubjectInfo />
                        <ContentContainer>
                            <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: "100%" }} alignItems="center">
                                <Header />
                                <Stack spacing={{ xs: 0, sm: 2 }} direction="row" sx={{ width: "100%" }}>
                                    <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: { xs: "100%", sm: "64%" } }}>
                                        <CompletionBar 
                                            subjectDataMap={subjectDataMap}
                                            plans={plans}
                                        />
                                        <MainTools
                                            undo={() => applyHistoryAction(undo)}
                                            redo={() => applyHistoryAction(redo)}
                                            showCurriculum={showCurriculum}
                                            toggleCurriculum={() => setShowCurriculum(prev => !prev)}
                                        />
                                        <Semesters
                                            semesters={showCurriculum ? coreCurriculum : plans}
                                            pushPlans={pushPlans}
                                            updateSubject={updateSubject}
                                            plannedSubjects={plannedSubjects}
                                            subjectDataMap={subjectDataMap}
                                            customPlan={!showCurriculum}
                                        />
                                    </Stack>
                                    <SubjectPicker
                                        plannedSubjects={plannedSubjects}
                                        subjectDataMap={subjectDataMap}
                                        data={groups}
                                    />
                                </Stack>
                            </Stack>
                        </ContentContainer>
                    </AppContainer>
                </DragAndDropProvider>
            </SubjectPickerProvider>
        </SubjectInfoProvider>
    );
};

export default Home;
