import PropTypes, { any } from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import {
    Card,
    Checkbox,
    Dialog,
    Stack,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Button,
} from '@mui/material';
// components
import {
    emptyRows,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableNoData,
    TableSelectedAction,
    useTable,
} from '../../../components/table';
import { useSnackbar } from '../../../components/snackbar';
import { useSettingsContext } from '../../../components/settings';
import Scrollbar from '../../../components/scrollbar';
import { SlotTableToolbar } from '../slot/list';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: 'name', label: 'Tên tiết học', align: 'left' }];

SlotListDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    data: any,
};

export default function SlotListDialog({ open, onClose, onSelect, listSlots, selectedSlot }) {
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

    const { id, name } = listSlots;

    const { enqueueSnackbar } = useSnackbar();

    const { themeStretch } = useSettingsContext();

    const [openConfirm, setOpenConfirm] = useState(false);

    const [filterName, setFilterName] = useState('');

    const [listSlotChecked, setListSlotChecked] = useState([]);

    const dataFiltered = applyFilter({
        inputData: listSlots,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 52 : 72;

    const isFiltered = filterName !== '';

    const isNotFound = !dataFiltered.length && !!filterName;

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleResetFilter = () => {
        setFilterName('');
    };

    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleGetId = (slot, event) => {
        setPage(0);
        onSelectRow(slot);
        if (event.target.checked) {
            setListSlotChecked((prev) => [...prev, slot]);
        } else {
            setListSlotChecked((prev) => {
                const filtered = prev.filter((prevSlot) => prevSlot.id != slot.id);
                console.log(filtered);
                return filtered;
            });
        }
    };

    const handleSelectSlots = (slot) => {
        console.log(selected);
        onSelect(slot);
        setFilterName('');
        onClose();
    };

    const sendListSlot = () => {};

    useEffect(() => {
        if (selectedSlot?.length > 0) {
            setSelected(selectedSlot);
        }
    }, [selectedSlot]);

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 2.5, px: 3 }}>
                <Typography variant="h6"> Chọn tiết học </Typography>

                <Button
                    size="small"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    // onClick={sendListSlot}
                    onClick={() => handleSelectSlots(selected)}
                    sx={{ alignSelf: 'flex-end' }}
                >
                    {selected?.length > 0 ? 'Thay đổi' : 'Thêm'}
                </Button>
            </Stack>
            <>
                <Card>
                    <Divider />

                    <SlotTableToolbar
                        isFiltered={isFiltered}
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        onResetFilter={handleResetFilter}
                    />

                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <TableSelectedAction
                            dense={dense}
                            numSelected={selected.length}
                            rowCount={listSlots.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    listSlots.map((row) => row.id)
                                )
                            }
                        />

                        <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8 }}>
                            <Table size={dense ? 'small' : 'medium'}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={listSlots.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            listSlots.map((row) => row)
                                        )
                                    }
                                />

                                <TableBody>
                                    {listSlots.map((slot) => (
                                        <TableRow hover selected={selected.includes(slot)}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onChange={(event) => {
                                                        handleGetId(slot, event);
                                                    }}
                                                    checked={selected.map((item) => item.id).includes(slot.id)}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {slot.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, listSlots.length)} />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                </Card>
            </>
        </Dialog>
    );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter((slot) => slot.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }

    return inputData;
}
