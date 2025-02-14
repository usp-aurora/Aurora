import { styled } from "@mui/material/styles";
import React, { useState } from 'react';
import Starfield from "./Starfield";

const BackgroundComponent = styled(Starfield)(() => ({
	top: 0,
	left: 0,
	width: '100%',
	height: 'max(100%, 100vh)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

const Background = () => {
	return (
		<BackgroundComponent themeMode="dark" />
  	);
};

export default Background;