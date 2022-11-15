import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {useCallback, useEffect, useMemo, useState} from 'react';
// next
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
// form
import {useForm, Controller, useFormContext} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, Chip} from '@mui/material';
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
    RHFUploadAvatar
} from '../../../components/hook-form';
import {DatePicker} from "@mui/x-date-pickers";
import {createUserAuth, getALlRoles, getUserById, updateUser} from "../../../dataProvider/agent";

// ----------------------------------------------------------------------
const GENDER_OPTION = [
    { label: 'Nam', value: '0' },
    { label: 'Nữ', value: '1' },
];

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

    const validationSchema = Yup.object().shape({
        userName: Yup.string().trim().required('Tên đăng nhập không được trống'),
        password: Yup.string().trim().required('Mật khẩu không được trống'),
        firstName: Yup.string().trim().required('Không được để trống'),
        lastName: Yup.string().trim().required('Không được để trống'),
        email: Yup.string().notRequired(),
        phone: Yup.string().notRequired(),
        address: Yup.mixed().notRequired(),
        rolesID: Yup.array().min(1, 'Hãy chọn vai trò')
    })

  const defaultValues = useMemo(
    () => ({
        userName: currentUser?.userName || '',
        password: currentUser?.password || '',
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
        rolesID: currentUser?.rolesID || ['HOCSINH'],
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
    formState: { isSubmitting },
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
    const initialValues = {
        userName: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: 0,
        birthDate: "2022-11-14T03:36:01.972Z",
        address: "",
        phone: "",
        isTeacher: 0,
        rolesID: [2],
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    async function fetchRoles() {
        const res = await getALlRoles({ pageIndex: 1, pageSize: 10 });
        if (res.status < 400) {
            setUserRole(res.data.data);
        } else {
            console.log('error fetch api');
        }
    }


    const submitHandler = async (values, actions) => {
        const { userName, password, email, firstName, lastName, gender, birthDate, address, phone, isTeacher, rolesID, enable } = values
        const usersData = {
            userName: userName,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            birthDate: initialValues.birthDate,
            address: address,
            phone: phone,
            isTeacher: isTeacher,
            rolesID: initialValues.rolesID,
        };
        const res = await createUserAuth(usersData)
        if (res.status < 400) {
            actions.resetForm();
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            push(PATH_DASHBOARD.user.list);
        }else {
            enqueueSnackbar('Create Fail');
        }
    };
    const formik = useFormik({ initialValues: initialValues, validationSchema: validationSchema, onSubmit: submitHandler });

    return (
    <FormProvider methods={methods} onSubmit={formik.handleSubmit}>
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
                {!isEdit && (
                <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                    Tài khoản
                </Typography>
                )}
                {!isEdit && (
                <div></div>
                )}
              {!isEdit && (
              <RHFTextField
                  name="userName"
                  label="Tên người dùng"
                  id="userName"
                  value={formik.values.userName}
                  onChange={(e) => {
                      formik.handleChange(e)
                  }}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
              />
              )}
                {!isEdit && (
                <RHFTextField
                  name="password"
                  label="Mật khẩu"
                  id="password"
                  value={formik.values.password}
                  onChange={(e) => {
                      formik.handleChange(e)
                  }}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />)}

                <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                    Cài đặt tài khoản
                </Typography>
                {!isEdit && (
                <div></div>
                )}
                {!isEdit && (
                <RHFAutocomplete
                    name="rolesID"
                    multiple
                    freeSolo
                    onChange={(event, newValue) => setValue('rolesID', newValue)}
                    options={userRole.map((option) => option.name)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip {
                                ...getTagProps({ index })}
                                  key={option} size="small"
                                  label={option}
                            />
                        ))
                    }
                    renderInput={(params) => <TextField label="Vai trò" {...params} />}
                />
                )}
                {isEdit && (
                    <div></div>
                )}

                <FormControlLabel
                    labelPlacement="start"
                    control={
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    {...field}
                                    checked={field.value !== 'active'}
                                    value={formik.values.gender}
                                    onChange={(event) => {field.onChange(event.target.checked ? 'banned' : 'active')}}
                                />
                            )}
                        />
                    }
                    label={
                        <>
                            <Typography variant="subtitle2" sx={{ mb: 0.5,ml:2 }}>
                                Vô hiệu hóa
                            </Typography>
                            <Typography variant="body2" sx={{ ml:2,color: 'text.secondary' }}>
                                Áp dụng vô hiệu hóa người dùng
                            </Typography>
                        </>
                    }
                    sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                />


                {isEdit && (
                    <div></div>
                )}
                <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                    Thông tin cá nhân
                </Typography>
                <div></div>
              <RHFTextField
                name="firstName"
                label="Họ"
                id="firstName"
                value={formik.values.firstName}
                onChange={(e) => {
                    formik.handleChange(e)
                }}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <RHFTextField
                  name="lastName"
                  label="Tên"
                  id="lastName"
                  value={formik.values.lastName}
                  onChange={(e) => {
                      formik.handleChange(e)
                  }}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
              />
                <Stack sx={{ml:1.5}}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary',mt: 1 }}>
                        Giới tính
                    </Typography>
                    <RHFRadioGroup
                        name="gender"
                        options={GENDER_OPTION}
                        value={formik.values.gender}
                        onChange={(e) => {
                            formik.handleChange(e)
                        }}
                        sx={{
                            mt:0.5,
                            '& .MuiFormControlLabel-root': { mr: 4 },
                        }}
                    />
                </Stack>
                <Stack sx={{mt:2.5}}>
                    <Controller
                    name="birthdate"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <DatePicker
                            label="Sinh nhật"
                            value={field.value}
                            onChange={(newValue) => {
                                field.onChange(newValue);

                                const d = new Date(newValue).toJSON().slice(0, 19).replace('T', ' ')
                                formik.handleChange(d)
                                console.log(d);
                            }}
                            renderInput={(params) => (
                                <TextField {...params} value={formik.values.birthDate}
                                           onChange={(e) => {
                                    formik.handleChange(e)
                                }} fullWidth error={!!error} helperText={error?.message} />
                            )}
                        />
                    )}
                /></Stack>
                <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                    Thông tin liên hệ
                </Typography>

                <div></div>
                <RHFTextField
                    name="email"
                    label="Email"
                    id="email"
                    value={formik.values.email}
                    onChange={(e) => {
                        formik.handleChange(e)
                    }}
                />
                <RHFTextField
                    name="phone"
                    label="Số điện thoại"
                    id="phone"
                    value={formik.values.phone}
                    onChange={(e) => {
                        formik.handleChange(e)
                    }}
                />
                <RHFTextField
                    name="address"
                    label="Địa chỉ"
                    id="address"
                    value={formik.values.address}
                    onChange={(e) => {
                        formik.handleChange(e)
                    }}
                />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Tạo người dùng' : 'Cập nhật người dùng'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
