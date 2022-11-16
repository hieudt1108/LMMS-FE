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
} from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';
import BlogPostsSort from './filter/BlogPostsSort';
// ----------------------------------------------------------------------
import { getAllSubjectInClass, getAllTypeDocument, getAllPermission } from '../../../dataProvider/agent';
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
  const { push } = useRouter();

  const [subjects, setSubjects] = useState([]);
  const [typeDocs, setTypeDocs] = useState([]);

  const [permissions, setPermissions] = useState([]);

  async function fetchApiGet() {
    const res_subj = await getAllSubjectInClass({ pageIndex: 1, pageSize: 100 });
    const res_typeDoc = await getAllTypeDocument({ pageIndex: 1, pageSize: 100 });
    const res_permission = await getAllPermission({ pageIndex: 1, pageSize: 100 });
    if (res_subj.status < 400) {
      setSubjects(res_subj.data.data);
      setTypeDocs(res_typeDoc.data.data);
      setPermissions(res_permission.data.data);
    } else {
      console.log('error');
    }
  }
  console.log('test: ', typeDocs);
  useEffect(() => {
    fetchApiGet();
  }, []);
  const [sortBySubject, setSortBySubject] = useState('');
  const [sortByDocs, setSortByDocs] = useState('');

  const [sortByPer, setSortByPer] = useState('');
  const [sortBy, setSortBy] = useState('Chọn gì?');

  const { enqueueSnackbar } = useSnackbar();

  const [openPreview, setOpenPreview] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().required('Content is required'),
    cover: Yup.mixed().required('Cover is required').nullable(true),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['The Kid'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
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

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      push(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
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
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Name document" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                {/* <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Content
                  </Typography>

                  <RHFEditor simple name="content" />
                </Stack> */}

                <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Cover
                  </Typography>

                  <RHFUpload name="cover" maxSize={3145728} onDrop={handleDrop} onDelete={handleRemoveFile} />
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="publish"
                    label="Public/Private"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />

                  {/* <RHFSwitch
                    name="comments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  /> */}
                </div>

                {/* <RHFAutocomplete
                  name="tags"
                  multiple
                  freeSolo
                  onChange={(event, newValue) => setValue('tags', newValue)}
                  options={TAGS_OPTION.map((option) => option)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                    ))
                  }
                  renderInput={(params) => <TextField label="Tags" {...params} />}
                /> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>Loại tài liệu</span>
                  <BlogPostsSort
                    sortBy={sortByDocs}
                    sortOptions={typeDocs}
                    onSort={(e) => setSortByDocs(e.target.value)}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>Môn học</span>
                  <BlogPostsSort
                    sortBy={sortBySubject}
                    sortOptions={subjects}
                    onSort={(e) => setSortBySubject(e.target.value)}
                  />
                </div>
                <div style={{ border: '1px solid #c8acac', padding: '1rem', borderRadius: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>Chọn User</span>
                    <BlogPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>Quyền truy cập</span>
                    <BlogPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
                  </div>
                </div>

                <div style={{ border: '1px solid #c8acac', padding: '0.5rem', borderRadius: '12px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>Chọn lớp</span>
                    <BlogPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
                  </div>
                </div>

                {/* <RHFTextField name="metaTitle" label="Meta title" />

                <RHFTextField name="metaDescription" label="Meta description" fullWidth multiline rows={3} />

                <RHFAutocomplete
                  name="metaKeywords"
                  multiple
                  freeSolo
                  onChange={(event, newValue) => setValue('metaKeywords', newValue)}
                  options={TAGS_OPTION.map((option) => option)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                    ))
                  }
                  renderInput={(params) => <TextField label="Meta keywords" {...params} />}
                /> */}
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {/* <Button fullWidth color="inherit" variant="outlined" size="large" onClick={handleOpenPreview}>
                Preview
              </Button> */}

              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                Post
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      {/* <BlogNewPostPreview
        values={values}
        open={openPreview}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      /> */}
    </>
  );
}
