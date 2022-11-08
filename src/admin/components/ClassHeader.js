import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  InputBase,
  Stack,
} from '@material-ui/core';
import CreateIcon from '@mui/icons-material/Create';
import React, { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Alert, IconButton, Modal, Paper, TextField } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';
import { useNavigate } from 'react-router';
import { ROUTER } from '../../Router';

const ClassHeader = ({
  grade,
  program,
  grades,
  programs,
  handleGradeChange,
  handleProgramChange,
  handleSearchChange,
}) => {
  console.log('ClassHeader data: ', grade, program, grades, programs);
  const { t } = useTranslation();
  const [toggleCreateClass, setToggleCreateClass] = React.useState(false);

  const handleToggleCreateClass = useCallback(() => {
    setToggleCreateClass(toggleCreateClass ? false : true);
  }, []);

  return (
    <Fragment>
      <Card sx={{ boxShadow: '-8px 0 0 -4px #747af2' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box marginBottom={2}>
                <Typography variant='h2' color='GrayText'>
                  Danh sách lớp học
                </Typography>
              </Box>
              <Stack direction='row'>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    onChange={handleSearchChange}
                    placeholder='Tìm kiếm người dùng'
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>

                <FormControl sx={{ minWidth: 120 }} size='small'>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Khối
                  </InputLabel>
                  <Select
                    id='demo-simple-select-helper'
                    value={grade}
                    label='Khối'
                    onChange={handleGradeChange}
                  >
                    {grades && grades.length ? (
                      grades.map((obj, index) => (
                        <MenuItem value={obj} key={index + 1}>
                          {obj.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        <Alert severity='error'>This is an error !</Alert>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150, ml: 1 }} size='small'>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Chương trình Học
                  </InputLabel>
                  <Select
                    id='demo-simple-select-helper'
                    value={program}
                    label='Chương trình Học'
                    onChange={handleProgramChange}
                  >
                    {programs && programs.length ? (
                      programs.map((obj, index) => (
                        <MenuItem value={obj} key={index}>
                          {obj.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>
                        <Alert severity='error'>This is an error !</Alert>
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid
              style={{ placeSelf: 'flex-end' }}
              sx={{ mt: 5 }}
              item
              xs={12}
              md={6}
            >
              <Grid container justifyContent='flex-end'>
                <Button
                  className='button'
                  startIcon={<CreateIcon fontSize='small' />}
                  onClick={() => handleToggleCreateClass(true)}
                >
                  Tạo lớp học
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {toggleCreateClass && (
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mt={2}
        >
          <div>
            <Modal
              open={toggleCreateClass}
              onClose={() => handleToggleCreateClass(false)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <BoxCreateClass>
                <Typography
                  style={{
                    fontSize: 25,
                  }}
                  sx={{ mt: 2, display: 'left', fontWeight: 'bold' }}
                >
                  Tạo lớp học mới
                </Typography>

                <Stack sx={{ mt: 5 }} direction='row' spacing={2}>
                  <Grid
                    sx={{ ml: 5, mr: 5 }}
                    item
                    md={12}
                    container
                    spacing={2}
                  >
                    <Grid item md={2} xs={12}>
                      <Typography>Mã</Typography>
                      <TextField
                        margin='normal'
                        required
                        id='code'
                        label={'Mã lớp'}
                        name='code'
                        autoFocus
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Typography>Tên</Typography>
                      <TextField
                        margin='normal'
                        required
                        id='name'
                        label={'Tên Lớp'}
                        name='name'
                        autoFocus
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <Typography>Khối</Typography>
                      <TextField
                        margin='normal'
                        required
                        id='level'
                        // disabled={processing}
                        fullWidth
                        select
                        label={'Khối'}
                        name='level'
                      >
                        {grades && grades.length ? (
                          grades.map((obj, index) => (
                            <MenuItem value={obj.id} key={index}>
                              {obj.name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={20}>
                            <Alert severity='error'>This is an error !</Alert>
                          </MenuItem>
                        )}
                      </TextField>
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <Typography>Sĩ số</Typography>
                      <TextField
                        margin='normal'
                        required
                        id='size'
                        label={'Sĩ số'}
                        name='size'
                      />
                    </Grid>
                  </Grid>
                </Stack>

                <Grid sx={{ mt: 3, mr: 5, mb: 2 }} style={{ float: 'right' }}>
                  <Button onClick={() => handleToggleCreateClass(false)}>
                    {t('common.return')}
                  </Button>
                  <LoadingButton
                    sx={{ ml: 2 }}
                    type='submit'
                    variant='contained'
                    onClick={() => handleToggleCreateClass(false)}
                  >
                    {t('common.createClass')}
                  </LoadingButton>
                </Grid>
              </BoxCreateClass>
            </Modal>
          </div>
        </Stack>
      )}
    </Fragment>
  );
};

let Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 'none',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    width: 'auto',
  },
}));

let BoxCreateClass = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#263238' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 'auto',
  height: 'auto',
  transform: 'translate(-50%, -50%)',
}));

let SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

let StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  border: '1px solid #3F435C',
  borderRadius: '12px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 0.6, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export default ClassHeader;
