import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//Subject img
import Math from '../../Assets/Subjects/mathLogo.png';

const options = ['Toán', 'Văn', 'Anh', 'Lý', 'Hoá'];

export default function Headersubjetc() {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  return (
    <React.Fragment>
      <Card sx={{ boxShadow: '-8px 0 0 -4px #747af2', mb: 2 }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography component='div' variant='h4'>
              Đề cương học môn toán
            </Typography>
            <Typography variant='body2' color='textSecondary' component='div'>
              Chương trình: Hệ thường
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' color='textSecondary' component='div'>
              1. Listen and read.
            </Typography>
          </Box>
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id='controllable-states-demo'
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label='Subject' />}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
