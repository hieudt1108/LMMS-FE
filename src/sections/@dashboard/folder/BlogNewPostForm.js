import * as Yup from 'yup';
import { useState, useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFSelect } from '../../../components/hook-form';
// ----------------------------------------------------------------------
import { postFile } from '../../../dataProvider/agent';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { createDocumentInitialRedux, uploadDocumentRedux } from 'src/redux/slices/folder';
import { UploadBox } from 'src/components/upload';
import Iconify from 'src/components/iconify';
const SORT_OPTIONS = [
  { id: 0, name: 'Chim cút' },
  { id: 1, name: 'Được View' },
  { id: 2, name: 'Được Share' },
];

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const {
    query: { folder_id: folderId },
    push,
  } = useRouter();

  const { newDocument } = useSelector((state) => state.folder);

  const { id, programs, subjects, typeDocuments } = newDocument.init;

  console.log('BlogNewPostForm', folderId, programs, subjects, typeDocuments, newDocument);

  useEffect(() => {
    dispatch(createDocumentInitialRedux(folderId));
  }, [dispatch, folderId]);

  const validationSchema = (() => {
    return Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      content: Yup.string().required('Content is required'),
      cover: Yup.mixed().required('Cover is required').nullable(true),
    });
  })();

  const methods = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: newDocument.data,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      try {
        const formData = new FormData();

        formData.append('File', acceptedFiles[0]);
        const response = await postFile(formData);
        console.log('handleDrop', response);
        setValue('TypeFile', response.data.contentType);
        setValue('urlDocument', response.data.fileName);
        setValue('size', response.data.size);
      } catch (error) {
        console.error('handleDrop', error);
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    if (!data.programId) {
      data.programId = programs[0].id;
    }
    if (!data.subjectId) {
      data.subjectId = subjects[0].id;
    }
    if (!data.typeDocumentId) {
      data.typeDocumentId = typeDocuments[0].id;
    }
    data.folderId = folderId;
    data.status = data.status ? 1 : 0;
    console.log('onSubmit', data);
    dispatch(uploadDocumentRedux(data));
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="code" label="Code document" />
                <RHFTextField name="name" label="Name document" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                <Stack spacing={1}>
                  <UploadBox
                    onDrop={handleDrop}
                    placeholder={
                      <Stack spacing={0.5} alignItems="center" sx={{ color: 'text.disabled' }}>
                        <Iconify icon="eva:cloud-upload-fill" width={40} />
                        <Typography variant="body2">Upload file</Typography>
                      </Stack>
                    }
                    sx={{
                      mb: 3,
                      py: 2.5,
                      width: 'auto',
                      height: 'auto',
                      borderRadius: 1.5,
                    }}
                  />
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="status"
                    label="Public/Private"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Chương Trình</span>
                  <RHFSelect name="programId" placeholder="Chương trình">
                    {programs.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </RHFSelect>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Môn học</span>
                  <RHFSelect name="subjectId" placeholder="Môn học">
                    {subjects.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </RHFSelect>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Loại</span>
                  <RHFSelect name="typeDocumentId" placeholder="Loại tài liệu">
                    {typeDocuments.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </RHFSelect>
                </div>
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
