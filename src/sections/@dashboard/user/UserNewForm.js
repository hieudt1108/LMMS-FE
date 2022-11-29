import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Chip, FormControlLabel, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFAutocomplete, RHFRadioGroup, RHFTextField } from '../../../components/hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { createUserAuth, getALlRoles, getAllSubject, updateUser } from '../../../dataProvider/agent';

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
        roleID: Yup.array().min(1, 'Hãy chọn vai trò'),
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
      isTeacher: 0,
      roleID: [],
      tagsId: [],
      subjectId: [],
      suId: [0],
      birthDate: currentUser?.birthDate || new Date(),
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
    getValues,
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
  const [userSubjects, setUserSubjects] = useState([]);
  const [role, setRole] = useState([]);
  useEffect(() => {
    fetchRoles();
    fetchSubject();
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

  async function fetchSubject() {
    const res = await getAllSubject({ pageIndex: 1, pageSize: 100 });
    if (res.status < 400) {
      const transformDataSubject = res.data.data.map((su) => {
        return {
          label: su.name,
          id: su.id,
        };
      });

      setUserSubjects(transformDataSubject);
    } else {
      console.log('error fetch api');
    }
  }

  const onSubmit = async (data) => {
    if (!isEdit) {
      try {
        const roles = [];
        for (let i = 0; i < data.tagsId.length; i++) {
          if (data.tagsId[i] === 11) {
            roles.push({
              roleId: data.tagsId[i],
              subjectId: getValues('subjectId').map((item) => item.id),
            });
          } else {
            roles.push({
              roleId: data.tagsId[i],
              subjectId: [0],
            });
          }
        }
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
          roles: roles,
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
                          checked={field.value !== 0}
                          onChange={(event) => field.onChange(event.target.checked ? 1 : 0)}
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
                  name="roleID"
                  multiple
                  onChange={(event, newValue) => {
                    setValue('roleID', newValue);
                    const tagsId = newValue.map((tag) => tag.id);
                    setValue('tagsId', tagsId);
                    setRole(tagsId);
                    if (!getValues('tagsId').includes(11)) {
                      setValue('subjectId', []);
                    }
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
              {isEdit && <div></div>}
              {!isEdit && (
                <RHFAutocomplete
                  name="subjectId"
                  multiple
                  onChange={(event, newValue) => {
                    setValue('subjectId', newValue);
                    const suId = newValue.map((su) => su.id);
                    setValue('suId', suId);
                  }}
                  disabled={getValues('tagsId').includes(11) ? false : true}
                  options={userSubjects}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
                    ))
                  }
                  renderInput={(params) => <TextField label="Môn dạy" {...params} />}
                />
              )}

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
                      label="Sinh nhật"
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
