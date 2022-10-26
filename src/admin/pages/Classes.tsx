import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
import ClassCart from '../components/ClassCart';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

import { ClassSelect } from '../components/ClassSelect';
import { IconButton, Modal, Paper, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { experimentalStyled as styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const levels = [
  'Khối 1',
  'Khối 2',
  'Khối 3',
  'Khối 4',
  'Khối 5',
  'Khối 6',
  'Khối 7',
  'Khối 8',
  'Khối 9',
];

const Classes = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>('');

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Box = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#263238' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: 'auto',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
  }));

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      {/* <AdminAppBar>
        <AdminToolbar title={t("classes.title")} />
      </AdminAppBar> */}

      <Stack
        spacing={2}
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mt={2}
      >
        <div>
          <Button variant='outlined' onClick={handleClickOpen}>
            {t('classes.create')}
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box>
              <Typography
                style={{
                  fontSize: 25,
                }}
                sx={{ mt: 2, display: 'left', fontWeight: 'bold' }}
              >
                Tạo lớp học mới
              </Typography>

              <Stack sx={{ mt: 5 }} direction='row' spacing={2}>
                <Grid sx={{ ml: 5, mr: 5 }} item md={12} container spacing={2}>
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
                      {levels.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
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
                  <Grid item md={1} xs={12}>
                    <Typography>Xóa</Typography>
                    <IconButton sx={{ mt: 3 }}>
                      <DeleteIcon style={{ color: 'gray' }} />
                    </IconButton>
                  </Grid>
                  <LoadingButton
                    sx={{ ml: 2, mt: 3 }}
                    style={{ float: 'left' }}
                    onClick={handleClose}
                    type='submit'
                    variant='contained'
                  >
                    {t('common.add')}
                  </LoadingButton>
                </Grid>
              </Stack>

              <Grid sx={{ mt: 3, mr: 5, mb: 2 }} style={{ float: 'right' }}>
                <Button onClick={handleClose}>{t('common.return')}</Button>
                <LoadingButton
                  sx={{ ml: 2 }}
                  onClick={handleClose}
                  type='submit'
                  variant='contained'
                >
                  {t('common.createclass')}
                </LoadingButton>
              </Grid>
            </Box>
          </Modal>
        </div>
        <Stack spacing={2} direction='row' alignItems='center' mt={2}>
          <ClassSelect></ClassSelect>
        </Stack>
      </Stack>

      <Stack spacing={2} direction='row' alignItems='center' mt={2}>
        <Grid container spacing={2}>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
        </Grid>
      </Stack>

      <Stack
        spacing={2}
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        mt={2}
      >
        <Pagination count={10} color='secondary' size='large' />
      </Stack>
    </React.Fragment>
  );
};

export default Classes;
