import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box }  from "@mui/material";

import Header from "../Components/Header/Header";
import CompletionBar from "../Components/CompletionBar/CompletionBar";
import Background from "../Components/Background/HomeBackground.jsx";
import CourseInfo from "../Components/CourseInfo/CourseInfo.jsx";
import Semesters from "../Components/Semesters/Semesters.jsx";
import CoursePicker from "../Components/CoursePicker/CoursePicker.jsx";
import LoadingScreen from "../Components/Atoms/LoadingScreen";

import useCourseMap from "../Hooks/useCourseMap.jsx";
import usePlansManager from "../Hooks/usePlansManager.jsx";
import { DragAndDropProvider } from "../Components/Dnd/DragAndDropContext.jsx";
import { SubjectInfoProvider } from "../Hooks/useSubjectInfoContext.jsx";
import { SubjectPickerProvider } from "../Hooks/useSubjectPickerContext.jsx";


const AppContainer = styled( Box )(() => ({
    position: "relative",
}));

const ContentContainer = styled( Box )(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "8px",

    [theme.breakpoints.up("sm")]: {
        padding: "16px",
    },
}));

const Home = ({ subjects, groups }) => {
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isAddSubjectModalOpen, setAddSubjectModalOpen] = useState(false);

    const [courseMap, setCourseMap] = useCourseMap(subjects, groups);
    const [plans, setPlans] = usePlansManager(
        courseMap,
        setCourseMap,
        setIsLoadingData
    );

    const toggleAddSubjectModal = () => {
        setAddSubjectModalOpen(!isAddSubjectModalOpen);
    };

    return isLoadingData ? (
        <LoadingScreen />
    ) : (
        <SubjectInfoProvider>
            <SubjectPickerProvider>
                <DragAndDropProvider
                    setCourseMap={setCourseMap}
                    setPlans={setPlans}
                >
                    <AppContainer>
                        <Background />
                        <CourseInfo isPlanned={false} />
                        <ContentContainer>
                            <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: "100%" }} alignItems="center">
                                <Header />
                                <Stack spacing={{ xs: 0, sm: 2 }} direction="row" sx={{ width: "100%" }}>
                                    <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: { xs: "100%", sm: "64%" } }}>
                                        <CompletionBar />
                                        <Semesters
                                            courseMap={courseMap}
                                            plans={plans}
                                            setPlans={setPlans}
                                        />
                                    </Stack>
                                    <CoursePicker
                                        // open={true}
                                        open={isAddSubjectModalOpen}
                                        courseMap={courseMap}
                                        data={groups}
                                        // showSubjectDetails={showSubjectDetails}
                                        // openSubjectPopUp={toggleAddSubjectModal}
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
