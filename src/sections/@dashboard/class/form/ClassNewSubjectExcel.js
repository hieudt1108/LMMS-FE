import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, MenuItem, Button} from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProgramsRedux } from 'src/redux/slices/program';
import { getGradesRedux } from 'src/redux/slices/grade';

// API
import {
  createGrade,
  postClass,
  postFileExcelAddMember,
  postFileExcelAddSubject,
  updateClass,
  updateGrade
} from '../../../../dataProvider/agent';
import {Upload} from "../../../../components/upload";
import Iconify from "../../../../components/iconify";

// ----------------------------------------------------------------------

ClassNewSubjectExcel.propTypes = {
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
};

export default function ClassNewSubjectExcel({onNextStep,onBackStep,formData}) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [fileSubject, setFileSubject] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const formDataFileMember = new FormData();
  const formDataFileSubject = new FormData();
  const validationSchema = Yup.object().shape({
  })

  const defaultValues = useMemo(
      () => ({

      }),
      []
  );

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const handleDrop = (acceptedFiles) => {
    try {
      setValue(`fileSubject`, acceptedFiles[0]);
      setFileSubject(acceptedFiles[0]);
    } catch (error) {
      console.error('handleDrop', error);
    }
  };

  const handleRemoveFile = () => {
    setValue(`fileSubject`, '');
    setFileSubject('');

  };

  const onSubmit = async (data) => {
    const dataClass = {
      code: formData?.code,
      name: formData?.name,
      size: formData?.size,
      gradeId: formData?.gradeId,
      programId: formData?.programId,
      schoolYear: formData?.schoolYear,
    }
    const fileStudentExcel = formData?.file
    console.log('dataClass',dataClass)
    console.log('fileStudentExcel',fileStudentExcel)
    console.log('fileSubjectExcel',data.fileSubject)
      try {
        const res = await postClass(dataClass)
        console.log('postClass',res)
        if (res.status < 400) {
          try {
            formDataFileMember.append('file', fileStudentExcel);
            formDataFileSubject.append('file', data.fileSubject);
            const pushFileStudentExcel = await postFileExcelAddMember(res?.data.data.id,formDataFileMember)
            const pushFileSubjectExcel = await postFileExcelAddSubject(res?.data.data.id,formDataFileSubject)
            console.log('pushFileStudentExcel',pushFileStudentExcel)
            console.log('pushFileSubjectExcel',pushFileStudentExcel)
            if(pushFileStudentExcel.status < 400 && pushFileSubjectExcel.status < 400){
              enqueueSnackbar('Tạo lớp học thành công');
            }
            else {
              enqueueSnackbar(`${res.response.data.title}`, { variant: 'error' });
            }
          }catch (error) {
          enqueueSnackbar('Đã có lỗi xảy ra', { variant: 'error' });
        }
        } else {
          enqueueSnackbar(`${res.response.data.title}`, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Đã có lỗi xảy ra', { variant: 'error' });
      }
    // onNextStep();
  };



  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Card sx={{ p: 3 }}>
              <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                  }}
              >
                <Typography variant="h6" sx={{color: 'text.disabled', mb: 1}}>
                  Danh sách môn học
                </Typography>
                <Upload
                    onCLick={() => {
                      console.log('upload');
                    }}
                    hasDefault
                    accept={{ '.xlsx': [] }}
                    defaultFile={'http://lmms.site:7070/assets/images/subjects/ImportSubjectClass.xlsx'}
                    multiple
                    name={`fileSubject`}
                    error={getValues(`fileSubject`) === ''}
                    files={
                      getValues(`fileSubject`)
                          ? [
                            Object.assign(getValues(`fileSubject`), {
                              preview: URL.createObjectURL(Object.assign(getValues(`fileSubject`))),
                            }),
                          ]
                          : []
                    }
                    handleDrop={handleDrop}
                    onRemove={handleRemoveFile}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Thêm
                </LoadingButton>
              </Stack>
            </Card>

          </Grid>
          <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              sx={{mt:2}}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Trở về
          </Button>
        </Grid>
      </FormProvider>
  );
}
