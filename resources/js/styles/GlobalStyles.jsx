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
`;

export default globalStyles;
