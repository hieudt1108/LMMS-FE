import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Card, Stack, Button, Divider, MenuItem, Checkbox, IconButton } from '@mui/material';
// hooks
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import TextMaxLine from '../../../../components/text-max-line';
import { useSnackbar } from '../../../../components/snackbar';
import ConfirmDialog from '../../../../components/confirm-dialog';
import FileShareDialog from '../portal/FileShareDialog';
import FileNewFolderDialog from '../portal/FileNewFolderDialog';

import { dispatch } from 'src/redux/store';
import {
  deleteSubFolderInFolderRedux,
  getFolderRedux,
  getFolderUploadDocRedux,
  updateSubFolderRedux,
} from 'src/redux/slices/folder';
import { getStoreFolderRedux } from 'src/redux/slices/storeFolder';

export default function FileFolderCard({
  dataGeneralFolder,
  dataStoreFolder,
  folder,
  selected,
  onSelect,
  onDelete,
  sx,
  ...other
}) {
  console.log('FileFolderCard', folder);

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const [inviteEmail, setInviteEmail] = useState('');

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [openShare, setOpenShare] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [folderName, setFolderName] = useState(folder.name);

  const [openEditFolder, setOpenEditFolder] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const [favorited, setFavorited] = useState(folder.isFavorited);

  const handleFavorite = () => {
    setFavorited(!favorited);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleShowCheckbox = () => {
    // console.log('handleShowCheckbox');
    // setShowCheckbox(true);
    // router.push({
    //   pathname: `${PATH_DASHBOARD.general.file}/[pid]`,
    //   query: { pid: '/project/work' },
    // });
  };

  const handleHideCheckbox = () => {
    setShowCheckbox(false);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenEditFolder = () => {
    setOpenEditFolder(true);
  };

  const handleCloseEditFolder = () => {
    setOpenEditFolder(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeInvite = (event) => {
    setInviteEmail(event.target.value);
  };

  const handleCopy = () => {
    enqueueSnackbar('Copied!');
    copy(folder.url);
  };

  const handleOnClickFileFolderCard = (folderID) => {
    if (dataGeneralFolder) {
      return dispatch(getFolderUploadDocRedux(folderID));
    }
    dispatch(getFolderRedux(folderID));
  };

  const handleDeleteFolder = async () => {
    console.log('handleDeleteDocument');
    const message = await dispatch(deleteSubFolderInFolderRedux(folder.id));
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
    handleCloseConfirm();
  };

  const handleUpdateSubFolder = async () => {
    handleCloseEditFolder();
    setFolderName(folderName);
    const message = await dispatch(updateSubFolderRedux(folder.id, { name: folderName }));
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
  };

  return (
    <>
      <Card
        onMouseEnter={handleShowCheckbox}
        onMouseLeave={handleHideCheckbox}
        sx={{
          p: 2.5,
          width: 1,
          maxWidth: 222,
          boxShadow: 0,
          bgcolor: 'background.default',

          border: (theme) => `solid 1px ${theme.palette.divider}`,
          ...((showCheckbox || selected) && {
            borderColor: 'transparent',
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        {...other}
      >
        <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
          <Checkbox
            color="warning"
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorited}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          />
          {!dataGeneralFolder && (
            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </Stack>

        {(showCheckbox || selected) && onSelect ? (
          <Checkbox
            checked={selected}
            onClick={onSelect}
            icon={<Iconify icon="eva:radio-button-off-fill" />}
            checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          />
        ) : (
          <Box
            onClick={() => handleOnClickFileFolderCard(folder.id)}
            component="img"
            src="/assets/icons/files/ic_folder.svg"
            sx={{
              width: 40,
              height: 40,
              '&:hover': {
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z20,
                cursor: 'pointer',
              },
            }}
          />
        )}

        <TextMaxLine variant="h6" onClick={handleOpenDetails} sx={{ mt: 1, mb: 0.5 }}>
          {folder.name}
        </TextMaxLine>
      </Card>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleOpenEditFolder();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Đổi tên
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Xóa
        </MenuItem>
      </MenuPopover>

      {/* <FileDetailsDrawer
        item={folder}
        favorited={favorited}
        onFavorite={handleFavorite}
        onCopyLink={handleCopy}
        open={openDetails}
        onClose={handleCloseDetails}
        onDelete={() => {
          handleCloseDetails();
          onDelete();
        }}
      /> */}
      {openShare && (
        <FileShareDialog
          open={openShare}
          shared={folder.shared}
          inviteEmail={inviteEmail}
          onChangeInvite={handleChangeInvite}
          onCopyLink={handleCopy}
          onClose={() => {
            handleCloseShare();
            setInviteEmail('');
          }}
        />
      )}

      {openEditFolder && (
        <FileNewFolderDialog
          open={openEditFolder}
          onClose={handleCloseEditFolder}
          title="Edit Folder"
          onUpdate={handleUpdateSubFolder}
          folderName={folderName}
          onChangeFolderName={(event) => setFolderName(event.target.value)}
        />
      )}

      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title="Xóa thư mục"
          content="Bạn có chắc chắn muốn xóa thư mục này?"
          action={
            <Button variant="contained" color="error" onClick={handleDeleteFolder}>
              Xóa
            </Button>
          }
        />
      )}
    </>
  );
}
