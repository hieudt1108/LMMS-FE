import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Program } from '../types/program';
import {
  Box,
  CardContent,
  Grid,
  Typography,
  InputBase,
} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
import { createProgram } from '../../dataProvider/agent.js';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

type ProgramDialogProps = {
  onAdd: (user: Partial<Program>) => void;
  onClose: () => void;
  onUpdate: (program: Program) => void;
  open: boolean;
  processing: boolean;
  program?: Program;
};

const ProgramDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  program,
}: ProgramDialogProps) => {
  const { t } = useTranslation();
  const editMode = Boolean(program && program.id);

  const initProgram = {
    name: '',
    description: '',
  };

  const [programData, setProgramData] = useState(initProgram);
  function notify(type: string, text: string) {
    if (type === 'success') {
      toast.success(text, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(text, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  async function handleCreateProgram(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await createProgram(programData);

    if (res.status < 400) {
      onClose();
      notify('success', 'Thêm chương trình học thành công');
    } else {
      onClose();
      notify('error', 'Thất bại...');
    }
    console.log('data: ', res);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='program-dialog-title'
        maxWidth={'md'}
        fullWidth={true}
      >
        <form onSubmit={handleCreateProgram} noValidate>
          <DialogTitle id='program-dialog-title'>
            {editMode
              ? t('programManagement.modal.edit.title')
              : t('programManagement.modal.add.title')}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4} sx={{ mt: 3.5 }}>
                  <Typography component='div' variant='h6'>
                    Tên chương trình học<span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label={t('programManagement.form.name.label')}
                    name='name'
                    autoComplete='family-name'
                    autoFocus
                    value={programData.name}
                    onChange={(e) =>
                      setProgramData({ ...programData, name: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4} sx={{ mt: 3.5 }}>
                  <Typography component='div' variant='h6'>
                    Mô tả chương trình học
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='description'
                    label={t('programManagement.form.description.title')}
                    name='description'
                    autoComplete='family-name'
                    autoFocus
                    value={programData.description}
                    onChange={(e) =>
                      setProgramData({
                        ...programData,
                        description: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4} sx={{ mt: 3.5 }}>
                  <Typography component='div' variant='h6'>
                    Vô hiệu hóa
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControlLabel
                    control={<Android12Switch defaultChecked />}
                    label=''
                    sx={{ mt: 3 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>{t('common.cancel')}</Button>
            <LoadingButton
              loading={processing}
              type='submit'
              variant='contained'
            >
              {editMode
                ? t('userManagement.modal.edit.action')
                : t('userManagement.modal.add.action')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProgramDialog;
