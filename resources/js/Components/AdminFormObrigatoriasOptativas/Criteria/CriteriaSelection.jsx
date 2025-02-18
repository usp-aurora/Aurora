import { Autocomplete, TextField  } from '@mui/material';
import { styled } from '@mui/material/styles';

const SelectionBox = styled(Autocomplete)({
  
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

const SelectionBoxText = styled(TextField)({

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

// Ainda sem especificações para essa janela...
// Configurações temporárias
const SelectionBoxOptions = {
  fontSize: "11px",
  color: "#424242",
  fontFamily: "Rubik, sans-serif",
  backgroundColor: '#333', 
  color: '#fff', 
  '& .MuiAutocomplete-option': {
    '&:hover': {
      backgroundColor: '#555',
    },
    '&[aria-selected="true"]': {
      backgroundColor: '#777',
    },
  },
};

// Adicionar layout do botão de opções

const options = [
    { label: 'Créditos', id: 1 },
    { label: 'Disciplinas', id: 2 },
    { label: 'Módulos', id: 3 },
];

export default function CriteriaSelection({ type, onChangeType }) {
  return (
    <SelectionBox
      disablePortal
      options={options}
      value={type}
      onChange={(event, newValue) => onChangeType(newValue)}
      renderInput={(params) => <SelectionBoxText {...params} label="Selecione..." />}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'window',
              },
            },
          ],
        },
        paper: { sx: SelectionBoxOptions },
      }}
    />
  );
}