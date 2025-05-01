import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";

import { useEffect, useState } from "react";
import axios from "axios";

const SubjectBox = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    width: "100%",
    maxwidth: "824px",
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


export default function SubjectSearch({ onSelectSubject }) {
  
  // options -> variável que armazena as matérias disponíveis (inicialmente vazia)
  // setOptions -> função que atualiza a variável options
  const [options, setOptions] = useState([]);

  // Atualiza options com as matérias (label e id)
  useEffect(() => {
    axios.get("/subjects")
      .then((res) => {
        const subjects = res.data.map((subject) => ({
          label: subject.name, 
          id: subject.subject_code,
        }));
        setOptions(subjects);
      })
      .catch((err) => {
        console.error("Erro ao buscar matérias:", err);
      });
  }, []);
  

  return (
    <SubjectBox
      id="search-subject"
      options={options}
      getOptionLabel={(option) => option.id + " - " + option.label}
      onChange={(event, value) => {
        if (value) {
          onSelectSubject(value.id + " - " + value.label);
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
