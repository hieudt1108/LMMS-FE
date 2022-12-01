import React, {useEffect, useMemo, useState} from 'react';
import {Box, Card, Chip, FormControlLabel, Grid, Stack, Switch, TextField, Typography} from '@mui/material';
import FormProvider, {RHFAutocomplete, RHFRadioGroup, RHFTextField} from '../../../../components/hook-form';
// API
import {createUserAuth, getALlRoles, getAllSubject, updateUser} from '../../../../dataProvider/agent';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {DatePicker} from "@mui/x-date-pickers";
import {LoadingButton} from "@mui/lab";
import {PATH_DASHBOARD} from "../../../../routes/paths";
import {useRouter} from "next/router";
import {useSnackbar} from "../../../../components/snackbar";


const TAGS_OPTION = [
    'Toy Story 3',
    'Logan',
    'Full Metal Jacket',
    'Dangal',
    'The Sting',
    '2001: A Space Odyssey',
    "Singin' in the Rain",
    'Toy Story',
    'Bicycle Thieves',
    'The Kid',
    'Inglourious Basterds',
    'Snatch',
    '3 Idiots',
];

export default function ClassAddStudentForm({isEdit = false}) {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const validationSchema = (() => {
            return Yup.object().shape({
                roleID: Yup.array().min(1, 'Hãy chọn vai trò'),
                email: Yup.string().notRequired(),
            });
    })();

    const defaultValues = useMemo(
        () => ({
            email: '',
            roleID: [],
            tagsId: [],
            subjectId: [],
            suId: [0],

        }),
        []
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

    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>

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
                                Email thành viên
                            </Typography>
                            <div></div>

                            <RHFAutocomplete
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
                                renderInput={(params) => <TextField label="Gõ hoặc dán danh sách Email hoặc Tên đăng nhập và ấn Enter" {...params} />}
                            />

                            <div></div>
                            <Typography variant="h6" sx={{color: 'text.disabled', mb: 1}}>
                                Cài đặt thành viên
                            </Typography>
                            <div></div>
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
                                        <Chip {...getTagProps({index})} key={index} size="small" label={option.label}/>
                                    ))
                                }
                                renderInput={(params) => <TextField label="Vai trò" {...params} />}
                            />


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
                                        <Chip {...getTagProps({index})} key={index} size="small" label={option.label}/>
                                    ))
                                }
                                renderInput={(params) => <TextField label="Môn dạy" {...params} />}
                            />


                        </Box>
                        <Stack alignItems="flex-end" sx={{mt: 3}}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Thêm thành viên
                            </LoadingButton>
                        </Stack>

                </Grid>
            </Grid>
        </FormProvider>
    );
}
