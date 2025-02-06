import React from 'react';
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import glassmorphismStyle from '../../../styles/MUI/glassmorphismMUI';
import Planet from '../Planet';
import CardContainer from "./Auxiliary/CardContainer";
import CardBackgroundBase from "./Auxiliary/CardBackgroundBase";

const CardBackground = styled(({ glassmorphismLevel, ...other }) => <CardBackgroundBase {...other} />)(
	({ theme, ghost, glassmorphismLevel }) => ({
		...(!ghost && glassmorphismStyle(theme, glassmorphismLevel ?? "level2")),
	})
);

const CardContent = styled("div")(() => ({
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "center",
	textAlign: "center",
	transform: "translateY(-10px)",
}));

const PlanetContainer = styled("div")(({ theme }) => ({
	width: theme.card.mobile.planetSize,
	height: theme.card.mobile.planetSize,
	marginBottom: "0.5rem",
	[theme.breakpoints.up("sm")]: {
		width: theme.card.desktop.planetSize,
		height: theme.card.desktop.planetSize,
	}
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
	color: theme.palette.neutral.main,
	fontSize: theme.typography.h4.fontSize,
	lineHeight: theme.typography.h4.lineHeight,
	
	[theme.breakpoints.up("sm")]: {
			fontSize: theme.typography.h3.fontSize,
			lineHeight: theme.typography.h3.lineHeight,
	}
}));

const TextBox = styled("div")(({theme}) => ({
	width: "100%",
	height: "2rem",
	
	wordBreak: "break-word",
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 2,
	overflow: "hidden",

	[theme.breakpoints.up("sm")]: {
		heigh: "3rem"
	}
}));

const StyledCourseText = styled(Typography)(({theme}) => ({
	fontSize: theme.typography.small.fontSize,
	maxWidth: "100%",

	[theme.breakpoints.up("sm")]: {
		fontSize: theme.typography.p.fontSize
	}
}));

const SubjectCard = ({ courseCode, courseTitle, planetURL, ghost, glassmorphismLevel, onClick }) => {
	return (
		<CardContainer onClick={() => onClick(courseCode)}>
			<CardBackground ghost={ghost} glassmorphismLevel={glassmorphismLevel}>
				<CardContent>
					<PlanetContainer>
						{planetURL && <Planet src={planetURL} />}
					</PlanetContainer>
					<StyledTitle> {courseCode} </StyledTitle>
					<TextBox>
						<StyledCourseText component="p">{courseTitle}</StyledCourseText>
					</TextBox>
				</CardContent>
			</CardBackground>
		</CardContainer>
	);
};

export default SubjectCard;