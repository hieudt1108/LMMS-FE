import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {useCallback, useEffect, useMemo, useState} from 'react';
// next
import {useRouter} from 'next/router';
// form
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Box, Button, Card, Chip, Divider, Grid, MenuItem, Stack, Switch, TextField, Typography} from '@mui/material';
// utils
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// assets
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {
    RHFAutocomplete, RHFEditor,
    RHFRadioGroup,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar
} from '../../../components/hook-form';
import Iconify from "../../../components/iconify";
import {createSubject, getAllLevel, getALlRoles} from "../../../dataProvider/agent";
import {DatePicker} from "@mui/x-date-pickers";
import Label from "../../../components/label";
import {fData} from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

SubjectNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentSubject: PropTypes.object,
};

export default function SubjectNewEditForm({isEdit = false, currentSubject}) {
    const {push} = useRouter();

    const {enqueueSnackbar} = useSnackbar();

    const validationSchema = Yup.object().shape({
        code: Yup.string().trim().required('Mã môn học không được trống'),
        name: Yup.string().trim().required('Tên môn học không được trống'),
        description: Yup.string().notRequired(),
    })

    const defaultValues = useMemo(
        () => ({
            code: currentSubject?.code || '',
            name: currentSubject?.name || '',
            description: currentSubject?.description || '',
        }),
        [currentSubject]
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
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentSubject) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, currentSubject]);


    const onSubmit = async (data) => {
        try {
            const res = await createSubject(data)
            console.log(data)
            if (res.status < 400) {
                reset();
                enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
                push(PATH_DASHBOARD.subject.list);
            } else {
                enqueueSnackbar('Create Fail');
            }
        } catch (error) {
            enqueueSnackbar('Create Fail');
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('avatarUrl', newFile);
            }
        },
        [setValue]
    );


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                        <Typography variant="h6" sx={{color: 'text.disabled',mt:-7,mb:5}}>
                            Ảnh môn học
                        </Typography>
                        <div></div>
                        <Box sx={{ mb: 5 }}>
                            <RHFUploadAvatar
                                name="avatarUrl"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Cho phép *.jpeg, *.jpg, *.png
                                        <br /> kích thước tối đa là {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>


                            <Typography variant="h6" sx={{color: 'text.disabled', mb: 1}}>
                                Thông tin môn học
                            </Typography>
                            <RHFTextField
                                name="code"
                                label="Mã môn học"
                                id="name"
                            />
                            <RHFTextField
                                name="name"
                                label="Tên môn học"
                                id="name"
                            />
                            <RHFTextField
                                name="description"
                                label="Mô tả"
                                id="description"
                                multiline rows={5}
                            />

                        <Stack alignItems="flex-end" sx={{mt: 3}}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Tạo mới' : 'Cập nhật'}
                            </LoadingButton>
                        </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
