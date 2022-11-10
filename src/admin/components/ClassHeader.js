import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  InputBase,
  Stack,
  Chip,
  OutlinedInput,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import CreateIcon from '@mui/icons-material/Create';
import React, { Fragment, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { Alert, IconButton, Modal, Paper, TextField } from '@mui/material';
import { LoadingButton } from '@material-ui/lab';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ClassHeader = ({
  createClass,
  grade,
  program,
  grades,
  programs,
  handleGradeChange,
  handleProgramChange,
  handleSearchChange,
  handleCreateClassChange,
  handleSubmitCreateClass,
}) => {
  console.log('ClassHeader data: ', createClass);
  const { t } = useTranslation();
  const [toggleCreateClass, setToggleCreateClass] = React.useState(false);
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleToggleCreateClass = useCallback((value) => {
    setToggleCreateClass(value);
  }, []);

  const renderMenuItem = useCallback((item) => {
    if (item && item.length) {
      return item.map((obj, index) => (
        <MenuItem value={obj} key={index}>
          {obj.name}
        </MenuItem>
      ));
    }
    return (
      <MenuItem>
        <Alert severity='error'>This is an error !</Alert>
      </MenuItem>
    );
  });

  const renderYearPicker = useCallback(() => {
    let years = [];
    for (
      let i = new Date().getFullYear() - 5;
      i < new Date().getFullYear() + 5;
      i++
    ) {
      years.push(`${i}-${i + 1}`);
    }
    console.log('renderYearPicker', years);
    return years.map((element, index) => (
      <MenuItem value={element} key={index}>
        {element}
      </MenuItem>
    ));
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
                    {renderMenuItem(grades)}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 175, ml: 1 }} size='small'>
                  <InputLabel id='demo-simple-select-helper-label'>
                    Chương trình Học
                  </InputLabel>
                  <Select
                    id='demo-simple-select-helper'
                    value={program}
                    label='Chương trình Học'
                    onChange={handleProgramChange}
                  >
                    {renderMenuItem(programs)}
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
          spacing={0.5}
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

                <Stack
                  sx={{ mt: 5 }}
                  direction='row'
                  align='center'
                  justifyContent='center'
                >
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
                        value={createClass.code}
                        onChange={handleCreateClassChange}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Typography>Tên</Typography>

                      <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='name'
                        label={'Tên Lớp'}
                        name='name'
                        autoFocus
                        value={createClass.name}
                        onChange={handleCreateClassChange}
                      />
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <Typography>Sĩ số</Typography>
                      <TextField
                        type='number'
                        margin='normal'
                        required
                        id='size'
                        label={'Sĩ số'}
                        name='size'
                        value={createClass.size}
                        onChange={handleCreateClassChange}
                      />
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <Typography>Năm Học</Typography>
                      <TextField
                        margin='normal'
                        sx={{ margin: '16px 0 8px 0' }}
                        name='schoolYear'
                        fullWidth
                        required
                        select
                        label={'Năm học'}
                        value={createClass.schoolYear}
                        onChange={handleCreateClassChange}
                      >
                        {renderYearPicker()}
                      </TextField>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <Typography>Giáo viên chủ nhiệm</Typography>
                      <Select
                        sx={{ margin: '16px 0 8px 0' }}
                        fullWidth
                        multiple
                        name='teacher'
                        value={createClass.teacher}
                        onChange={handleCreateClassChange}
                        input={
                          <OutlinedInput
                            sx={{ backgroundColor: 'rgba(255,255,255,)' }}
                            label='Chủ Nhiệm'
                          />
                        }
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <Typography>Khối</Typography>
                      <TextField
                        margin='normal'
                        required
                        fullWidth
                        select
                        name='grade'
                        label={'Khối'}
                        value={createClass.grade}
                        onChange={handleCreateClassChange}
                      >
                        {renderMenuItem(grades)}
                      </TextField>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <Typography>Chương Trình Học</Typography>
                      <TextField
                        margin='normal'
                        fullWidth
                        name='program'
                        required
                        select
                        label={'Chương Trình Học'}
                        value={createClass.program}
                        onChange={handleCreateClassChange}
                      >
                        {renderMenuItem(programs)}
                      </TextField>
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
                    onClick={handleSubmitCreateClass}
                  >
                    Tạo Lớp
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
