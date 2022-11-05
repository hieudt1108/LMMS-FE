import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Level } from '../types/level';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { updateLevel } from '../../dataProvider/agent.js';

type LevelDialogProps = {
  onClose: () => void;
  onUpdate: (level: Level) => void;
  open: boolean;
  processing: boolean;
  level?: Level;
};

const LevelDialog = ({
  onClose,
  onUpdate,
  open,
  processing,
  level,
}: LevelDialogProps) => {
  const { t } = useTranslation();
  const editMode = Boolean(level && level.id);

  const handleSubmit = (values: Partial<Level>) => {
    if (level && level.id) {
      onUpdate({ ...values, id: level.id } as Level);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: level ? level.id : '',
      name: level ? level.name : '',
      description: level ? level.description : '',
    },
    validationSchema: Yup.object({
      programName: Yup.string()
        .max(20, t('common.validations.max', { size: 20 }))
        .required(t('common.validations.required')),
      description: Yup.string()
        .max(30, t('common.validations.max', { size: 30 }))
        .required(t('common.validations.required')),
    }),
    onSubmit: handleSubmit,
  });

  const [levelData, setLevelData] = useState(formik.initialValues);
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
  async function handleUpdateLevel(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await updateLevel(formik.values.id, {
      name: formik.values.name,
      description: formik.values.description,
    });

    if (res.status < 400) {
      onClose();
      notify('success', 'Cập nhật cấp học thành công');
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
        <form onSubmit={handleUpdateLevel} noValidate>
          <DialogTitle id='program-dialog-title'>
            {t('level.modal.edit.title')}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4} sx={{ mt: 3.5 }}>
                  <Typography component='div' variant='h6'>
                    Mã cấp học<span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    margin='normal'
                    disabled
                    fullWidth
                    id='outlined-disabled'
                    label={t('level.form.id.label')}
                    name='id'
                    autoComplete='family-name'
                    value={formik.values.id}
                    onChange={formik.handleChange}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
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
              {editMode
                ? t('level.modal.edit.action')
                : t('level.modal.add.action')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default LevelDialog;
