import LinearProgress from '@mui/material/LinearProgress';
import { styled } from "@mui/material/styles";
import { Tooltip, Typography } from '@mui/material';

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
	width: "56px",
	overflow: "hidden",
	textOverflow: "ellipsis",

	[theme.breakpoints.up('sm')]: {
		fontSize: "12px",
		lineHeight: "12px",
		marginLeft: "8px",
		width: "86px"
	},
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme, color }) => ({
	flexGrow: 1,
	borderRadius: 25,
	position: 'relative',
	backgroundColor: "white",
	height: "8px",

	[theme.breakpoints.up('sm')]: {
		height: "12px",
	},

	"& .MuiLinearProgress-dashed": {
		display: "none", 
	},

	"& .MuiLinearProgress-bar":{
		borderRadius: 25
	},

	"& .MuiLinearProgress-bar1":{
		backgroundColor: theme.palette[color][500],
	},

	"& .MuiLinearProgress-bar2":{
		backgroundColor: theme.palette[color][300],
	}
}));

const ProgressBar = ({ label, coursed, planned, needed, color}) => {
	const plannedPercentage = Math.min((planned / needed) * 100, 100);
	const coursedPercentage = Math.min((coursed / needed) * 100, 100);

	return (
		<ProgressBarContainer>
			<ProgressLabel variant="body2">{label}</ProgressLabel>
			<BorderLinearProgress variant="buffer" value={coursedPercentage} valueBuffer={plannedPercentage} color={color} />
			<Tooltip title="concluídas /planejadas / necessárias">
				<ProgressValue variant="caption">{`${coursed} / ${planned} / ${needed}`}</ProgressValue>
			</Tooltip>
		</ProgressBarContainer>
	);
};

export default ProgressBar;
