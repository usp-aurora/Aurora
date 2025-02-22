import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

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

const AppContainer = styled("div")(() => ({
    position: "relative",
}));

const ContentContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
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
            <AppContainer>
                <Background />
                <CourseInfo isPlanned={false} />
                <ContentContainer>
                    <Stack spacing={1}>
                        <Header />
                        <DragAndDropProvider
                            setCourseMap={setCourseMap}
                            setPlans={setPlans}
                        >
                            <Stack spacing={2} direction="row">
                                <Stack spacing={1} sx={{ width: "60vw" }}>
                                    <CompletionBar />
                                    <Semesters
                                        courseMap={courseMap}
                                        plans={plans}
                                        setPlans={setPlans}
                                    />
                                </Stack>
                                <CoursePicker
                                    open={isAddSubjectModalOpen}
                                    courseMap={courseMap}
                                    data={groups}
                                    // showSubjectDetails={showSubjectDetails}
                                    // openSubjectPopUp={toggleAddSubjectModal}
                                />
                            </Stack>
                        </DragAndDropProvider>
                    </Stack>
                </ContentContainer>
            </AppContainer>
        </SubjectInfoProvider> 
    );
};

export default Home;
