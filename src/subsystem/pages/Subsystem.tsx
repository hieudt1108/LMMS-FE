import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@material-ui/core';

const GradeLevel = () => [{ label: 'Cấp 1' }, { label: 'Cấp 2' }];
const GradeLevelSub = () => [
  { label: 'Cấp 1' },
  { label: 'Cấp 2', year: 1972 },
];

export default function Subsystem() {
  return (
    <React.Fragment>
      <Box style={{ display: 'flex' }}>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={GradeLevel()}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Grade' />}
        />
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={GradeLevelSub()}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Grade' />}
        />
      </Box>
    </React.Fragment>
  );
}
