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
import { Grade } from '../types/grade';
import {
  Box,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import {updateGrade} from '../../dataProvider/agent.js';


type GradeDialogProps = {
  onClose: () => void;
  onUpdate: (grade: Grade) => void;
  open: boolean;
  processing: boolean;
  grade?: Grade;
};

const GradeDialog = ({
  onClose,
  onUpdate,
  open,
  processing,
  grade,
}: GradeDialogProps) => {
  const { t } = useTranslation();
  const editMode = Boolean(grade && grade.id);

  const handleSubmit = (values: Partial<Grade>) => {
    if (grade && grade.id) {
      onUpdate({ ...values, id: grade.id } as Grade);
    }
  };

  const formik = useFormik({
    initialValues: {
      id : grade ? grade.id : '',
      name: grade ? grade.name : '',
      description: grade ? grade.description : '',
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


  const [gradeData, setGradeData] = useState(formik.initialValues);
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
  async function handleUpdateGrade(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await updateGrade(formik.values.id, { name: formik.values.name, description: formik.values.description });

    if (res.status < 400) {
      onClose();
      notify('success', 'Cập nhật khối học thành công');
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
        <form onSubmit={handleUpdateGrade} noValidate>
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
                    Mã khối học<span style={{ color: 'red' }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                      margin='normal'
                      disabled
                      fullWidth
                      id="outlined-disabled"
                      label={t('programManagement.form.id.label')}
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
                    Tên khối học<span style={{ color: 'red' }}>*</span>
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
                    Mô tả khối học
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
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
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

export default GradeDialog;
