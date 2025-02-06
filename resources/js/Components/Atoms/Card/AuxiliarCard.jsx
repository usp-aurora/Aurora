import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import CardContainer from "./Auxiliary/CardContainer";
import CardBackgroundBase from "./Auxiliary/CardBackgroundBase";

const CardBackground = styled(({ glassmorphismLevel, ...other }) => (
	<CardBackgroundBase {...other} />
))(({ theme, ghost }) => ({
	"&:hover": {
		backgroundColor: ghost ? "transparent" : theme.palette.primary.dark,
	},
}));

const StyledIcon = styled(({ component: Component, ...props }) => (
	<Component {...props} />
))(({ theme }) => ({
	color: "white",
	fontSize: "60px",
}));

const StyledText = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.small.fontSize,

	[theme.breakpoints.up("sm")]: {
		fontSize: theme.typography.p.fontSize,
	},
}));

const ButtonCard = ({ icon, text, ghost }) => {
	return (
		<CardContainer>
			<CardBackground ghost={ghost}>
				{icon && <StyledIcon component={icon} />}
				<StyledText component="p">{text}</StyledText>
			</CardBackground>
		</CardContainer>
	);
};

export default ButtonCard;
