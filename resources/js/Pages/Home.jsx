import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Stack, Box }  from "@mui/material";

import Header from "../Components/Header/Header";
import CompletionBar from "../Components/CompletionBar/CompletionBar";
import Background from "../Components/Background/HomeBackground";
import SubjectInfo from "../Components/SubjectInfo/SubjectInfo";
import Semesters from "../Components/Semesters/Semesters";
import SubjectPicker from "../Components/SubjectPicker/SubjectPicker";
import LoadingScreen from "../Components/Atoms/LoadingScreen";

import useSubjectMap from "../Hooks/useSubjectMap";
import usePlansManager from "../Hooks/usePlansManager";
import { DragAndDropProvider } from "../Components/Dnd/DragAndDropContext";
import { SubjectInfoProvider } from "../Hooks/useSubjectInfoContext";
import { SubjectPickerProvider } from "../Hooks/useSubjectPickerContext";

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

    const [subjectMap, setSubjectMap] = useSubjectMap(subjects, groups);
    const [plans, setPlans] = usePlansManager(
        subjectMap,
        setSubjectMap,
        setIsLoadingData
    );

    return isLoadingData ? (
        <LoadingScreen />
    ) : (
        <SubjectInfoProvider>
            <SubjectPickerProvider>
                <DragAndDropProvider
                    setSubjectMap={setSubjectMap}
                    setPlans={setPlans}
                >
                    <AppContainer>
                        <Background />
                        <SubjectInfo />
                        <ContentContainer>
                            <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: "100%" }} alignItems="center">
                                <Header />
                                <Stack spacing={{ xs: 0, sm: 2 }} direction="row" sx={{ width: "100%" }}>
                                    <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: { xs: "100%", sm: "64%" } }}>
                                        <CompletionBar />
                                        <Semesters
                                            subjectMap={subjectMap}
                                            plans={plans}
                                            setPlans={setPlans}
                                        />
                                    </Stack>
                                    <SubjectPicker
                                        subjectMap={subjectMap}
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
