import { TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const QuantityBox = styled(Box)({
  
  '& .MuiOutlinedInput-root': {
    //width: '100%',
    width: '297px',
    height: '32px',
    borderRadius: '16px',
    backgroundColor: 'transparent',
    border: '2px solid var(--texto-noturno, #FFFFFF)',
    padding: '10px 12px'
  },
  
  '& fieldset': {
      border: 'none',
  },
    
});


const QuantityBoxText = styled(TextField)(({ theme }) => ({

  "& .MuiInputBase-input": {
    ...theme.typography.p,
    fontFamily: theme.typography.fontFamily,
    color: "#424242",
  },

  "& .MuiInputLabel-root": {
    ...theme.typography.p,
    fontFamily: theme.typography.fontFamily,
    color: "#424242",
    top: "-25%",
    transition: "opacity 0.3s ease-out",
  },

    // Aqui ainda há o problema de o label subir na animação,
    // por isso deixei sem
  "& .MuiInputLabel-shrink": {
    transition: "none", 
    opacity: 0,
  },

}));


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

