import React from "react";
import { styled } from "@mui/material/styles";
import { twinkle } from "../Atoms/Animations";

const StarGroup = styled("g")(({ twinkling, delay }) => ({ 
    filter: `drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.15))`,
    ...(twinkling && {
  		animation: `${twinkle} 4s ease-in-out infinite`,
  		animationDelay: `${delay}s`,
})}));

function calculateOpacity(index) {
  if (index % 13 === 0) return 0.25;
  if (index % 7 === 0) return 0.5;
  if (index % 3 === 0) return 0.75;
  return 1;
}

function Star({ x, y, width, height, index, twinkling = true}) {
  const opacity = calculateOpacity(index);
  const delay = Math.random() * -4;

  return (
    <StarGroup twinkling={twinkling} delay={delay}>
      <svg x={x} y={y} width={width} height={height} viewBox="0 0 25 25" fill="none">
        <path
          d="M12.7178 16.7285L11.6419 13.8315L8.73437 12.7595L11.6419 11.6875L12.7178 8.79053L13.7936 11.6875L16.7012 12.7595L13.7936 13.8315L12.7178 16.7285Z"
          fill="white"
          opacity={opacity}
        />
      </svg>
    </StarGroup>
  );
};

export default Star;
