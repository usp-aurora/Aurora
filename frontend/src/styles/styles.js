import { createGlobalStyle } from 'styled-components';
// import { css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "vcr_osd_mono";
    src: url('/fonts/vcr_osd_mono.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    // ===== Fonts =====
    --title-font: "vcr_osd_mono";
    --text-font: "Arial";

    // ===== Colors =====
    --primary-color-100: #E4EEFA;
    --primary-color-200: #C2DCF5;
    --primary-color-300: #8DC0EC;
    --primary-color-400: #51A1E0;
    --primary-color-500: #2A85CD;
    --primary-color-600: #1B68AE;
    --primary-color-700: #17538D;

    --secondary-color-300: #FFA0A0;
    --secondary-color-400: #FF6A6A;
    --secondary-color-500: #F83B3B;
    --secondary-color-600: #E83030;
    --secondary-color-700: #C11414;
    --secondary-color-800: #A01414;
    --secondary-color-900: #841818;

    --gray-scale-100: #EEEEEE;
    --gray-scale-200: #E0E0E0;
    --gray-scale-300: #BDBDBD;
    --gray-scale-400: #9E9E9E;
    --gray-scale-500: #757575;
    --gray-scale-600: #424242;
    --gray-scale-700: #212121;

    --white: #FFFFFF;
    --black: #1A1B23;

  }

  body {
    font-family: var(--text-font);
  }

  h1, h2, h3, h4, span, input { 
    font-family: var(--title-font);
    font-weight: normal;
  }

  h1 { 
    font-size: 24px;
    line-height: 32px;
  }
    
  h2 { 
    font-size: 20px;
    line-height: 32px;
  }
    
  h3 { 
    font-size: 16px;
    line-height: 16px;
  }
      
  h4 {
    font-size: 14px;
    line-height: 16px;
  }
      
  h5 {
    font-size: 10px;
    line-height: 16px;
  }

  p { 
    font-size: 10px;
    line-height: 12px;
  }
`;

export default GlobalStyle;