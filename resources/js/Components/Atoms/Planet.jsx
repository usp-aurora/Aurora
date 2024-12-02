import React from 'react';
import styled from 'styled-components';

const PlanetStyle = styled.img`
    box-shadow: -4px 4px 8px rgba(26, 27, 35, 0.15);
    border-radius: 24px;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Planet = ({ src, alt }) => {
    return <PlanetStyle src={src} alt={alt} />;
};

export default Planet;