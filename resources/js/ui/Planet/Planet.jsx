import { styled } from "@mui/material/styles";
import planetImage from '../../../images/icons/planeta.png';

const PlanetStyle = styled('img')(({ theme }) => ({
    boxShadow: '-4px 4px 8px rgba(26, 27, 35, 0.15)',
    borderRadius: '50%',
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
}));

const Planet = ({ src, ...props }) => {
    return <PlanetStyle src={planetImage} {...props}/>;
};

export default Planet;
