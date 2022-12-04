import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {useCallback, useEffect, useMemo} from 'react';
// next
import {useRouter} from 'next/router';
// form
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
// @mui
import {LoadingButton} from '@mui/lab';
import {Box, Card, Grid, Stack, Typography} from '@mui/material';
// utils
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// assets
// components
import {useSnackbar} from '../../../components/snackbar';
import FormProvider, {RHFTextField, RHFUploadAvatar} from '../../../components/hook-form';
import {createSubject, updateSubject} from "../../../dataProvider/agent";
import {fData} from "../../../utils/formatNumber";
import SubjectNewEditSlot from "./SubjectNewEditSlot";

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
            listSlots: currentSubject?.listSlots || [],
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
        getValues,
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
        if (!isEdit) {
            try {
                const res = await createSubject(data)
                if (res.status < 400) {
                    reset();
                    enqueueSnackbar('Tạo môn học thành công');
                    push(PATH_DASHBOARD.subject.list);
                } else {
                    enqueueSnackbar('Đã có lỗi xảy ra', {variant: 'error'});
                }
            } catch (error) {
                enqueueSnackbar('Đã có lỗi xảy ra', {variant: 'error'});
            }
        } else {
            try {
                const res = await updateSubject(currentSubject.id, {
                    code: data.code,
                    name: data.name,
                    description: data.description
                })
                if (res.status < 400) {
                    reset();
                    enqueueSnackbar('Cập nhật môn học thành công!');
                    push(PATH_DASHBOARD.subject.list);
                } else {
                    enqueueSnackbar('Cập nhật môn học thất bại');
                }
            } catch (error) {
                enqueueSnackbar('Cập nhật môn học thất bại');
            }
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


    const handleSelectedSlot = (data) => {
        console.log("Parent", data)
        const listSlotId = [];
        data.map((slot) => {
            listSlotId.push(slot.id);
        })
        setValue('listSlots', listSlotId)
    }


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{pt: 10, pb: 5, px: 3}}>
                        <Typography variant="h6" sx={{color: 'text.disabled', mt: -7, mb: 5}}>
                            Ảnh môn học
                        </Typography>
                        <div></div>
                        <Box sx={{mb: 5}}>
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
                                        <br/> kích thước tối đa là {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Card sx={{p: 3}}>
                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                        >
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
                            <SubjectNewEditSlot
                                listSlotSelected={getValues('listSlots')}
                                name="listSlots"
                                id="listSlots"
                                handleSelectedSlot={handleSelectedSlot}
                                onSelect={(slots) => {
                                    // console.log("Parent", slots)
                                }}
                            />
                        </Box>
                        <Stack alignItems="flex-end" sx={{mt: 3}}>
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
