import { paramCase } from 'change-case';
import { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import _ from 'lodash';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui 
import { LoadingButton } from '@mui/lab';
import {
    DataGrid, GridColDef, GridRowModes, GridToolbarContainer, GridActionsCellItem,
} from '@mui/x-data-grid';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import {
    Box,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Tab,
    Tabs,
    Typography, Grid, Stack, TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
import dayjs from "dayjs";
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock_
import { _levelList } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
import { getAllMenu2, createMenu, updateMenu, deleteMenu } from '../../../dataProvider/agent';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { MultiFilePreview, Upload } from '../../../components/upload';
import {
    createDocumentInitialRedux,
    createFolderRedux,
    createStoreFolderRedux,
    getFolderRedux,
    getFolderSavetoDocToMyFolderRedux, getStoreFolderRedux,
} from '/src/redux/slices/folder';
import { postFile, getPeriodActive } from '../../../dataProvider/agent';
// ----------------------------------------------------------------------

function TextCode() {
    var result = 'VIC_' + dayjs(new Date()).format('YYYYMMDDHHmmss');

    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var num = '0123456789';

    for (var index = 0; index < 1; index++) {
        if (Math.floor(Math.random() * 2) === 0) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length)).toUpperCase();
        } else {
            result += num.charAt(Math.floor(Math.random() * num.length));
        }
    }

    return result;
}

// ----------------------------------------------------------------------

createNewDoc.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function createNewDoc() {
    const router = useRouter();
    const { newDocument } = useSelector((state) => state.folder);
    const { user } = useAuthContext();
    const { programs } = newDocument.init;


    const [open, setOpen] = useState(false); //Open Dialog
    const [files, setFiles] = useState([]);
    const [reRender, setReRender] = useState([]);
    const [typeDocuments, setTypeDocuments] = useState(user.subjects[0].typeDocuments);
    const [contentText, setContentText] = useState('');
    const [description, setDescription] = useState('');
    const [fromdate, setFromdate] = useState(dayjs(new Date()));
    const [todate, setTodate] = useState(dayjs(new Date()));

    const [refreshData, setRefreshData] = useState({});
    //call query
    const {
        query: { folderid, foldername },
    } = router;

    const pros = {
        foderid: folderid,
        foldername: foldername
    }

    const methods = useForm({
        defaultValues: {
            items: [
                {
                    code: ``,
                    description: '',
                    file: '',
                    name: '',
                    programId: _.get(programs, '0') ? _.get(programs, '0').id : '',
                    subjectId: _.get(user, 'subjects.0') ? _.get(user, 'subjects.0').id : '',
                    typeDocumentId: _.get(user, `subjects.0.typeDocuments.0`) ? _.get(user, `subjects.0.typeDocuments.0`).id : '',
                    fromdate: '',
                    todate: ''
                },
            ],
        },
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
        if (programs.length == 0) {
            dispatch(createDocumentInitialRedux());
        }
    }, [dispatch]);


    const values = watch();
    const formData = new FormData();
    const handleDrop = useCallback(
        async (acceptedFiles) => {
            try {
                //formData.append('File', acceptedFiles[0]);
                const response = await postFile(formData);
                //setValue('TypeFile', response.data.contentType);
                //setValue('urlDocument', response.data.fileName);
                //setValue('size', response.data.size);
                const newFiles = acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
                setFiles([...files, ...newFiles]);
                setValue('file', [...files, ...newFiles]);
            } catch (error) {
                console.error('handleDrop', error);
            }
        },
        [setValue],
        [files]
    );

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async ({ items }) => {
        if (files.length == 0) {
            setContentText('Bạn hãy chọn file tài liệu trước khi Đăng tải!!!');
            setOpen(true);
        } else {
            const programid = items[0].programId;
            const subjectid = items[0].subjectId;
            const typedocumentid = items[0].typeDocumentId;
            for (let index = files.length - 1; index >= 0; --index) {
                const file = files[files];
                const newFolder = items[index];
                const formData = new FormData();
                formData.append('File', file);
                console.log('formData', formData);
            }
        }
        console.log('onSubmit', items);
    };

    const handleRemoveFile = (inputFile) => {
        const filtered = files.filter((file) => file !== inputFile);
        setFiles(filtered);
    };

    const handlerSubjectChange = (event, index) => {
        var index = event.nativeEvent.target.selectedIndex;
        setTypeDocuments(user.subjects[index].typeDocuments);
        setValue(event.target.name, event.target.value);
        setValue(
            `typeDocumentId`,
            _.get(
                user,
                `subjects.${_.findIndex(user.subjects, {
                    id: Number.parseInt(event.target.value),
                })}.typeDocuments.0`
            )
                ? _.get(
                    user,
                    `subjects.${_.findIndex(user.subjects, {
                        id: Number.parseInt(event.target.value),
                    })}.typeDocuments.0`
                ).id + ''
                : ''
        );
        setReRender({ [event.target.name]: event.target.value });
    };
    return (
        <>
            <Head>
                <title> Hệ thống quản lý Học liệu</title>
            </Head>
            <Container maxWidth={'xl'}>
                <CustomBreadcrumbs
                    heading="Menu hệ thống"
                    links={[
                        { name: 'Trang chủ', href: PATH_DASHBOARD.root },
                        { name: 'Xử lý Tài liệu học liệu', href: PATH_DASHBOARD.processDoc.root },
                        { name: 'Thêm mới tài liệu' },
                    ]}
                />
                <Container maxWidth={'xl'}>
                    <strong style={{
                        color: 'blue',
                        fontSize: 18
                    }}>Bạn đang thêm Tài liệu cho thư mục: {pros.foldername} &nbsp;
                    </strong>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5}>
                                <Card sx={{ p: 3 }}>
                                    <Stack spacing={3}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Ngày bắt đầu</span>
                                            <DatePicker
                                                label="Ngày bắt đầu"
                                                inputFormat="dd/MM/yyyy"
                                                name="fromdate"
                                                value={fromdate}
                                                onChange={(newValue) => {
                                                    setFromdate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Ngày kết thúc</span>
                                            <DatePicker
                                                label="Ngày kết thúc"
                                                inputFormat="dd/MM/yyyy"
                                                name="todate"
                                                value={todate}
                                                onChange={(newValue) => {
                                                    setTodate(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Chương Trình</span>
                                            <RHFSelect name="programId" placeholder="Chương trình">
                                                {!_.isEmpty(programs) &&
                                                    programs.map((option) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                            </RHFSelect>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Môn học</span>
                                            <RHFSelect
                                                name="subjectId"
                                                onChange={handlerSubjectChange}
                                                placeholder="Môn học"
                                            >
                                                {_.get(user, `subjects`) &&
                                                    user.subjects.map((option) => (
                                                        <option key={option.id} value={option.id}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                            </RHFSelect>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Loại</span>
                                            <RHFSelect name="typeDocumentId" placeholder="Loại tài liệu">
                                                {typeDocuments.map((option, index) => (
                                                    <option key={index} value={option.id}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </RHFSelect>
                                        </div>
                                    </Stack>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Card sx={{ p: 3 }}>
                                    <Stack spacing={3}>

                                        <RHFTextField name={`description`} label="Mô tả" multiline rows={3} />

                                        <Stack spacing={1} direction="row" flexWrap="wrap">
                                            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                                                Tập tin
                                            </Typography>
                                            <Upload name="file" multiple files={files} onDrop={handleDrop} onRemove={(file) => handleRemoveFile(file)} />
                                        </Stack>
                                    </Stack>
                                </Card>
                            </Grid>

                        </Grid>
                        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
                        <Stack
                            spacing={2}
                            direction={{ xs: 'column-reverse', md: 'row' }}
                            alignItems={{ xs: 'flex-start', md: 'center' }}
                            sx={{ mt: -2, mb: 1 }}
                        >
                            <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    loading={isSubmitting}
                                >
                                    Đăng tải tài liệu
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </FormProvider>
                </Container>
            </Container>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thông báo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
