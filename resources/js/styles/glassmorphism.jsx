import { css } from 'styled-components';

const glassmorphismStyle = css`
    background-color: rgb(194, 220, 245, 0.15);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    border-left: 1px solid rgba(255, 255, 255, 0.25);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.089);
    border-radius: 8px;
`;

export default glassmorphismStyle;
