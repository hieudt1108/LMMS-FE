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
import React, { useState, useEffect } from 'react';
import { createGrade } from '../../dataProvider/agent.js';


type GradeDialogProps = {
  onAdd: (grade: Partial<Grade>) => void;
  onClose: () => void;
  onUpdate: (grade: Grade) => void;
  open: boolean;
  processing: boolean;
  grade?: Grade;
};

const GradeDialog = ({
  onAdd,
  onClose,
  onUpdate,
  open,
  processing,
  grade,
}: GradeDialogProps) => {
  const { t } = useTranslation();

  const initGrade = {
    name: '',
    description: '',
  };

  const [gradeData, setGradeData] = useState(initGrade);

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
  async function handleCreateGrade(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await createGrade(gradeData);
    if (res.status < 400) {
      onClose();
      notify('success', 'Thêm khối học thành công');
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
        <form onSubmit={handleCreateGrade} noValidate>
          <DialogTitle id='program-dialog-title'>
            {t('programManagement.modal.add.title')}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ flexGrow: 1 }}>
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
                    value={gradeData.name}
                    onChange={(e) =>
                      setGradeData({ ...gradeData, name: e.target.value })
                    }
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
                    value={gradeData.description}
                    onChange={(e) =>
                      setGradeData({
                        ...gradeData,
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
              {t('userManagement.modal.add.action')}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default GradeDialog;
