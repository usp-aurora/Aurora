import React, { useEffect, useMemo, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Stack, Box, useMediaQuery } from "@mui/material";

import HeaderDesktop from "../Components/Header/HeaderDesktop";
import HeaderMobile from "../Components/Header/HeaderMobile";
import CompletionBar from "../Components/CompletionBar/CompletionBar";
import Background from "../Components/Background/HomeBackground";
import SubjectInfo from "../Components/SubjectInfo/SubjectInfo";
import Semesters from "../Components/Semesters/Semesters";
import SubjectPickerDesktop from "../Components/SubjectPicker/SubjectPickerDesktop";
import SubjectPickerMobile from "../Components/SubjectPicker/SubjectPickerMobile";

import MainTools from '../Components/Tools/MainTools.jsx';
import useHistoryState from "../Hooks/useHistoryState";
// import usePlansManager from '../Hooks/newPlansManager.jsx';
import useSubjectDataMap from '../Hooks/useSubjectDataMap.jsx';
import { DragAndDropProvider } from '../Components/Dnd/DragAndDropContext.jsx';
import { SubjectInfoProvider } from "../Hooks/useSubjectInfoContext";
import { SubjectPickerProvider } from "../Hooks/useSubjectPickerContext";
import { SubjectMapProvider } from "../Hooks/useSubjectMapContext";
import { PlansProvider } from "../Hooks/usePlansContext";

import coreCurriculum from "../ManualData/coreCurriculum.jsx";

const AppContainer = styled(Box)(() => ({
    position: "relative",
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "8px",
    overflow: "hidden", // Prevent general page from being scrollable

    [theme.breakpoints.up("sm")]: {
        padding: "16px",
    },
}));

const Home = ({ groups, initialPlans, subjects, user }) => {
    const [isRecommendedView, setRecommendedView] = useState(false);

    // const [plans, updatePlans, pushPlans, restoreCurrentPlans, undo, redo] = useHistoryState(initialPlans);
    
    // const [subjectDataMap, plannedSubjects, updateSubject, bulkUpdateSubjects] = useSubjectDataMap(groups);

    // usePlansManager(user, initialPlans, defaultPlans, pushPlans, subjectDataMap, bulkUpdateSubjects);

    // /**
    //  * Applies an undo or redo action and updates the subject semester accordingly.
    //  * Prevents history actions when required courses are being displayed.
    //  * 
    //  * @param {Function} historyFunc - The function to execute (undo or redo)
    //  */
    // function applyHistoryAction(historyFunc) {
    //     if (isRecommendedView) return;
    //     const action = historyFunc();
    //     if (action?.changes?.semester)
    //         updateSubject(action.key, { semester: historyFunc.name === "undo" ? action.changes.semester.from : action.changes.semester.to });
    // }

    const theme = useTheme();
    const isAboveSmall = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <SubjectMapProvider subjectDataMap={subjects}>
        <PlansProvider initialPlans={initialPlans}>
        <SubjectInfoProvider>
        <SubjectPickerProvider>
            
                    <DragAndDropProvider disabled={isRecommendedView}>
                        <AppContainer>
                            <SubjectInfo />
                            {!isAboveSmall && <SubjectPickerMobile
                                groupsData={groups} />}
                            <Background />

                            <ContentContainer>
                                <Stack spacing={{ xs: 1, sm: 2 }}>
                                    {isAboveSmall ? <HeaderDesktop /> : <HeaderMobile />}
                                    <Stack spacing={{ xs: 0, sm: 2 }} direction="row" sx={{ width: "100%", height: "100%" }}>
                                        <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: { xs: "100%", sm: "64%" } }}>
                                            <CompletionBar />
                                            {/* <MainTools
                                                undo={() => applyHistoryAction(undo)}
                                                redo={() => applyHistoryAction(redo)}
                                                isRecommendedView={isRecommendedView}
                                                toggleCurriculum={() => setShowCurriculum(prev => !prev)}
                                            /> */}
                                            <Semesters
                                                isRecommendedView={isRecommendedView}
                                            />
                                        </Stack>
                                        {isAboveSmall &&
                                            (<Stack sx={{ width: "36%" }}>        
                                                <SubjectPickerDesktop
                                                    groupsData={groups}
                                                />
                                            </Stack>)
                                        }
                                    </Stack>
                                </Stack>
                            </ContentContainer>
                        </AppContainer>
                    </DragAndDropProvider>

        </SubjectPickerProvider>
        </SubjectInfoProvider>
        </PlansProvider>
        </SubjectMapProvider>
    );
};

export default Home;
