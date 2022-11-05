import * as React from 'react';
import Box from '@mui/material/Box';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Document() {
  const [value, setValue] = React.useState('');
  return (
    <React.Fragment>
      <Box sx={{ background: '#fff', borderRadius: '12px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }} p={3}>
          <FilterAltOutlinedIcon color='primary' />
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id='demo-simple-select-helper-label'>Lớp</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={value}
              label='class'
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <MenuItem value={'Tất Cả'}>Tất cả</MenuItem>
              <MenuItem value={value}>Lớp 1</MenuItem>
              <MenuItem value={value}>Lớp 2</MenuItem>
              <MenuItem value={value}>Lớp 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id='demo-simple-select-helper-label'>
              Chương trình học
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={value}
              label='class'
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <MenuItem value={'Tất Cả'}>Tất cả</MenuItem>
              <MenuItem value={value}>Hệ thường</MenuItem>
              <MenuItem value={value}>Song ngữ</MenuItem>
              <MenuItem value={value}>Chất lượng cao</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id='demo-simple-select-helper-label'>
              Môn học
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={value}
              label='class'
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <MenuItem value={'Tất Cả'}>Tất cả</MenuItem>
              <MenuItem value={value}>Toán</MenuItem>
              <MenuItem value={value}>Lý</MenuItem>
              <MenuItem value={value}>Hoá</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ borderTop: '1px solid #EEEEEE', display: 'flex' }} p={3}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <Item>xs=6 md=8</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>xs=6 md=8</Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
