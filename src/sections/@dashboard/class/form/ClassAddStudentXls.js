import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {Box, Stack, Card, Grid, Typography} from '@mui/material';
import FormProvider, {RHFUpload} from "../../../../components/hook-form";
import {Upload} from "../../../../components/upload";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {useRouter} from "next/router";
import {useSnackbar} from "notistack";
import {LoadingButton} from "@mui/lab";
import {yupResolver} from "@hookform/resolvers/yup";

export default function ClassAddStudentXls() {
    const {push} = useRouter();

    const {enqueueSnackbar} = useSnackbar();

    const [files, setFiles] = useState([]);

    const NewUsersSchema = Yup.object().shape({
        file: Yup.array().min(1, 'Images is required'),
    });

    const defaultValues = useMemo(
        () => ({
            file: [],
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const methods = useForm({
        resolver: yupResolver(NewUsersSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    const onSubmit = async () => {

    };

    useEffect(() => {
        if (!open) {
            setFiles([]);
        }
    }, [open]);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            setFiles([...files, ...newFiles]);
        },
        [files]
    );


    const handleRemoveFile = (inputFile) => {
        const filtered = files.filter((file) => file !== inputFile);
        setFiles(filtered);
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{p: 3}}>
                        <Stack spacing={3}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2" sx={{color: 'text.secondary'}}>
                                    Danh sách học sinh
                                </Typography>

                                <Upload
                                    accept={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [] }}
                                    multiple
                                    hasDefault={true}
                                    defaultFile={'http://lmms.site:7070/assets/images/subjects/ImportManyUser.xlsx'}
                                    files={files}
                                    onDrop={handleDrop}
                                    onRemove={handleRemoveFile}
                                />
                            </Stack>
                            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Đăng tải
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Card>

                </Grid>
            </Grid>
        </FormProvider>
    )
}
