import React from 'react';
import { styled } from "@mui/material/styles";

const ProgressBarContainer = styled("div")(({}) => ({
	display: "flex",
	flexDirection: "row", 
	alignItems: "center",
}));

const ProgressLabel = styled("p")(({ theme }) => ({
	fontSize: theme.typography.small.fontSize,
	lineHeight: theme.typography.small.lineHeight,
	marginRight: `calc(2 * ${theme.typography.small.fontSize})`,

	[theme.breakpoints.up('sm')]: {
		marginRight: `calc(2 * ${theme.typography.h4.fontSize})`,
		fontSize: theme.typography.h4.fontSize,
		lineHeight: theme.typography.h4.lineHeight,
	},
}));

const ProgressValue = styled("p")(({ theme }) => ({
	fontSize: "8px",
	lineHeight: "8px",
	whiteSpace: "nowrap",
	marginLeft: "6px",

	[theme.breakpoints.up('sm')]: {
		fontSize: "12px",
		lineHeight: "12px",
		marginLeft: "8px",
	},
}));

const BaseBar = styled("div")(({ theme }) => ({
	width: "100%",
	height: '8px',

	borderRadius: '80px',
	position: 'relative',

	backgroundColor: theme.palette.white.main,
	[theme.breakpoints.up('sm')]: {
		height: '12px',
	},
}));

const PlannedBar = styled("div")(({ theme, percentage, color }) => ({
	width: percentage === 100 ? `calc(${percentage}% + 0.6px)` : `${percentage}%`,
	height: '100%',
	backgroundColor: theme.palette[color].light,
	position: 'absolute',
	top: 0,
	left: "-0.3px",
	borderRadius: 'inherit',
}));

const CoursedBar = styled("div")(({ theme, percentage, color }) => ({
	width: percentage === 100 ? `calc(${percentage}% + 1px)` : `${percentage}%`,
	height: '100%',
	backgroundColor: theme.palette[color].dark,
	position: 'absolute',
	top: 0,
	left: "-0.5px",
	borderRadius: 'inherit',
}));

const ProgressBar = ({ coursed = 30, planned = 50, needed = 100, color = "pink" }) => {
	const plannedPercentage = (planned / needed) * 100;
	const coursedPercentage = (coursed / needed) * 100;

	return (
		<ProgressBarContainer>
			<ProgressLabel>Eletivas</ProgressLabel>
			<BaseBar>
				<PlannedBar color={color} percentage={plannedPercentage} />
				<CoursedBar color={color} percentage={coursedPercentage} />
			</BaseBar>
			<ProgressValue>{`${coursed} / ${needed}`}</ProgressValue>
		</ProgressBarContainer>
	);
};

export default ProgressBar;
