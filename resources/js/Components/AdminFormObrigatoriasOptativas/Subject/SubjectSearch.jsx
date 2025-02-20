import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [
  { label: 'MAC0121', id: 1 },
  { label: 'MAC0323', id: 2 },
  { label: 'MAC0105', id: 3 },
];

export default function SubjectItem({ subject, onChangeSubject }) {
  return (
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pesquisar"
            value={subject}
            onChange={onChangeSubject}
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
              },
            }}
          />
        )}
      />
  );
}

