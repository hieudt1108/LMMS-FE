import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
// form
import { useForm, Controller, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, Chip } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFAutocomplete,
  RHFRadioGroup,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { createUserAuth, getALlRoles, getUserById, updateUser } from '../../../dataProvider/agent';

// ----------------------------------------------------------------------
const GENDER_OPTION = [
  { label: 'Nam', value: '0' },
  { label: 'Nữ', value: '1' },
];

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewForm({ isEdit = false, currentUser }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = (() => {
    if (!isEdit) {
      return Yup.object().shape({
        userName: Yup.string().trim().required('Tên đăng nhập không được trống'),
        password: Yup.string().trim().required('Mật khẩu không được trống'),
        rolesID: Yup.array().min(1, 'Hãy chọn vai trò'),
        firstName: Yup.string().trim().required('Không được để trống'),
        lastName: Yup.string().trim().required('Không được để trống'),
        email: Yup.string().notRequired(),
        phone: Yup.string().notRequired(),
        address: Yup.mixed().notRequired(),
      });
    } else {
      return Yup.object().shape({
        firstName: Yup.string().trim().required('Không được để trống'),
        lastName: Yup.string().trim().required('Không được để trống'),
        email: Yup.string().notRequired(),
        phone: Yup.string().notRequired(),
        address: Yup.mixed().notRequired(),
      });
    }
  })();

  const defaultValues = useMemo(
    () => ({
      userName: currentUser?.userName || '',
      password: currentUser?.password || '',
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      email: currentUser?.email || '',
      gender: currentUser?.gender || 0,
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      rolesID: currentUser?.rolesID || [],
      tagsId: [],
      birthDate: new Date(),
      enable: currentUser?.enable || 0,
    }),
    [currentUser]
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
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser]);

  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchRoles() {
    const res = await getALlRoles({ pageIndex: 1, pageSize: 10 });
    if (res.status < 400) {
      const transformData = res.data.data.map((tag) => {
        return {
          label: tag.name,
          id: tag.id,
        };
      });

      setUserRole(transformData);
    } else {
      console.log('error fetch api');
    }
  }

  const onSubmit = async (data) => {
    console.log(isEdit);
    if (!isEdit) {
      try {
        const dataCreate = {
          userName: data.userName,
          password: data.password,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthDate: data.birthDate,
          address: data.address,
          phone: data.phone,
          isTeacher: data.isTeacher,
          rolesID: data.tagsId,
        };
        const res = await createUserAuth(dataCreate);
        if (res.status < 400) {
          reset();
          enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
          push(PATH_DASHBOARD.user.list);
        } else {
          enqueueSnackbar('Create Fail');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const res = await updateUser(currentUser.id, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        birthDate: data.birthDate,
        address: data.address,
        phone: data.phone,
        enable: data.enable,
      });
      if (res.status < 400) {
        reset();
        enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
        push(PATH_DASHBOARD.user.list);
      } else {
        enqueueSnackbar('Update Fail');
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
              {!isEdit && (
                <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                  Tài khoản
                </Typography>
              )}
              {!isEdit && <div></div>}
              {!isEdit && <RHFTextField name="userName" label="Tên người dùng" id="userName" />}
              {!isEdit && <RHFTextField name="password" label="Mật khẩu" id="password" />}

              <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                Cài đặt tài khoản
              </Typography>
              {!isEdit && <div></div>}
              {isEdit && <div></div>}
              {isEdit && (
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Controller
                      name="enable"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          {...field}
                          checked={field.value !== 'active'}
                          onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}
                        />
                      )}
                    />
                  }
                  label={
                    <>
                      <Typography variant="subtitle2" sx={{ mb: 0.5, ml: 1 }}>
                        Vô hiệu hóa
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                        Xác nhận vô hiệu hóa người dùng
                      </Typography>
                    </>
                  }
                  sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />
              )}

              {!isEdit && (
                <RHFAutocomplete
                  name="rolesID"
                  multiple
                  onChange={(event, newValue) => {
                    setValue('rolesID', newValue);
                    const tagsId = newValue.map((tag) => tag.id);
                    setValue('tagsId', tagsId);
                  }}
                  options={userRole}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
                    ))
                  }
                  renderInput={(params) => <TextField label="Vai trò" {...params} />}
                />
              )}

              <div></div>
              <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                Thông tin cá nhân
              </Typography>
              <div></div>
              <RHFTextField name="firstName" label="Họ" id="firstName" />
              <RHFTextField name="lastName" label="Tên" id="lastName" />
              <Stack sx={{ ml: 1.5 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mt: 1 }}>
                  Giới tính
                </Typography>
                <RHFRadioGroup
                  name="gender"
                  options={GENDER_OPTION}
                  sx={{
                    mt: 0.5,
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Stack>
              <Stack sx={{ mt: 2.5 }}>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      label="Date create"
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                      )}
                    />
                  )}
                />
              </Stack>
              <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                Thông tin liên hệ
              </Typography>

              <div></div>
              <RHFTextField name="email" label="Email" id="email" />
              <RHFTextField name="phone" label="Số điện thoại" id="phone" />
              <RHFTextField name="address" label="Địa chỉ" id="address" />
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