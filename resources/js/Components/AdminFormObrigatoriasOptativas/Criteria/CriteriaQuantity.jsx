/* CriteriaQuantity is the component for selecting the quantity of a criteria */


import { TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';


/* Styling of the quantity selection box */
const QuantityBox = styled(Box)({
  
  // Input field with and outlined style, where the input box is surrounded by a border
  '& .MuiOutlinedInput-root': {
    width: '297px',
    height: '32px',
    padding: '10px 12px',
    border: '2px solid var(--texto-noturno, #FFFFFF)',
    borderRadius: '16px',
    backgroundColor: 'transparent',
  },
  
  // Removes the border of the input field
  '& fieldset': {
      border: 'none',
  },
    
});

/* Styling of the quantity selection box text */
const QuantityBoxText = styled(TextField)(({ theme }) => ({

  // Styles for the input field
  "& .MuiInputBase-input": {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.p,
    color: "#424242",
  },

  // Styles for the label of the input field
  "& .MuiInputLabel-root": {
    fontFamily: theme.typography.fontFamily,
    ...theme.typography.p,
    color: "#424242",
    top: "-25%",
    transition: "opacity 0.3s ease-out",
  },

  // Styles for when the input field is focused
  "& .MuiInputLabel-shrink": {
    transition: "none", 
    opacity: 0,
  },
}));

const CriteriaQuantity = ({ quantity, onChangeQuantity }) => {
  
  return (
    <QuantityBox component="form" noValidate autoComplete="off">
      <QuantityBoxText id="outlined-number" label="Quantidade..." type="number"
        value={quantity}
        onChange={onChangeQuantity}
      />
    </QuantityBox>
  );

};

export default CriteriaQuantity;

