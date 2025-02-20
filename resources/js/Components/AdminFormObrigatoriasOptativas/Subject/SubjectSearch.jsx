import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

const SubjectBox = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    width: "297px",
    height: "32px",
    borderRadius: "16px",
    backgroundColor: "transparent",
    padding: "10px 12px",
    border: "2px solid var(--texto-noturno, #FFFFFF)",
  },

  "& fieldset": {
    border: "none",
  },
});

const SubjectBoxText = styled(TextField)({
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

  "& .MuiInputLabel-shrink": {
    transition: "none",
    opacity: 0,
  },
});

const SubjectBoxOptions = {
  fontSize: "11px",
  color: "white",
  fontFamily: "Rubik, sans-serif",
  backgroundColor: "#333",
  "& .MuiAutocomplete-option": {
    "&:hover": {
      backgroundColor: "#555",
    },
    '&[aria-selected="true"]': {
      backgroundColor: "#777",
    },
  },
};

const options = [
  { label: "MAC0121", id: 1 },
  { label: "MAC0323", id: 2 },
  { label: "MAC0105", id: 3 },
];

export default function SubjectSearch({ onSelectSubject }) {
  return (
    <SubjectBox
      id="search-subject"
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => {
        if (value) {
          onSelectSubject(value.label); // Passa apenas o texto da disciplina
        }
      }}
      renderInput={(params) => <SubjectBoxText {...params} label="Pesquisar" />}
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
        paper: { sx: SubjectBoxOptions },
      }}
    />
  );
}
