import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Button } from '@material-ui/core';
import { display } from '@mui/system';

export const ClassSelect = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  return (
    <React.Fragment>
      <Box sx={{ style: { display: 'flex' } }}>
        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={age}
            label='Age'
            onChange={handleChange}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>1A</MenuItem>
            <MenuItem value={20}>1B</MenuItem>
            <MenuItem value={30}>1C</MenuItem>
          </Select>

          <InputLabel id='demo-simple-select-helper-label'>CLASS</InputLabel>
        </FormControl>
        <Button variant='contained' component='label'>
          Upload
          <input hidden accept='image/*' multiple type='file' />
        </Button>
      </Box>
    </React.Fragment>
  );
};
