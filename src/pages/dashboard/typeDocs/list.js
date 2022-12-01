import {paramCase} from 'change-case';
import {useEffect, useState} from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
// @mui
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
    TableContainer,
} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../routes/paths';
// _mock_
import {_typeDocumentList} from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import {useSettingsContext} from '../../../components/settings';
import {
    useTable,
    getComparator,
    emptyRows,
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '../../../components/table';
// sections
import {TypeDocsTableToolbar, TypeDocsTableRow} from '../../../sections/@dashboard/typeDocs/list';
import {deleteTypeDocument, getAllTypeDocument} from "../../../dataProvider/agent";
import {useSnackbar} from "../../../components/snackbar";

// ----------------------------------------------------------------------


const TABLE_HEAD = [
    {id: 'name', label: 'Tên loại tài liệu', align: 'left'},
    {id: 'description', label: 'Ngày tạo', align: 'left'},
    {id: ''},
];

// ----------------------------------------------------------------------

TypeDocsListPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function TypeDocsListPage() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const {enqueueSnackbar} = useSnackbar();

    const {themeStretch} = useSettingsContext();

    const {push} = useRouter();

    const [tableData, setTableData] = useState(_typeDocumentList);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [filterName, setFilterName] = useState('');

    const [listTypeDocs, setListTypeDocs] = useState([]);

    const dataFiltered = applyFilter({
        inputData: listTypeDocs,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 52 : 72;

    const isFiltered = filterName !== '';

    const isNotFound =
        (!dataFiltered.length && !!filterName);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleFilterStatus = (event, newValue) => {
        setPage(0);
        setFilterStatus(newValue);
    };

    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };


    const handleDeleteRow = async (id) => {
        const response = await deleteTypeDocument(id)
        if (response.status < 400) {
            setSelected([]);
            await fetchTypeDocs();
            enqueueSnackbar('Xóa cấp học thành công');
        } else {
            enqueueSnackbar('Xóa cấp học thất bại');
        }

        if (page > 0) {
            if (dataInPage.length < 2) {
                setPage(page - 1);
            }
        }
    };

    const handleDeleteRows = async (selected) => {
        const response = await deleteTypeDocument(selected)
        if (response.status < 400) {
            setSelected([]);
            await fetchTypeDocs();
            enqueueSnackbar('Xóa cấp học thành công');
        } else {
            enqueueSnackbar('Xóa cấp học thất bại');
        }

        if (page > 0) {
            if (selected.length === dataInPage.length) {
                setPage(page - 1);
            } else if (selected.length === dataFiltered.length) {
                setPage(0);
            } else if (selected.length > dataInPage.length) {
                const newPage = Math.ceil((listTypeDocs.length - selected.length) / rowsPerPage) - 1;
                setPage(newPage);
            }
        }
    };

    const handleEditRow = (id) => {
        push(PATH_DASHBOARD.type_documents.edit(id));
    };

    const handleResetFilter = () => {
        setFilterName('');
    };

    useEffect(() => {
        fetchTypeDocs();
    }, []);

    async function fetchTypeDocs() {
        const res = await getAllTypeDocument({pageIndex: 1, pageSize: 100});
        console.log(res.data)
        if (res.status < 400) {
            setListTypeDocs(res.data);
        } else {
            console.log(res.message);
        }
    }

    return (
        <>
            <Head>
                <title> Hệ thống quản lý Học liệu</title>
            </Head>

            <Container maxWidth={'xl'}>
                <CustomBreadcrumbs
                    heading="Danh sách loại tài liệu"
                    links={[
                        {name: 'Trang chủ', href: PATH_DASHBOARD.root},
                        {name: 'Loại tài liệu', href: PATH_DASHBOARD.type_documents.root},
                        {name: 'Danh sách'},
                    ]}
                    action={
                        <NextLink href={PATH_DASHBOARD.type_documents.new} passHref>
                            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}>
                                Thêm loại tài liệu
                            </Button>
                        </NextLink>
                    }
                />

                <Card>

                    <Divider/>

                    <TypeDocsTableToolbar
                        isFiltered={isFiltered}
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        onResetFilter={handleResetFilter}
                    />

                    <TableContainer sx={{position: 'relative', overflow: 'unset'}}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={listTypeDocs.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    listTypeDocs.map((row) => row.id)
                                )
                            }
                            action={
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={handleOpenConfirm}>
                                        <Iconify icon="eva:trash-2-outline"/>
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{minWidth: 800}}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={listTypeDocs.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            listTypeDocs.map((row) => row.id)
                                        )
                                    }
                                />

                                <TableBody>
                                    {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((typeDocs) => (
                                        <TypeDocsTableRow
                                            key={typeDocs.id}
                                            row={typeDocs}
                                            selected={selected.includes(typeDocs.id)}
                                            onSelectRow={() => onSelectRow(typeDocs.id)}
                                            onDeleteRow={() => handleDeleteRow(typeDocs.id)}
                                            onEditRow={() => handleEditRow(typeDocs.id)}
                                        />
                                    ))}

                                    <TableEmptyRows height={denseHeight}
                                                    emptyRows={emptyRows(page, rowsPerPage, listTypeDocs.length)}/>

                                    <TableNoData isNotFound={isNotFound}/>
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                    <TablePaginationCustom
                        labelRowsPerPage='Hàng trên mỗi trang'
                        count={dataFiltered.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        //
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />
                </Card>
            </Container>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Xóa"
                content={
                    <>
                        Bạn có chắc chắn muốn xóa <strong> {selected.length} </strong>?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows(selected);
                            handleCloseConfirm();
                        }}
                    >
                        Xóa
                    </Button>
                }
            />
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({inputData, comparator, filterName}) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter((typeDocs) => typeDocs.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }


    return inputData;
}
