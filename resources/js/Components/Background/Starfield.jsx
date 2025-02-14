import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import Star from "./Star";

const Galaxy = styled("div")(({ themeMode }) => ({
  	position: "fixed",
	  background: themeMode === "dark"
	  ? "linear-gradient(180deg, #1A1B23, #192E47)"
	  : "linear-gradient(150deg, rgba(150, 170, 230, 0.8), rgba(184, 224, 223, 0.8), rgba(224, 192, 242, 0.8))",  
  
	zIndex: -1,
	width: "100vw",
	height: "100vh",
  	overflow: "hidden",
	pointerEvents: "none",
}));

const StarsWrapper = styled("div")({
	position: "absolute",
	width: "100%",
  	height: "200vh", // Covers extra height
	top: 0,
});

const StarsLayer = styled("svg")({
	position: "absolute",
	width: "100%",
	height: "100%",
	preserveAspectRatio: "none",
});

function Starfield({ themeMode = "dark", twinkling = true, starCount = 250, ...props }) {
   
	const stars = useMemo(() => {
    	return Array.from({ length: starCount }).map((i, index) => {
      		const cx = Math.random() * 100 + "%";
      		const cy = Math.random() * 200 + "%"; // Extended height for more stars
      		const size = (Math.random() + 0.1) * 45;

		  	return <Star key={index} x={cx} y={cy} width={size} height={size} index={index} twinkling={twinkling} />;
		});
	}, [starCount, twinkling]);

  	return (
    	<Galaxy themeMode={themeMode} {...props}>
    		<StarsWrapper>
        		<StarsLayer>{stars}</StarsLayer>
      		</StarsWrapper>
   		</Galaxy>
  	);
}

export default Starfield;
