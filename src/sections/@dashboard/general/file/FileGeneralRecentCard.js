import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
// @mui
import { AvatarGroup, Box, Button, Checkbox, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
// utils

// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import MenuPopover from '../../../../components/menu-popover';
import FileThumbnail, { fileFormat } from '../../../../components/file-thumbnail';
import { memo } from 'react';
// POPUP
import { FileDetailsDrawer, FileShareDialog } from '../../file';
import { postDocumentsInSlot } from '../../../../dataProvider/agent';
import { dispatch } from 'src/redux/store';
import { getOneDocumentRedux, startDownloadFileRedux } from 'src/redux/slices/document';
import { deleteDocumentInFolderRedux } from '../../../../redux/slices/folder';

import ConfirmDialog from 'src/components/confirm-dialog';
import { URL_GLOBAL } from '../../../../config';

// ----------------------------------------------------------------------

const FileGeneralRecentCard = ({
  dataGeneralFolder,
  file,
  onDelete,
  dataStoreFolder,
  dataUploadDocsToSlot,
  handleOpenPopupSaveInMyFolder,
  sx,
  ...other
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();
  const [rerender, setRerender] = useState('');

  const isDesktop = useResponsive('up', 'sm');

  const [openPopover, setOpenPopover] = useState(null);

  const [favorite, setFavorite] = useState(file.isFavorite);

  const [openShare, setOpenShare] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleOpenShare = async () => {
    handleClosePopover();
    await dispatch(getOneDocumentRedux(file.id));
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenDetails = async () => {
    // Chia sẻ lên thư mục chung
    if (dataGeneralFolder) {
      setOpenConfirm(true);
      return;
    }
    // mở detail trong thư mục
    else {
      await dispatch(getOneDocumentRedux(file.id));
      setOpenDetails(true);
    }
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDownloadFile = async () => {
    handleClosePopover();
    const message = await dispatch(startDownloadFileRedux(file, URL_GLOBAL.DOWNLOAD_FILE));
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
  };

  const handleDeleteDocument = async () => {
    console.log('handleDeleteDocument');
    handleClosePopover();
    const message = await dispatch(deleteDocumentInFolderRedux(file.id));
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
  };

  const handleAddDocumentToSlot = async (classId, documentId, slotId, subjectId) => {
    console.log('postData', classId, documentId, slotId, subjectId);
    const res = await postDocumentsInSlot(classId, documentId, slotId, subjectId);
    console.log('postData', res);
    if (res.status < 400) {
      enqueueSnackbar('Thêm tài liệu vào tiết học thành công');
      window.location.reload();
    } else {
      enqueueSnackbar('Thêm tài liệu vào tiết học thất bại', { variant: 'error' });
    }
  };

  const handlePreviewFile = useCallback(() => {
    window.open(`${URL_GLOBAL.VIEW_FILE}${file.urlDocument}`, '_blank', 'noopener,noreferrer');
  }, []);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Stack
        spacing={isDesktop ? 1.5 : 2}
        direction={isDesktop ? 'row' : 'column'}
        alignItems={isDesktop ? 'center' : 'flex-start'}
        sx={{
          p: 2.5,
          borderRadius: 2,
          position: 'relative',
          border: (theme) => `solid 1px ${theme.palette.divider}`,
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
            cursor: 'pointer',
          },
          ...(isDesktop && {
            p: 1.5,
            borderRadius: 1.5,
          }),
          ...sx,
        }}
        {...other}
      >
        <FileThumbnail file={file.typeFile} sx={{ width: 50, height: 50 }} imgSx={{ borderRadius: 1 }} />

        <Stack
          onClick={handleOpenDetails}
          sx={{
            width: 1,
            flexGrow: { sm: 1 },
            minWidth: { sm: '1px' },
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {file.name}
          </Typography>

          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
          >
            <Box> {fileFormat(file.typeFile)} </Box>
          </Stack>
        </Stack>

        {isDesktop && (
          <AvatarGroup
            max={4}
            sx={{
              mx: 1.5,
              '& .MuiAvatarGroup-avatar': {
                width: 24,
                height: 24,
                '&:first-of-type': {
                  fontSize: 12,
                },
              },
            }}
          >
            {file?.shared?.map((person) => (
              <Avatar key={person.id} alt={person.name} src={person.avatar} />
            ))}
          </AvatarGroup>
        )}

        <Box
          sx={{
            top: 8,
            right: 8,
            flexShrink: 0,
            position: 'absolute',
            ...(isDesktop && {
              position: 'unset',
            }),
          }}
        >
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorite}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          />

          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Stack>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 220 }}>
        {(file.typeFile == 'audio/mpeg' ||
          file.typeFile == 'video/mp4' ||
          file.typeFile == 'image/jpeg' ||
          file.typeFile == 'image/png' ||
          file.typeFile == 'application/pdf') && (
          <MenuItem onClick={handlePreviewFile}>
            <Iconify icon="eva:link-2-fill" />
            Xem trước
          </MenuItem>
        )}
        {dataStoreFolder && (
          <MenuItem onClick={() => handleOpenPopupSaveInMyFolder({ document: file })}>
            <Iconify icon="simple-line-icons:docs" />
            Tải về kho của tôi
          </MenuItem>
        )}

        <MenuItem onClick={handleDownloadFile}>
          <Iconify icon="eva:download-outline" />
          Tải xuống
        </MenuItem>

        {!dataGeneralFolder && !dataStoreFolder && (
          <MenuItem onClick={handleOpenShare}>
            <Iconify icon="eva:share-fill" />
            Chia sẻ
          </MenuItem>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDeleteDocument} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Xóa
        </MenuItem>
      </MenuPopover>

      {openDetails && (
        <FileDetailsDrawer
          // data={file}
          favorite={false}
          onFavorite={handleFavorite}
          open={openDetails}
          onClose={handleCloseDetails}
        />
      )}

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Xóa"
        content={<>Bạn có chắc chắn muốn thêm tài liệu ?</>}
        action={
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              if (dataGeneralFolder && dataUploadDocsToSlot == null) {
                dataGeneralFolder.handleUploadDocumentToStoreFolder(file.id);
              } else if (dataUploadDocsToSlot) {
                handleAddDocumentToSlot(
                  dataUploadDocsToSlot.classId,
                  file.id,
                  dataUploadDocsToSlot.slotId,
                  dataUploadDocsToSlot.subjectId
                );
              }
              handleCloseConfirm();
            }}
          >
            Thêm tài liệu
          </Button>
        }
      />
      {openShare && (
        <FileShareDialog
          file={file}
          open={openShare}
          data={file}
          onClose={() => {
            handleCloseShare();
          }}
        />
      )}
    </>
  );
};

export default FileGeneralRecentCard;
