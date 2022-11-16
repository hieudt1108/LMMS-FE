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

UserEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};

export default function UserEditForm({ isEdit = false, currentUser }) {
    console.log(currentUser)
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().trim().required('Không được để trống'),
        lastName: Yup.string().trim().required('Không được để trống'),
        email: Yup.string().notRequired(),
        phone: Yup.string().notRequired(),
        address: Yup.mixed().notRequired(),
    })


    const methods = useForm({
        resolver: yupResolver(validationSchema),
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

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
        enable: 0
    };


    const submitHandler = async (values, actions) => {
        const { email, firstName, lastName, gender, birthDate, address, phone, isTeacher, enable } = values
        const usersData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            birthDate: initialValues.birthDate,
            address: address,
            phone: phone,
            isTeacher: isTeacher,
            enable : initialValues.enable
        };
        console.log('data update',usersData)
        const res = await updateUser(currentUser.id,  {
            usersData
        });
        if (res.status < 400) {
            actions.resetForm();
            reset();
            enqueueSnackbar( 'Update success!');
            push(PATH_DASHBOARD.user.list);
        }else {
            enqueueSnackbar('Update Fail');
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

                            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
                                Cài đặt tài khoản
                            </Typography>
                            <div></div>

                            <FormControlLabel
                                labelPlacement="start"
                                control={
                                    <Controller
                                        name="enable"
                                        id="enable"
                                        control={control}
                                        render={({ field }) => (
                                            <Switch
                                                {...field}
                                                checked={field.value !== 'active'}
                                                value={formik.values.enable}
                                                onChange={(event) => {field.onChange(event.target.checked ? 'banned' : 'active')}}
                                                onValueChange={value =>
                                                    formik.handleChange(value)
                                                }
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

                            <div></div>
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
                                Cập nhật người dùng
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
