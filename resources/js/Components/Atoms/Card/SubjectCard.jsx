import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import glassmorphismStyle from "../../../styles/MUI/glassmorphismMUI";
import Planet from "../Planet";
import { CardBackgroundBase, CardContainer } from "./Pieces/CardPieces";

const CardBackground = styled(({ isClickable, hasIcon, ghost, glassmorphismLevel, ...props }) => (
    <CardBackgroundBase isClickable={isClickable} hasIcon={hasIcon} ghost={ghost} {...props} />
))(({ theme, ghost, glassmorphismLevel }) => ({
    ...(!ghost && glassmorphismStyle(theme, glassmorphismLevel)),
}));

const CardContent = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: "8px",
    [theme.breakpoints.up("sm")]: {
        marginBottom: "14px",
    },
}));

const PlanetContainer = styled(Box)(({ theme }) => ({
    width: theme.card.mobile.planetSize,
    height: theme.card.mobile.planetSize,
    marginBottom: "8px",
    [theme.breakpoints.up("sm")]: {
        width: theme.card.desktop.planetSize,
        height: theme.card.desktop.planetSize,
    },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.neutral.main,

    ...theme.typography.h4,
    lineHeight: "15px",
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.h3,
        lineHeight: "26px",
    },
}));

const TextContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.up("sm")]: {
        height: "39px",
    },
}));

const TextWrapper = styled(Box)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    wordBreak: "break-word",
});

const StyledSubjectText = styled(Typography)(({ theme }) => ({
    width: "90px",
    textAlign: "center",
    ...theme.typography.small,
    [theme.breakpoints.up("sm")]: {
        width: "112px",
        ...theme.typography.p,
    },
}));

const SubjectCard = ({
    subjectCode,
    subjectName,
    planetURL,
    ghost,
    glassmorphismLevel = "level2",
    ...props
}) => {
    return (
        <CardContainer isClickable={!ghost} {...props}>
            <CardBackground
                isClickable={!ghost}
                hasIcon={!!planetURL}
                ghost={ghost}
                glassmorphismLevel={glassmorphismLevel}
            >
                <CardContent>
                    <PlanetContainer>
                        {planetURL && !ghost && <Planet src={planetURL} />}
                    </PlanetContainer>
                    <StyledTitle> {subjectCode} </StyledTitle>
                    <TextContainer>
                        <TextWrapper>
                            <StyledSubjectText>{subjectName}</StyledSubjectText>
                        </TextWrapper>
                    </TextContainer>
                </CardContent>
            </CardBackground>
        </CardContainer>
    );
};

export default SubjectCard;
