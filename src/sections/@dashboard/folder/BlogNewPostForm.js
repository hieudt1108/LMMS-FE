import * as Yup from 'yup';
import { useState, useCallback, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Chip, Stack, Button, TextField, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFSelect,
} from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import BlogPostsSort from './filter/BlogPostsSort';
// ----------------------------------------------------------------------
import { getAllSubject, getAllTypeDocument, getAllPermission } from '../../../dataProvider/agent';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { createDocumentInitialRedux } from 'src/redux/slices/folder';
import { FileNewFolderDialog, FilePanel } from '../file';
const SORT_OPTIONS = [
  { id: 0, name: 'Chim cút' },
  { id: 1, name: 'Được View' },
  { id: 2, name: 'Được Share' },
];

// const TAGS_OPTION = [
//   'Toy Story 3',
//   'Logan',
//   'Full Metal Jacket',
//   'Dangal',
//   'The Sting',
//   '2001: A Space Odyssey',
//   "Singin' in the Rain",
//   'Toy Story',
//   'Bicycle Thieves',
//   'The Kid',
//   'Inglourious Basterds',
//   'Snatch',
//   '3 Idiots',
// ];

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const {
    query: { folder_id: folderID },
    push,
  } = useRouter();
  const { newDocument } = useSelector((state) => state.folder);

  const { id, programs, subjects, typeDocuments } = newDocument.init;
  console.log('BlogNewPostForm', folderID, programs, subjects, typeDocuments);

  useEffect(() => {
    dispatch(createDocumentInitialRedux());
  }, [dispatch]);

  const { enqueueSnackbar } = useSnackbar();

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().required('Content is required'),
    cover: Yup.mixed().required('Cover is required').nullable(true),
  });

  const defaultValues = {
    title: '',
    description: '',
    file: '',
    programId: '',
    subjectId: '',
    typeDocumentId: '',
    fileName: '1669897540_267901911_630856611449438_2101817464366928883_n.jpg',
    size: 42728,
    contentType: 'image/jpeg',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onSubmit = async (data) => {
    try {
      console.log('onSubmit', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log();
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('cover', newFile);
      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('cover', null);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Name document" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                <Stack spacing={1}>
                  <FilePanel
                    title="Recent Files"
                    link={PATH_DASHBOARD.fileManager}
                    onOpen={handleOpenUploadFile}
                    sx={{ mt: 2 }}
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
                    name="publish"
                    label="Public/Private"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Chương Trình</span>
                  <RHFSelect name="programId" label="Chương trình" placeholder="Chương trình">
                    {programs.map((option, index) => (
                      <option key={index} value={option.id + ''}>
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
                  <RHFSelect name="subjectId" label="Môn học" placeholder="Môn học">
                    {subjects.map((option, index) => (
                      <option key={index} value={option.id + ''}>
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
                  <RHFSelect name="typeDocumentId" label="Loại tài liệu" placeholder="Loại tài liệu">
                    {typeDocuments.map((option, index) => (
                      <option key={index} value={option.id + ''}>
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
      <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />
    </>
  );
}
