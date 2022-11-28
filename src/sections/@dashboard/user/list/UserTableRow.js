import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Chip,
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.array,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function UserTableRow({ data, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { id, firstName, lastName, email, roles, gender, phone, address, birthDate, enable } = data;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={`http://lmms.site:7070/assets/images/avatars/avatar_${gender * 10 + (id % 10) + 1 + 1}.jpg`} />

            <Typography variant="subtitle2" noWrap>
              {`${firstName} ${lastName}`}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{email}</TableCell>

        <TableCell align="left">{gender ? 'Nữ' : 'Nam'}</TableCell>

        <TableCell align="left">{new Date(birthDate)?.toLocaleDateString().padStart(10, '0')}</TableCell>
        <TableCell align="left">{phone}</TableCell>
        <TableCell align="left">{address}</TableCell>

        <TableCell>
          {roles.map((r) =>
            r === null || '' ? (
              <Label></Label>
            ) : (
              <Label
                key={r.id}
                variant="soft"
                color={(status === 'banned' && 'error') || 'success'}
                sx={{ textTransform: 'capitalize' }}
              >
                {r.name}
              </Label>
            )
          )}
        </TableCell>

        <TableCell align="left">
          {enable ? <Chip label="Không hiệu lực" /> : <Chip color="primary" label="Có hiệu lực" />}
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 140 }}>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Vô hiệu hóa
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Cập nhật
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
