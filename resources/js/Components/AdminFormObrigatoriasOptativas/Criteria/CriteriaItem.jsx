import CriteriaQuantity from "./CriteriaQuantity";
import CriteriaSelection from "./CriteriaSelection";
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";

const Text = styled(Typography)({
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '0%',
    color: '#424242',
    marginRight: '16px'
});

export default function CriteriaItem({
    type,
    onChangeType,
    quantity,
    onChangeQuantity
}) {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text>Critério de conclusão: </Text>
            <div style={{ marginRight: '16px' }}>
                <CriteriaQuantity 
                    value={quantity}
                    onChange={onChangeQuantity}
                />
            </div>
            <div style={{ marginRight: '16px' }}>
                <CriteriaSelection 
                    value={type}
                    onChange={onChangeType}
                />
            </div>
        </div>
    );
}
