import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import glassmorphismStyle from "../../../styles/glassmorphism";
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

const PlanetWrapper = styled("div")({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
});

const Moon = styled("div")(({ theme }) => ({
	width: theme.card.mobile.moonSize,
	height: theme.card.mobile.moonSize,
	position: "absolute",
	left: "-45%",
	
	backgroundColor: theme.palette.green.main,
	borderRadius: "50%",

	[theme.breakpoints.up("sm")]: {
		width: theme.card.desktop.moonSize,
		height: theme.card.desktop.moonSize,
	}
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
    moon,
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
					<PlanetWrapper>
						{moon && <Moon/> }
						<PlanetContainer>
							{(!ghost && planetURL) && <Planet src={planetURL} />}
						</PlanetContainer>
					</PlanetWrapper>
                    <StyledTitle component="h3"> {subjectCode} </StyledTitle>
                    <TextContainer>
                        <TextWrapper>
                            <StyledSubjectText component="p">{subjectName}</StyledSubjectText>
                        </TextWrapper>
                    </TextContainer>
                </CardContent>
            </CardBackground>
        </CardContainer>
    );
};

export default SubjectCard;
