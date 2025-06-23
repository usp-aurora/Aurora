import { Box, Stack, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import Background from "../Features/Background/HomeBackground";
import CompletionBar from "../Features/CompletionBar/CompletionBar";
import Header from "../Features/Header/Header";
import Semesters from "../Features/Semesters/Semesters";
import SubjectInfo from "../Features/SubjectInfo/SubjectInfo";
import { SubjectPickerDesktop, SubjectPickerMobile } from "../Features/SubjectPicker/";
import ToolBar from '../Features/ToolBar/ToolBar';

import AppProviders from "../Contexts/AppProviders";

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

const Home = ({ groups, initialPlans, suggestedPlans, subjects, user }) => {
    const theme = useTheme();
    const isAboveSmall = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <AppProviders 
            initialPlans={initialPlans}
            groups={groups}
            suggestedPlans={suggestedPlans}
            subjects={subjects} 
            user={user}
        >
            <SubjectInfo />
            {!isAboveSmall && <SubjectPickerMobile/>}
            <Background />
            <ContentContainer>
                <Stack spacing={{ xs: 1, sm: 2 }} sx={{ width: "100%"}}>
                    <Header/>
                    <Stack spacing={{ xs: 0, sm: 2 }} direction="row" sx={{ width: "100%", flex: 1, overflow: "auto"}}>
                        <Stack spacing={{ xs: 1, sm: 2 }} sx={{ flex: 2}}>
                            <CompletionBar />
                            <ToolBar />
                            <Semesters />
                        </Stack>
                        {isAboveSmall && (
                            <Stack sx={{ flex: 1, overflow: "auto" }}>
                                <SubjectPickerDesktop/>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </ContentContainer>
        </AppProviders>
    );
};

export default Home;
