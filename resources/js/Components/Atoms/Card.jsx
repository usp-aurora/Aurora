import React, { useEffect } from 'react';
import styled from 'styled-components';

const CardComponent = styled.div`
  position: relative;
  width: 136px;
  height: 136px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
 
  &:active {
    transform: translateY(2px);
  }  
`;

const CardContent = styled.div`
  width: 112px;
  position: absolute;
  top: 0px;
  right: 8px;
  z-index: 1;
`

const CardBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

const Card = ({children, colors, onClick, onCreate}) => {
  return (
    <CardComponent onClick={onClick} onLoad={onCreate}>
      <CardContent>
        {children}
      </CardContent>
      <CardBackground>
          <svg viewBox="0 0 136 136" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* background */}
            <g>
              <path d="M0 8H136V128H0V8Z" fill={colors.background} />
              <path d="M8 0H128V136H8V0Z" fill={colors.background} />
              <path d="M4 4H132V132H4V4Z" fill={colors.background} />
            </g>
            {/* inner line */}
            <g> 
              <path d="M8 128H128V132H8V128Z" fill={colors.innerLine} />
              <path d="M4 128V8H8V128H4Z" fill={colors.innerLine} />
              <path d="M8 8H12V12H8V8Z" fill={colors.innerLine} />
              <path d="M8 4H12V8H8V4Z" fill={colors.innerLine} />
              <path d="M132 116H136V128H132V116Z" fill={colors.innerLine} />
              <path d="M124 124H132V128H124V124Z" fill={colors.innerLine} />
              <path d="M8 0H20V4H8V0Z" fill={colors.innerLine} />
              <path d="M8 124H12V128H8V124Z" fill={colors.innerLine} />
            </g>
            {/* outer line */}
            <g>
              <path d="M8 132H128V136H8V132Z" fill={colors.outerLine} />
              <path d="M0 128V8H4V128H0Z" fill={colors.outerLine} />
              <path d="M4 128H8V132H4V128Z" fill={colors.outerLine} />
              <path d="M4 4H8V8H4V4Z" fill={colors.outerLine} />
              <path d="M128 128H132V132H128V128Z" fill={colors.outerLine} />
            </g>
          </svg>
      </CardBackground>
    </CardComponent>
  );
};

export default Card;