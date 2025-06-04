import { Box, Stack, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";

import Background from "../Features/Background/HomeBackground";
import CompletionBar from "../Features/CompletionBar/CompletionBar";
import Header from "../Features/Header/Header";
import Semesters from "../Features/Semesters/Semesters";
import SubjectInfo from "../Features/SubjectInfo/SubjectInfo";
import { SubjectPickerDesktop, SubjectPickerMobile } from "../Features/SubjectPicker/";
import ToolBar from '../Features/ToolBar/ToolBar';

import { PlansProvider } from "../Contexts/PlansContext";
import { SubjectMapProvider } from "../Contexts/SubjectMapContext";
import { DragAndDropProvider } from '../Features/DragAndDrop/DragAndDropContext';
import { SubjectInfoProvider } from "../Features/SubjectInfo/SubjectInfoContext";
import { SubjectPickerProvider } from "../Features/SubjectPicker/SubjectPickerContext";
import { AuthProvider } from '../context/AuthContext';

const ContentContainer = styled(Box)(({ theme }) => ({
    height: "100vh",
    width: "100%",

    display: "flex",
    justifyContent: "center",
    padding: "8px",

    [theme.breakpoints.up("sm")]: {
        padding: "16px",
    },
}));

const Home = ({ groups, initialPlans, subjects, user }) => {
    const [isRecommendedView, setRecommendedView] = useState(false);
    const theme = useTheme();
    const isAboveSmall = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <AuthProvider loggedUser={user}>
            <SubjectMapProvider subjectDataMap={subjects}>
            <PlansProvider initialPlans={initialPlans} user={user}>
            <SubjectInfoProvider>
            <SubjectPickerProvider>
            <DragAndDropProvider disabled={isRecommendedView}>
                <SubjectInfo />
                {!isAboveSmall && <SubjectPickerMobile groupsData={groups} />}
                <Background />
                <ContentContainer>
                    <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: "100%"}}>
                        <Header/>
                        <Stack spacing={{ xs: 0, sm: 2 }} direction="row" sx={{ width: "100%", flex: 1, overflow: "auto"}}>
                            <Stack spacing={{ xs: 1, sm: 2 }} sx={{ flex: 2}}>
                                <CompletionBar />
                                <ToolBar
                                    isRecommendedView={isRecommendedView}
                                    toggleRecommendedView={() => setRecommendedView(prev => !prev)}
                                    user={user}
                                />
                                <Semesters isRecommendedView={isRecommendedView} />
                            </Stack>
                                {isAboveSmall && (
                                    <Stack sx={{ flex: 1, overflow: "auto" }}>
                                        <SubjectPickerDesktop groupsData={groups} />
                                    </Stack>
                                )}
                        </Stack>
                    </Stack>
                </ContentContainer>
            </DragAndDropProvider>
            </SubjectPickerProvider>
            </SubjectInfoProvider>
            </PlansProvider>
            </SubjectMapProvider>
        </AuthProvider>
    );
};

export default Home;
