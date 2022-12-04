import PropTypes from 'prop-types';
// @mui
import { List, Stack, Dialog, Button, TextField, DialogTitle, DialogActions, DialogContent } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//
import FileInvitedItem from '../FileInvitedItem';
import { FolderUserSearch } from '../../folder';

// ----------------------------------------------------------------------

FileShareDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  shared: PropTypes.array,
  inviteEmail: PropTypes.string,
  onChangeInvite: PropTypes.func,
};

export default function FileShareDialog({
  shared,
  inviteEmail,
  onChangeInvite,
  //
  open,
  onClose,
  ...other
}) {
  const hasShared = shared && !!shared.length;

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
        <DialogTitle> Invite </DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          {onChangeInvite && (
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <FolderUserSearch />
              <Button disabled={!inviteEmail} variant="contained" sx={{ flexShrink: 0 }}>
                Send Invite
              </Button>
            </Stack>
          )}

          {hasShared && (
            <Scrollbar sx={{ maxHeight: 60 * 6 }}>
              <List disablePadding>
                {shared.map((person) => (
                  <FileInvitedItem key={person.id} person={person} />
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
