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
import { Level } from '../types/level';
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
import { createLevel } from '../../dataProvider/agent.js';

type LevelDialogProps = {
  onAdd: (level: Partial<Level>) => void;
  onClose: () => void;
  onUpdate: (level: Level) => void;
  open: boolean;
  processing: boolean;
  level?: Level;
};

const LevelDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  level,
}: LevelDialogProps) => {
  const { t } = useTranslation();

  const initLevel = {
    name: '',
    description: '',
    levelProgram: [],
  };

  const [levelData, setLevelData] = useState(initLevel);
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
  async function handleCreateLevel(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await createLevel(levelData);
    if (res.status < 400) {
      onClose();
      notify('success', 'Thêm cấp học thành công');
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
        <form onSubmit={handleCreateLevel} noValidate>
          <DialogTitle id='program-dialog-title'>
            {t('level.modal.add.title')}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4} sx={{ mt: 3.5 }}>
                  <Typography component='div' variant='h6'>
                    Tên cấp học<span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='name'
                    label={t('level.form.name.label')}
                    name='name'
                    autoComplete='family-name'
                    autoFocus
                    value={levelData.name}
                    onChange={(e) =>
                      setLevelData({ ...levelData, name: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4} sx={{ mt: 3.5 }}>
                  <Typography component='div' variant='h6'>
                    Mô tả cấp học
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    margin='normal'
                    fullWidth
                    id='description'
                    label={t('level.form.description.title')}
                    name='description'
                    autoComplete='family-name'
                    autoFocus
                    value={levelData.description}
                    onChange={(e) =>
                      setLevelData({
                        ...levelData,
                        description: e.target.value,
                      })
                    }
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
              {t('level.modal.add.action')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default LevelDialog;
