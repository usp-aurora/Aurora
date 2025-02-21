import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import CardContainer from "./Pieces/CardContainer";
import CardBackgroundBase from "./Pieces/CardBackgroundBase";

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
	...theme.typography.small,
	
	[theme.breakpoints.up("sm")]: {
		...theme.typography.p,
	},
}));

const ButtonCard = ({ icon, text, ghost, ...props }) => {
	return (
		<CardContainer {...props}>
			<CardBackground ghost={ghost}>
				{icon && <StyledIcon component={icon} />}
				<StyledText component="p">{text}</StyledText>
			</CardBackground>
		</CardContainer>
	);
};

export default ButtonCard;
