// @mui
import {
    Box,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    Divider,
    Tab,
    Tabs,
    Stack,
    TextField,
    Typography, Grid, Card,
} from '@mui/material';
// components
import React, {useEffect, useMemo, useState} from 'react';
import FormProvider, {RHFAutocomplete} from "../../../../components/hook-form";
import {getAllSubject, updateSubjectClass} from "../../../../dataProvider/agent";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from "@mui/lab";

// ----------------------------------------------------------------------


export default function ClassAddSubjectDialog({data, open, onClose}) {
    const {enqueueSnackbar} = useSnackbar();

    const validationSchema = (() => {
        return Yup.object().shape({
            rolesID: Yup.array().min(1, 'Hãy chọn vai trò'),
        })
    })();

    const defaultValues = useMemo(
        () => ({
            subjectId: [],
            tagsId: [],

        }),
        []
    );

    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting, errors},
    } = methods;


    const [subjectsData, setSubjectsData] = useState([]);


    useEffect(() => {
        fetchSubjects();
    }, []);


    async function fetchSubjects() {
        const res = await getAllSubject({pageIndex: 1, pageSize: 10});
        if (res.status < 400) {
            const transformData = res.data.data.map((tag) => {
                return {
                    label: tag.name,
                    id: tag.id,
                };
            });
            setSubjectsData(transformData);
        } else {
            console.log('error fetch api');
        }
    }

    const onSubmit = async (data) => {
        console.log('est')
        try {
            const res = await updateSubjectClass(data.tagsId)
            if (res.status < 400) {
                reset();
                enqueueSnackbar('Create success!');
                onClose()
            } else {
                enqueueSnackbar('Create Fail');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
            >
                <DialogActions sx={{py: 2, px: 3}}>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Thêm môn học
                    </Typography>

                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Quay lại
                    </Button>
                </DialogActions>

                <Divider/>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card sx={{p: 3}}>
                            <Box
                                rowGap={3}
                                columnGap={2}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(1, 1fr)',
                                }}
                            >
                                <RHFAutocomplete
                                    name="subjectId"
                                    multiple
                                    onChange={(event, newValue) => {
                                        setValue('subjectId', newValue);
                                        const tagsId = newValue.map((tag) => tag.id);
                                        setValue('tagsId', tagsId);
                                    }}

                                    options={subjectsData}
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip {
                                                      ...getTagProps({index})}
                                                  key={index} size="small"
                                                  label={option.label}
                                            />
                                        ))
                                    }
                                    renderInput={(params) =>
                                        <TextField label="Môn học" {...params} />
                                    }
                                />
                            </Box>
                            <Stack alignItems="flex-end" sx={{mt: 3}}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Thêm mới
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Dialog>
        </FormProvider>
    );
}
