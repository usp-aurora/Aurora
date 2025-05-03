/* CriteriaSelection is the component for selecting the criteria*/


import { Autocomplete, TextField  } from '@mui/material';
import { styled } from '@mui/material/styles';


/* Styling of the criteria selection box */
const SelectionBox = styled(Autocomplete)({
  
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


/* Styling of the criteria selection box text */
const SelectionBoxText = styled(TextField)({

  // Styles for the input field
  "& .MuiInputBase-input": {
    fontFamily: "Rubik, sans-serif",
    fontSize: "11px",
    color: "#424242",
  },

  // Styles for the label of the input field
  "& .MuiInputLabel-root": {
    fontFamily: "Rubik, sans-serif",
    fontSize: "11px",
    color: "#424242",
    top: "-25%",
    transition: "opacity 0.3s ease-out",
  },

  // Styles for when the input field is focused
  "& .MuiInputLabel-shrink": {
    transition: "none", 
    opacity: 0,
  },

});


/* Styling of the criteria selection box options */
const SelectionBoxOptions = {

  fontFamily: "Rubik, sans-serif",
  fontSize: "11px",
  color: "white",
  backgroundColor: "#333",

  // Styles for the options in the dropdown
  "& .MuiAutocomplete-option": {
    "&:hover": {
      backgroundColor: "#555",
    },
    '&[aria-selected="true"]': {
      backgroundColor: '#777',
    },
  },
};


/* Criteria options for the selection box */
const options = [
    { label: 'Créditos', id: 1 },
    { label: 'Disciplinas', id: 2 },
    { label: 'Blocos', id: 3 },
];


/* CriteriaSelection component */
const CriteriaSelection = ({ type, onChangeType }) => (

  <SelectionBox disablePortal options={options} value={type}

    // The label of the option that will be displayed in the dropdown
    getOptionLabel={(option) => option.label} 

    // Defines the comparison between the option and the selected value
    isOptionEqualToValue={(option, value) => option.id === value?.id} 

    // What happens when the user selects an option
    onChange={(_, newValue) => onChangeType?.(newValue)}

    // Defines the input field
    renderInput={(params) => <SelectionBoxText {...params} label="Selecione..." />}

    // Definitions for the dropdown
    slotProps={{
      popper: {
        modifiers: [{
          name: 'preventOverflow',
          options: { boundary: 'window', },
        },],
      },
      paper: { sx: SelectionBoxOptions },
    }}
  />
);

export default CriteriaSelection;
