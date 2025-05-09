import { css } from '@emotion/react'

const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    overflow: hidden;
  }
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #C9CBCA;
    border-radius: 10px;
    height: 100px;
    visibility: hidden;
  }
  &:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }
  ::-webkit-scrollbar-thumb:hover {
    visibility: visible;
  }
`;

export default globalStyles;
