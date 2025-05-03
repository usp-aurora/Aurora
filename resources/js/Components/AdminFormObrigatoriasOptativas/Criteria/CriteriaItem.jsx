/* CriteriaItem is the component for the selected criteria */

import CriteriaQuantity from "./CriteriaQuantity";
import CriteriaSelection from "./CriteriaSelection";

import { Typography, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

/* Styling the text "Critério de conclusão: " */
const Text = styled(Typography)({
    fontFamily: 'Rubik',
    fontWeight: "400",
    fontSize: '14px',
    lineHeight: '16px',
    marginRight: '16px',
    letterSpacing: '0%',
    color: '#424242',
});

const CriteriaItem = ({ type, onChangeType, quantity, onChangeQuantity }) => {
    
    return (
        <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Text>Critério de conclusão: </Text>
            <Box style={{ marginRight: '16px' }}>
                <CriteriaQuantity 
                    value={quantity}
                    onChange={onChangeQuantity}
                />
            </Box>
            <Box style={{ marginRight: '16px' }}>
                <CriteriaSelection 
                    value={type}
                    onChange={onChangeType}
                />
            </Box>
        </Box>
    );
    
};

export default CriteriaItem;
