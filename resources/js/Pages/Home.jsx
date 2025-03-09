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

import coreCurriculum from "../ManualData/coreCurriculum.jsx";

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

const Home = ({ groups }) => {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [showCurriculum, setShowCurriculum] = useState(false);

    const [plans, updatePlans, pushPlans, restoreCurrentPlans, undo, redo] = useHistoryState();
    const [subjectDataMap, plannedSubjects, updateSubject, bulkUpdateSubjects] = useSubjectDataMap(groups);
    
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
