import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, {useMemo, useState} from 'react';
// next
import {useRouter} from 'next/router';
// form
import {useForm} from 'react-hook-form';
// @mui
import {LoadingButton} from '@mui/lab';
import {Box, Button, Card, Grid, Stack, Typography} from '@mui/material';
// utils
// routes
// components
import {useSnackbar} from '../../../../components/snackbar';
import FormProvider from '../../../../components/hook-form';
import {useDispatch} from 'react-redux';

// API
import {Upload} from "../../../../components/upload";
import Iconify from "../../../../components/iconify";

// ----------------------------------------------------------------------

ClassNewStudentExcel.propTypes = {
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
  setFormData: PropTypes.func,
};

export default function ClassNewStudentExcel({onNextStep, onBackStep,setFormData}) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();



  const defaultValues = useMemo(
      () => ({
        file: [],
      }),
      []
  );

  const methods = useForm({
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

  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    try {
      setValue(`file`, acceptedFiles[0]);
      setFiles(acceptedFiles[0]);
    } catch (error) {
      console.error('handleDrop', error);
    }
  };

  const handleRemoveFile = () => {
    setValue(`file`, '');
    setFiles('');

  };

  const onSubmit = async (data) => {
    const fileStudent = getValues(`file`)
    setFormData(prev=>{return {...prev, ...data}})
    onNextStep();
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
                Danh sách thành viên
              </Typography>

              <Upload
                  onCLick={() => {
                    console.log('upload');
                  }}
                  hasDefault
                  defaultFile={'http://lmms.site:7070/assets/images/subjects/ImportMemberClass.xlsx'}
                  accept={{ '.xlsx': [] }}
                  multiple
                  name={`file`}
                  error={getValues(`file`) === ''}
                  files={
                    getValues(`file`)
                        ? [
                          Object.assign(getValues(`file`), {
                            preview: URL.createObjectURL(Object.assign(getValues(`file`))),
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
