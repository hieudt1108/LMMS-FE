import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import MenuPopover from '../../../../components/menu-popover';
import { TableHeadCustom } from '../../../../components/table';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useSnackbar } from '../../../../components/snackbar';
import { removeMemberInClass } from '../../../../dataProvider/agent';

// ----------------------------------------------------------------------

ClassTeacher.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function ClassTeacher({
  classID,
  fetchMyClass,
  myClass,
  user,
  title,
  subheader,
  tableLabels,
  tableData,
  ...other
}) {
  const {
    query: { myclass_id },
  } = useRouter();
  const { push } = useRouter();
  const handleOnClickSubject = () => {
    push(PATH_DASHBOARD.myclass.addMember(myclass_id));
  };
  return (
    <Card {...other}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <CardHeader sx={{ display: 'contents' }} title={title} subheader={subheader} />
      </Box>

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {myClass?.members?.map((row, index) => (
                <BookingDetailsRow
                  fetchMyClass={() => fetchMyClass()}
                  user={user}
                  classID={classID}
                  key={index}
                  row={row}
                />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />
    </Card>
  );
}

// ----------------------------------------------------------------------

function BookingDetailsRow({ row, user, classID, fetchMyClass }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handlerDelete = async () => {
    const res = await removeMemberInClass(classID, [
      {
        userId: row.id,
      },
    ]);
    if (res.status < 400) {
      await fetchMyClass();
      handleClosePopover();
      // console.log('status: ', res);
      enqueueSnackbar(`Xoá người dùng ${res.data.message}`);
    } else {
      enqueueSnackbar('Xoá thất bại', { variant: 'error' });
    }
  };
  const isLight = theme.palette.mode === 'light';

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', row.id);
  };

  return (
    <>
      {row?.roleInClasses?.map((role) =>
        role.role === 'GVCHUNHIEM' || role.role === 'GIAOVIEN' ? (
          <TableRow>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt={row.name} src={row.name} />
                <Typography variant="subtitle2">{row.name}</Typography>
              </Stack>
            </TableCell>

            <TableCell>
              {row.firstName} {row.lastName}
            </TableCell>
            <TableCell>
              {role.role === null || '' ? (
                      <Label></Label>
                  ) : (
                      <Label key={role.id} variant="soft" color={'success'} sx={{ textTransform: 'capitalize' }}>
                        {role.role}
                      </Label>

              )}
            </TableCell>
            <TableCell>{role.subject}</TableCell>
            <TableCell>{row.email}</TableCell>

            <TableCell>
              {row.gender === 0 ? (
                <Typography variant="subtitle2">Nam</Typography>
              ) : (
                <Typography variant="subtitle2">Nữ</Typography>
              )}
            </TableCell>

            {/* <TableCell sx={{ textTransform: 'capitalize' }}>{row.roomType}</TableCell> */}

            <TableCell align="right">
              <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </TableCell>
          </TableRow>
        ) : (
          ''
        )
      )}

      {user?.roles.find((role) => role.name === 'ADMIN' || role.name === 'GVCHUNHIEM') ? (
        <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handlerDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" />
            Xóa
          </MenuItem>
        </MenuPopover>
      ) : (
        ''
      )}
    </>
  );
}
