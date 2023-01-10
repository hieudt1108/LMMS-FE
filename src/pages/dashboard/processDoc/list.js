import { paramCase } from 'change-case';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

// next
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui 
import {
    DataGrid, GridColDef, GridRowModes, GridToolbarContainer, GridActionsCellItem,
} from '@mui/x-data-grid';
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
import {
    Tab,
    Tabs,
    Card,
    Table,
    Button,
    Tooltip,
    Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer, Box, Pagination, Stack, AppBar, Toolbar, Badge
} from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Typography from '@mui/material/Typography';
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
import { getCommonFiles, createMenu, updateMenu, deleteMenu, getFolderTree } from '../../../dataProvider/agent';
import { useSnackbar } from '../../../components/snackbar';
import { FolderIcon } from '@mui/icons-material/Folder';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import AddDocFormDialog from '../../../sections/@dashboard/processDoc/AddDocFormDialog';
import { dispatch } from 'src/redux/store';
import {
    createDocumentInitialRedux,
    createFolderRedux,
    createStoreFolderRedux,
    getFolderRedux,
    getFolderSavetoDocToMyFolderRedux, getStoreFolderRedux,
} from '/src/redux/slices/folder';
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

ProcessDocPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        height: 500,
        flexGrow: 1,
        maxWidth: 300
    }
}));
const styles = () => ({
    selected: {
        '&:focus': {
            backgroundColor: 'red',
        },
    },
});

export default function ProcessDocPage() {
    const router = useRouter();
    const [open, setOpen] = useState(false); //Open Dialog 
    const [data, setData] = useState({}); //Set Data Tree
    const [gridrows, setGridrows] = useState([]); //Set Data Grid
    const [selected, setSelected] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const { themeStretch } = useSettingsContext();
    const { push } = useRouter();
    const [disabled, setDisabled] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [expanded, setExpanded] = useState(["72"]);
    const classes = useStyles();
    const [foldername, setFolderName] = useState("");
    const [folderid, setFolderID] = useState(null);
    const [openFormUploadDocument, setOpenFormUploadDocument] = useState(false);

    const fetchGridData = async (id, name) => {
        console.log('ON fetchGridData', id)
        const response = await getCommonFiles(id);
        const json = await response.data;
        setGridrows(json.data);
        console.log(json.data);
        setFolderName(name);
        setFolderID(id);
        console.log(name);
    }

    const handleOpenFormUploadDocument = async () => {
        if (folderid == 0) {
            setOpen(true);
        } else {
            await dispatch(createDocumentInitialRedux());
            router.push({
                pathname: "/dashboard/processDoc/createNewDoc",
                query: {
                    folderid: folderid,
                    foldername: foldername
                }
            });
        }
        //setOpenFormUploadDocument(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSelectedItems = (event, nodeid) => {
        console.log('ON fetchGridData', nodeid);
        fetchGridData(nodeid);
    };


    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id ? nodes.id : "defaultNodeId"} label={nodes.name ? nodes.name : "defaultNodeName"}
            onClick={() => fetchGridData(nodes.id, nodes.name)}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
        </TreeItem>
    );

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    const SelectRowClick = (row) => {
        const currentRow = row;
        return alert(JSON.stringify(currentRow, null, 4));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'code',
            headerName: 'Mã file',
            width: 200,
        },
        {
            field: 'name',
            headerName: 'Tên file',
            width: 250,
        },
        {
            field: 'fullname',
            headerName: 'Người tạo',
            width: 150,
        },
        {
            field: 'createDate',
            valueFormatter: params =>
                moment(params?.value).format("DD/MM/YYYY"),
            headerName: 'Ngày tạo',
            width: 100,
            align: 'left'
        },
        {
            width: 120,
            field: "a",
            headerName: "",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => SelectRowClick(row)} variant="outlined" color="primary" size="small">
                    Xem chi tiết
                </Button>,
        },
        {
            width: 180,
            field: "b",
            headerName: "",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => SelectRowClick(row)} variant="outlined" color="info" size="small">
                    Sửa thông tin
                </Button>,
        },

    ];

    const handleChange = (event, nodes) => {
        setExpanded(nodes);
        console.log(nodes);
    };

    const fetchFolderTreeData = async () => {
        console.log('ON fetchFolderTreeData')
        const response = await getFolderTree()
        const json = await response.data;
        setData(json.data[0]);
        console.log(json.data);
    };
    useEffect(() => {
        if (!loaded) {
            fetchFolderTreeData();
            fetchGridData(0);
            console.log(data);
            setLoaded(true);
            console.log('xxx');
        }
    }, [gridrows]);
    return (
        <>
            <Head>
                <title> Hệ thống quản lý Học liệu</title>
            </Head>
            <Container maxWidth={'xl'}>
                <CustomBreadcrumbs
                    heading="Xử lý học liệu"
                    links={[
                        { name: 'Trang chủ', href: PATH_DASHBOARD.root },
                        { name: 'Xử lý Tài liệu học liệu', href: PATH_DASHBOARD.processDoc.root },
                        { name: 'Danh sách' },
                    ]}
                />
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Item>
                            <TreeView
                                defaultCollapseIcon={<ArrowDropDownIcon />}
                                defaultExpandIcon={<ArrowRightIcon />}
                                defaultEndIcon={<div style={{ width: 18 }} />}
                                sx={{ height: 'auto', flexGrow: 1, maxWidth: 250, overflowY: 'auto' }}
                                //onNodeSelect={handleSelectedItems}
                                expanded={expanded}
                                onNodeToggle={handleChange}
                            >
                                {renderTree(data)}
                            </TreeView>
                        </Item>
                    </Grid>
                    <Grid item xs={10}>
                        <Item>
                            <Box sx={{ height: 650, width: '100%' }}>
                                <strong style={{
                                    color: 'blue',
                                    fontSize: 18
                                }}>Bạn đã chọn Thư mục: {foldername} &nbsp;
                                    <Tooltip title="Tạo thư mục học liệu" placement="top">
                                        <Button variant="outlined" startIcon={<AddIcon />} size="small">
                                            <FolderOpenIcon />
                                        </Button>
                                    </Tooltip>
                                </strong>

                                <AppBar position="static">
                                    <Toolbar variant="dense">
                                        <Box sx={{ flexGrow: 1 }} />
                                        <Tooltip title="Thêm tài liệu" placement="top">
                                            <IconButton
                                                size="small"
                                                edge="start"
                                                color="inherit"
                                                aria-label="open drawer"
                                                sx={{ mr: 2 }}
                                                onClick={handleOpenFormUploadDocument}
                                            >
                                                <AddToDriveIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                            <IconButton size="small" aria-label="show 4 new mails" color="inherit">
                                                <Badge badgeContent={4} color="error">
                                                    <MailIcon />
                                                </Badge>
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                aria-label="show 17 new notifications"
                                                color="inherit"
                                            >
                                                <Badge badgeContent={17} color="error">
                                                    <NotificationsIcon />
                                                </Badge>
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                edge="end"
                                                aria-label="account of current user"
                                                aria-haspopup="true"
                                                color="inherit"
                                            >
                                                <AccountCircle />
                                            </IconButton>
                                        </Box>
                                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                            <IconButton
                                                size="small"
                                                aria-label="show more"
                                                aria-haspopup="true"
                                                color="inherit"
                                            >
                                                <MoreIcon />
                                            </IconButton>
                                        </Box>
                                    </Toolbar>
                                </AppBar>
                                <DataGrid
                                    rows={gridrows}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                />
                            </Box>
                        </Item>
                    </Grid>
                </Grid>
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
                            Bạn chưa chọn Thư mục Học liệu!!!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Đóng
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}
