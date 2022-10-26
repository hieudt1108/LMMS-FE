import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@material-ui/core';
import PrimarySchool from '../../core/components/PrimarySchool';
import SecondarySchool from '../../core/components/SecondarySchool';

interface FilmOptionType {
  title: string;
}

const Subsystem = ['Cấp 1', 'Cấp 2'];
export default function HeaderSubsystem() {
  const [value, setValue] = React.useState<string | null>(Subsystem[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <React.Fragment>
      <Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Card sx={{ mb: 2 }}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Autocomplete
                value={value}
                onChange={(event: any, newValue: string | null) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(
                  event: any,
                  newInputValue: React.SetStateAction<string>
                ) => {
                  setInputValue(newInputValue);
                }}
                id='controllable-states-demo'
                options={Subsystem}
                sx={{ width: 300 }}
                renderInput={(
                  params: JSX.IntrinsicAttributes & TextFieldProps
                ) => <TextField {...params} label='Khối cấp' />}
              />
            </CardContent>
          </Card>
          <Card></Card>
        </Grid>
        <Grid container spacing={2}>
          {value === null ? (
            <>
              <PrimarySchool />
              <SecondarySchool />
            </>
          ) : value === 'Cấp 1' ? (
            <PrimarySchool />
          ) : (
            <SecondarySchool />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
