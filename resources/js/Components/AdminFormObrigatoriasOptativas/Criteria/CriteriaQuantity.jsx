import { TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const QuantityBox = styled(Box)({
  
  '& .MuiOutlinedInput-root': {
    width: '297px',
    height: '32px',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    padding: '10px 12px',
    border: '2px solid var(--texto-noturno, #FFFFFF)'
  },
  
  '& fieldset': {
      border: 'none',
  },
    
});

const QuantityBoxText = styled(TextField)({

  "& .MuiInputBase-input": {
    fontSize: "11px",
    color: "#424242",
    fontFamily: "Rubik, sans-serif",
  },

  "& .MuiInputLabel-root": {
    fontSize: "11px",
    color: "#424242",
    fontFamily: "Rubik, sans-serif",
    top: "-25%",
    transition: "opacity 0.3s ease-out",
  },

    // Aqui ainda há o problema de o label subir na animação,
    // por isso deixei sem
  "& .MuiInputLabel-shrink": {
    transition: "none", 
    opacity: 0,
  },

});

// Adicionar style do botão de subir ou descer (vai deixar?)


export default function CriteriaQuantity({ quantity, onChangeQuantity }) {
    return (
      <QuantityBox
        component="form"
        noValidate
        autoComplete="off"
      >
        <QuantityBoxText
          id="outlined-number"
          label="Quantidade..."
          type="number"
          value={quantity}
          onChange={onChangeQuantity}
        />
      </QuantityBox>
    );
  } 

