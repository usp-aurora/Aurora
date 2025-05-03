/* SubjectSearch is the forms component that allows the selection of subjects */


import * as React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";


/* Styling of the search component */
const SubjectBox = styled(Autocomplete)({
  
  // Input field with and outlined style, where the input box is surrounded by a border
  "& .MuiOutlinedInput-root": {
    width: "100%",
    maxWidth: "824px",
    height: "32px",
    padding: "10px 12px",
    border: "2px solid var(--texto-noturno, #FFFFFF)",
    borderRadius: "16px",
    backgroundColor: "transparent",
  },

  // Removes the border of the input field
  "& fieldset": {
    border: "none",
  },
});


/* Styling of the search component text */
const SubjectBoxText = styled(TextField)({
  
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


/* Styling of the search component box of options*/
const SubjectBoxOptions = {

  fontFamily: "Rubik, sans-serif",
  fontSize: "11px",
  color: "white",
  backgroundColor: "#333",

  // Styles for the options in the dropdown
  "& .MuiAutocomplete-option": {
    "&:hover": {
      backgroundColor: "#555",
    },
  },

};


/* SubjectSearch component */
const SubjectSearch = ({ onSelectSubject }) => {

  // Variable to store the options and the function to update it
  const [options, setOptions] = useState([]);

  // Updates the options with the subjects available
  useEffect(() => {

    axios.get("/subjects")
    
    .then((res) => {
      const subjects = res.data.map((subject) => ({
        code: subject.code,
        name: subject.name, 
        syllabus: subject.syllabus,
        lecture_credits: subject.lecture_credits,
        work_credits: subject.work_credits,
      }));
      setOptions(subjects);
    })

    .catch((error) => {
      console.error("Error fetching subjects:", error);
    });

  }, []);
  

  return (
      
    <SubjectBox id="search-subject" options={options} 

      // Defines how the options are displayed in the dropdown
      getOptionLabel={(option) => option.code + " - " + option.name}

      // What happens when an option is selected
      onChange={(_, option) => { onSelectSubject(option); }}

      // Defines the input field
      renderInput={(params) => <SubjectBoxText {...params} label="Pesquisar" />}
      
      // Definitions for the dropdown
      slotProps={{
        popper: {
          modifiers: [{
            name: 'preventOverflow',
            options: { boundary: 'window', },
          },],
        },
        paper: { sx: SubjectBoxOptions },
      }}
    />
  );
}

export default SubjectSearch;
