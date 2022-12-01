import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {useEffect, useMemo, useState} from 'react';
// next
import {useRouter} from 'next/router';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Box, Button, Card, Chip, Divider, Grid, MenuItem, Stack, TextField, Typography} from '@mui/material';
// utils
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// assets
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {RHFAutocomplete, RHFSelect, RHFTextField} from '../../../components/hook-form';
import Iconify from "../../../components/iconify";
import {createRole, getAllPermission, updateRole} from "../../../dataProvider/agent";

// ----------------------------------------------------------------------

RolesNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentRoles: PropTypes.object,
};

export default function RolesNewEditForm({ isEdit = false, currentRoles }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Tên vai trò không được trống'),
    description: Yup.string().notRequired(),
  })

  const defaultValues = useMemo(
      () => ({
        name: currentRoles?.name || '',
        description: currentRoles?.description || '',
        permissionId: [],
        tagsId: [],
      }),
      [currentRoles]
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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  useEffect(() => {
    if (isEdit && currentRoles) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentRoles]);


  const [permissions, setPermissions] = useState([]);


  useEffect(() => {
    fetchPermissions();
  }, []);


  async function fetchPermissions() {
    const res = await getAllPermission({pageIndex: 1, pageSize: 100});
    if (res.status < 400) {
      const transformData = res.data.data.map((tag) => {
        return {
          label: `${tag.name}  (${tag.description})`,
          id: tag.id,
        };
      });
      console.log(transformData)
      setPermissions(transformData);
    } else {
      console.log('error fetch api');
    }
  }

  const onSubmit = async (data) => {
    if(!isEdit){
      try {
        const res = await createRole(data)
        if (res.status < 400) {
          reset();
          enqueueSnackbar('Create success!');
          push(PATH_DASHBOARD.role.list);
        } else {
          enqueueSnackbar('Create Fail');
        }
      } catch (error) {
        enqueueSnackbar('Create Fail');
      }
    }else{
      try {
        const res = await updateRole(currentRoles.id,{
          name: data.name,
          description: data.description,
          permissionId: data.tagsId,
        })
        if (res.status < 400) {
          reset();
          enqueueSnackbar('Update success!');
          push(PATH_DASHBOARD.role.list);
        } else {
          enqueueSnackbar('Update Fail');
        }
      } catch (error) {
        enqueueSnackbar('Update Fail');
      }
    }

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
                    sm: 'repeat(2, 1fr)',
                  }}
              >
                <Typography variant="h6" sx={{color: 'text.disabled', mb: 1}}>
                  Thông tin vai trò
                </Typography>
                <div></div>
                <RHFTextField
                    name="name"
                    label="Tên vai trò"
                    id="name"
                />
                <RHFTextField
                    name="description"
                    label="Mô tả"
                    id="description"

                />
                <Typography variant="h6" sx={{color: 'text.disabled', mb: 1}}>
                  Cài đặt vai trò
                </Typography>
                <div></div>
                <RHFAutocomplete
                    name="permissionId"
                    multiple
                    onChange={(event, newValue) => {
                      setValue('permissionId', newValue);
                      const tagsId = newValue.map((tag) => tag.id);
                      setValue('tagsId', tagsId);
                    }}
                    options={permissions}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
                        ))
                    }
                    renderInput={(params) => <TextField label="Quyền" {...params} />}
                />

              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Tạo mới' : 'Cập nhật'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
  );
}
