import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import {
  Box,
  CardContent,
  Grid,
  Typography,
  InputBase,
  Modal,
  IconButton,
  Paper,
} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { User } from '../../users/types/user';

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

type ClassDialogProps = {
  onClose: () => void;
  open: boolean;
};

const ClassDialog = ({ onClose, open }: ClassDialogProps) => {
  const { t } = useTranslation();

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

  return (
    <Stack
      spacing={2}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      mt={2}
    >
      <div>
        <Modal
          open={open}
          onClose={onClose}
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
                  onClick={onClose}
                  type='submit'
                  variant='contained'
                >
                  {t('common.add')}
                </LoadingButton>
              </Grid>
            </Stack>

            <Grid sx={{ mt: 3, mr: 5, mb: 2 }} style={{ float: 'right' }}>
              <Button onClick={onClose}>{t('common.return')}</Button>
              <LoadingButton
                sx={{ ml: 2 }}
                onClick={onClose}
                type='submit'
                variant='contained'
              >
                {t('common.createClass')}
              </LoadingButton>
            </Grid>
          </Box>
        </Modal>
      </div>
    </Stack>
  );
};

export default ClassDialog;
