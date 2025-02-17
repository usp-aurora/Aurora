import React from 'react';
import { styled } from "@mui/material/styles";

const PlanetStyle = styled('img')(({ theme }) => ({
    boxShadow: '-4px 4px 8px rgba(26, 27, 35, 0.15)',
    borderRadius: '24px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
}));

const Planet = ({ src, alt }) => {
    return <PlanetStyle src={src} alt={alt} />;
};

export default Planet;