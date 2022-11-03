import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from '@material-ui/core';
import PrimarySchool from '../../core/components/PrimarySchool';
import SecondarySchool from '../../core/components/SecondarySchool';
import {getAllLevel} from '../../dataProvider/agent'
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
interface FilmOptionType {
  title: string;
}

const Subsystem = ['Cấp 1', 'Cấp 2'];
export default function HeaderSubsystem() {
  const [value, setValue] = React.useState<string | null>('');
  const [level, setLevel] = React.useState<any[]>([]);
    React.useEffect(() => {
        fetchLevel();
    }, []);

    async function fetchLevel() {
        const res = await getAllLevel();
        if (res.status < 400) {
            setLevel(res.data.data);
        } else {
            console.log('error fetch api');
        }
    }

  return (
    <React.Fragment>
      <Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Card sx={{ mb: 2,boxShadow: '-8px 0 0 -4px #747af2' }}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
            <FormControl sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="demo-simple-select-helper-label">Cấp học</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    label="Cấp học"
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                >
                    <MenuItem value={'Tất Cả'}>
                        Tất Cả
                    </MenuItem>
                    {level?.map((l) => (
                        <MenuItem value={l.name} key={l.id}>
                            {l.name}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>

            </CardContent>
          </Card>
          <Card></Card>
        </Grid>
        <Grid container spacing={2}>
          {value === null || value === '' || value === 'Tất Cả' ? (
            <>
              <PrimarySchool />
              <SecondarySchool />
            </>
          ) : value === 'Tiểu Học' ? (
            <PrimarySchool />
          ) : (
            <SecondarySchool />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
