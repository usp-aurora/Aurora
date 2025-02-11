import { styled } from "@mui/material/styles";
import React, { useState } from 'react';
const BackgroundComponent = styled("div")(() => ({
	position: 'absolute',
	top: 0,
	left: 0,
	zIndex: -1,
	width: '100%',
	height: 'max(100%, 100vh)',
	background: 'url(./images/Background-Noturno.png) no-repeat center center',
	backgroundSize: 'auto 100%',
	backgroundPosition: 'center',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}));

const Background = () => {
  return (
	<BackgroundComponent />
  );
};

export default Background;