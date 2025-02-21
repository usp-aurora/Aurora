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

const CardContent = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "center",
	textAlign: "center",
	marginBottom: "8px",
	[theme.breakpoints.up("sm")]: {
		marginBottom: "14px",
	}
}));

const PlanetWrapper = styled("div")({
	position: "relative",
	display: "inline-flex", // Mantém os elementos alinhados corretamente
	alignItems: "center", // Garante que fiquem alinhados ao bottom
});

const PlanetContainer = styled("div")(({ theme }) => ({
	width: theme.card.mobile.planetSize,
	height: theme.card.mobile.planetSize,
	marginBottom: "8px",
	[theme.breakpoints.up("sm")]: {
		width: theme.card.desktop.planetSize,
		height: theme.card.desktop.planetSize,
	}
}));

const Moon = styled("div")(({ theme, color }) => ({
	width: theme.card.mobile.moonSize,
	height: theme.card.mobile.moonSize,
	position: "absolute",
	left: "-40%",
	
	backgroundColor: color,
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
	}
}));

const TextBox = styled("div")(({theme}) => ({
	width: "100%",
	height: "28px",
	
	wordBreak: "break-word",
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 2,
	overflow: "hidden",

	[theme.breakpoints.up("sm")]: {
		heigh: "39px"
	}
}));

const StyledCourseText = styled(Typography)(({theme}) => ({
	maxWidth: "100%",
	textAlign: "center",
	
	...theme.typography.small,
	[theme.breakpoints.up("sm")]: {
		...theme.typography.p,
	}
}));

const SubjectCard = ({ courseCode, courseTitle, planetURL, ghost, moon, glassmorphismLevel, ...props }) => {
	
	return (
		<CardContainer {...props}>
			<CardBackground ghost={ghost} glassmorphismLevel={glassmorphismLevel}>
				<CardContent>
					<PlanetWrapper>
						{moon && <Moon color="lime"/> }
						<PlanetContainer>
							{planetURL && <Planet src={planetURL} />}
						</PlanetContainer>
					</PlanetWrapper>
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