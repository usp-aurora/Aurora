import React from 'react';
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';

const ProgressBarContainer = styled("div")(({}) => ({
	display: "flex",
	flexDirection: "row", 
	alignItems: "center",
	width: "100%",
}));

const ProgressLabel = styled(Typography)(({ theme }) => ({
	...theme.typography.small,
	width: "80px",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",

	[theme.breakpoints.up('sm')]: {
		marginRight: `calc(2 * ${theme.typography.h4.fontSize})`,
		...theme.typography.h4,
		width: "100px",
	},
}));

const ProgressValue = styled(Typography)(({ theme }) => ({
	fontSize: "8px",
	lineHeight: "8px",
	whiteSpace: "nowrap",
	marginLeft: "6px",
	width: "40px",
	overflow: "hidden",
	textOverflow: "ellipsis",

	[theme.breakpoints.up('sm')]: {
		fontSize: "12px",
		lineHeight: "12px",
		marginLeft: "8px",
		width: "60px"
	},
}));

const BaseBar = styled("div")(({ theme }) => ({
	flexGrow: 1,
	borderRadius: '80px',
	position: 'relative',
	
	height: '8px',
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

const ProgressBar = ({ label, coursed, planned, needed, color}) => {
	const plannedPercentage = (planned / needed) * 100;
	const coursedPercentage = (coursed / needed) * 100;

	return (
		<ProgressBarContainer>
			<ProgressLabel variant="body2">{label}</ProgressLabel>
			<BaseBar>
				<PlannedBar color={color} percentage={plannedPercentage} />
				<CoursedBar color={color} percentage={coursedPercentage} />
			</BaseBar>
			<ProgressValue variant="caption">{`${coursed} / ${needed}`}</ProgressValue>
		</ProgressBarContainer>
	);
};

export default ProgressBar;
