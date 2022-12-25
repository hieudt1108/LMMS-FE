import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  IconButton,
  TableContainer,
  Pagination,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import MenuPopover from '../../../../components/menu-popover';
import { TableHeadCustom } from '../../../../components/table';
import {dispatch} from "../../../../redux/store";
import {getOneDocumentRedux, startDownloadFileRedux} from "../../../../redux/slices/document";
import {FileShareDialog} from "../../file";
import {URL_GLOBAL} from "../../../../config";
import {useSnackbar} from "../../../../components/snackbar";
import ConfirmDialog from "../../../../components/confirm-dialog";
import {deleteDocumentInSubjectRedux} from "../../../../redux/slices/subject";
import {deleteDocumentInFolderRedux, deleteDocumentInStoreFolderRedux} from "../../../../redux/slices/folder";

// ----------------------------------------------------------------------

AppNewInvoice.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function AppNewInvoice({
  handlePageChange,
  title,
  paging,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData?.map((row) => (
                <AppNewInvoiceRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <></>
        <Pagination
          size="small"
          count={paging?.TotalPages}
          rowsperpage={paging?.PageSize}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
function AppNewInvoiceRow({ row }) {
  const { enqueueSnackbar } = useSnackbar();
  const [openPopover, setOpenPopover] = useState(null);
  const [openShare, setOpenShare] = useState(false);
  const [openConfirmDeleteFile, setOpenConfirmDeleteFile] = useState(false);
  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDownload = async () => {
    handleClosePopover();
    handleClosePopover();
    const message = await dispatch(startDownloadFileRedux(row.document, URL_GLOBAL.DOWNLOAD_FILE));
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
  };


  const handleOpenShare = async () => {
    handleClosePopover();
    console.log('row.document.id',row.document.id)
    // await dispatch(getOneDocumentRedux(row.document.id));
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleDeleteFile = async () => {
      const message = await dispatch(deleteDocumentInFolderRedux(row.document.id));
      if (message) {
        enqueueSnackbar(message.title, { variant: message.variant });
        setOpenConfirmDeleteFile(false);
      } else {
      enqueueSnackbar(`Đã có lỗi xảy ra`, { variant: `error` });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{row.document.code}</TableCell>

        <TableCell>{row.document.name}</TableCell>

        <TableCell>{fDate(row.document.createDate)}</TableCell>

        <TableCell>
          {row.userDto.firstName} {row.userDto.lastName}
        </TableCell>

        <TableCell>{row.userDto.email}</TableCell>

        <TableCell>{row.userDto.phone}</TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:download-fill" />
          Tải xuống
        </MenuItem>

        <MenuItem onClick={handleOpenShare}>
          <Iconify icon="eva:share-fill" />
          Chia sẻ
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
            onClick={() => {
              handleClosePopover();
              setOpenConfirmDeleteFile(true);
            }}
            sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Xóa
        </MenuItem>
      </MenuPopover>
      {openShare && (
          <FileShareDialog
              file={row.document}
              open={openShare}
              data={row.document}
              onClose={() => {
                handleCloseShare();
              }}
          />
      )}
      {openConfirmDeleteFile && (
          <ConfirmDialog
              open={openConfirmDeleteFile}
              onClose={() => setOpenConfirmDeleteFile(false)}
              title="Xóa Tài Liệu"
              content="Bạn có chắc chắn muốn xóa tài liệu này?"
              action={
                <Button variant="contained" color="error" onClick={handleDeleteFile}>
                  Xóa
                </Button>
              }
          />
      )}
    </>
  );
}
