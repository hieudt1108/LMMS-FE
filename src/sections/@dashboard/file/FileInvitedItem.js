import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, Button, Divider, Tooltip, ListItem, MenuItem, ListItemText, ListItemAvatar } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { handleChangePermissionRedux } from 'src/redux/slices/document';

// ----------------------------------------------------------------------

export default function FileInvitedItem({ index }) {
  const { getOne } = useSelector((state) => state.document);
  console.log('FileInvitedItem', getOne, index);
  const { user, permission: permissionDefault } = getOne.listShare[index];
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangePermission = (permissionId) => {
    dispatch(handleChangePermissionRedux(getOne, user, index, permissionId));
  };

  return (
    <>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar
            src={`http://lmms.site:7070/assets/images/avatars/avatar_${
              (1 - user.gender) * 10 + (user.id % 10) + 1
            }.jpg`}
            alt={user.firstName + user.lastName}
          />
        </ListItemAvatar>

        <ListItemText
          primary={user.firstName + ' ' + user.lastName}
          secondary={
            <Tooltip title={user.email}>
              <span>{user.email}</span>
            </Tooltip>
          }
          primaryTypographyProps={{ noWrap: true, typography: 'subtitle2' }}
          secondaryTypographyProps={{ noWrap: true }}
          sx={{ flexGrow: 1, pr: 1 }}
        />

        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
          onClick={handleOpenPopover}
          sx={{
            flexShrink: 0,
            textTransform: 'unset',
            fontWeight: 'fontWeightMedium',
            '& .MuiButton-endIcon': {
              ml: 0,
            },
            ...(openPopover && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          Can {permissionDefault ? 'Edit' : 'View'}
        </Button>
      </ListItem>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 160 }}>
        <>
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleChangePermission(0);
            }}
            sx={{
              ...(permissionDefault === 0 && {
                bgcolor: 'action.selected',
              }),
            }}
          >
            <Iconify icon="eva:eye-fill" />
            Can view
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleChangePermission(1);
            }}
            sx={{
              ...(permissionDefault === 1 && {
                bgcolor: 'action.selected',
              }),
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Can edit
          </MenuItem>

          <Divider sx={{ borderStyle: 'dashed' }} />

          {/* <MenuItem
            onClick={() => {
              handleClosePopover();
              handleChangePermission(2);
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Remove
          </MenuItem> */}
        </>
      </MenuPopover>
    </>
  );
}
