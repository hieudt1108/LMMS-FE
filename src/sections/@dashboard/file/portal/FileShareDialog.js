import PropTypes from 'prop-types';
// @mui
import { List, Stack, Dialog, Button, TextField, DialogTitle, DialogActions, DialogContent } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//
import FileInvitedItem from '../FileInvitedItem';
import { FolderUserSearch } from '../../folder';
import { useCallback, useEffect } from 'react';
import { dispatch } from 'src/redux/store';
import { getOneDocumentRedux, handleSendInviteRedux } from 'src/redux/slices/document';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

FileShareDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function FileShareDialog({ open, onClose, ...other }) {
  const { getOne } = useSelector((state) => state.document);
  const hasShared = getOne && !!getOne.listShare.length;
  // console.log('FileShareDialog', getOne);

  const handleSendInvite = useCallback(() => {
    console.log('handleSendInvite');
    dispatch(handleSendInviteRedux(getOne));
  }, [getOne]);
  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
        <DialogTitle> Invite </DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <FolderUserSearch />
            <Button variant="contained" sx={{ flexShrink: 0 }} onClick={handleSendInvite}>
              Send Invite
            </Button>
          </Stack>

          {hasShared && (
            <Scrollbar sx={{ maxHeight: 60 * 6 }}>
              <List disablePadding>
                {getOne.listShare.map(({ user, permission }, index) => (
                  <FileInvitedItem key={user.id} user={user} permissionDefault={permission} index={index} />
                ))}
              </List>
            </Scrollbar>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          {onClose && (
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
