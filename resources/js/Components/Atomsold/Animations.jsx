import { keyframes } from 'styled-components';

export const slideIn = keyframes`
  0% {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
  }
  100% {
    max-height: 500px;
    opacity: 1;
    margin-top: 1%;
  }
`;

export const slideIn2 = keyframes`
  0% {
    max-height: 0;
    opacity: 0;
  }
  100% {
    max-height: 500px;
    opacity: 1;
  }
`;

export const slideOut = keyframes`
  0% {
    max-height: 500px;
    opacity: 1;
    margin-top: 1%;
  }
  100% {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
  }
`;

export const slideOut2 = keyframes`
  0% {
    max-height: 500px;
    opacity: 1;
  }
  100% {
    max-height: 0;
    opacity: 0;
  }
`;

export const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(-15px);
  }
  70% {
    transform: translateY(-8px);
  }
  90% {
    transform: translateY(-2px);
  }
`;

export const bounceBack = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
  }
  40%, 43% {
    transform: translateY(15px);
  }
  70% {
    transform: translateY(8px);
  }
  90% {
    transform: translateY(2px);
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;