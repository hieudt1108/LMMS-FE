import * as Yup from 'yup';
import { useState, useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Stack, Typography, Divider, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFSelect, RHFUpload } from '../../../components/hook-form';
// ----------------------------------------------------------------------
import { postFile } from '../../../dataProvider/agent';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { createDocumentInitialRedux, uploadDocumentRedux } from 'src/redux/slices/folder';
import { Upload } from '../../../components/upload';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const {
    query: { folder_id: folderId },
    push,
  } = useRouter();

  const validationSchema = (() => {
    return Yup.object().shape({
      name: Yup.string().required('Name is require!'),
      code: Yup.string().required('Code is require!'),
      description: Yup.string().required('Description is require!'),
    });
  })();

  const { newDocument } = useSelector((state) => state.folder);

  const { id, programs, subjects, typeDocuments } = newDocument.init;

  const [files, setFiles] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(createDocumentInitialRedux(folderId));
  }, [dispatch, folderId]);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
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
  const formData = new FormData();
  const handleDrop = useCallback(
    async (acceptedFiles) => {
      try {
        formData.append('File', acceptedFiles[0]);
        const response = await postFile(formData);
        setValue('TypeFile', response.data.contentType);
        setValue('urlDocument', response.data.fileName);
        setValue('size', response.data.size);
        const newFiles = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setFiles([...files, ...newFiles]);
        setValue('file', [...files, ...newFiles]);
      } catch (error) {
        console.error('handleDrop', error);
      }
    },
    [setValue],
    [files]
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
    dispatch(uploadDocumentRedux(data)).then(() => {
      enqueueSnackbar('Tạo tài liệu thành công');
      push(PATH_DASHBOARD.folder.link(folderId));
    });
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
    setValue('file', []);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="code" label="Mã tài liệu" />
                <RHFTextField name="name" label="Tên tài liệu" />

                <RHFTextField name="description" label="Mô tả" multiline rows={3} />

                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Tập tin
                  </Typography>

                  <Upload
                    error={true}
                    name="file"
                    multiple
                    files={files}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
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
                    label="Tài liệu công khai/ riêng tư"
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
              <LoadingButton type="" variant="contained" size="large" loading={isSubmitting}>
                Đăng tải tài liệu
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

        <Stack
          spacing={2}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            // onClick={handleAdd}
            sx={{ flexShrink: 0 }}
          >
            Add Item
          </Button>

          <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              Đăng tải tài liệu
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
}
