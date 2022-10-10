import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import IconButton from '@material-ui/core/IconButton';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Empty from '../../core/components/Empty';
import * as selectUtils from '../../core/utils/selectUtils';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { User } from '../types/user';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface EnhancedTableProps {}

type UserRowProps = {
  index: number;
  onDelete: (userIds: string[]) => void;
  onEdit: (user: User) => void;
  processing: boolean;
  user: User;
};

const UserRow = ({ index, onDelete, onEdit, processing, user }: UserRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const labelId = `enhanced-table-checkbox-${index}`;
  const openActions = Boolean(anchorEl);

  const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleCloseActions();
    onDelete([user.id]);
  };

  const handleEdit = () => {
    handleCloseActions();
    onEdit(user);
  };

  return (
    <TableRow
      tabIndex={-1}
      key={user.id}
      sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}
    >
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 3 }}>
            <Avatar alt="Remy Sharp" src={user.avatar} />
          </Avatar>
          <Box>
            <Typography component="div" variant="h6">
              {`${user.lastName} ${user.firstName}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">{user.gender}</TableCell>
      <TableCell align="center">{user.role}</TableCell>
      <TableCell align="center">
        {user.disabled ? (
          <RemoveCircleOutlineIcon />
        ) : (
          <CheckCircleOutlineIcon
            sx={{
              color: 'white',
              backgroundColor: 'green',
              borderRadius: '100%',
            }}
          />
        )}
      </TableCell>
      <TableCell
        align="right"
        sx={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
      >
        <IconButton aria-label="edit" size="small">
          <EditIcon fontSize="inherit" color="primary" onClick={handleEdit} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

type UserTableProps = {
  processing: boolean;
  onDelete: (userIds: string[]) => void;
  onEdit: (user: User) => void;
  users?: any[];
};

const UserTable = ({ onDelete, onEdit, processing, users = [] }: UserTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (users.length === 0) {
    return <Empty title="No user yet" />;
  }

  function EnhancedTableHead({}: EnhancedTableProps) {
    const { t } = useTranslation();

    return (
      <TableHead>
        <TableRow sx={{ '& th': { border: 0 } }}>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} align={headCell.align} sx={{ py: 0 }}>
              {t(headCell.label)}
            </TableCell>
          ))}
          <TableCell align="right" sx={{ py: 0 }}>
            {t('userManagement.table.headers.actions')}
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  interface HeadCell {
    id: string;
    label: string;
    align: 'center' | 'left' | 'right';
  }

  const headCells: HeadCell[] = [
    {
      id: 'user',
      align: 'left',
      label: 'userManagement.table.headers.user',
    },
    {
      id: 'gender',
      align: 'center',
      label: 'userManagement.table.headers.gender',
    },
    {
      id: 'role',
      align: 'center',
      label: 'userManagement.table.headers.role',
    },
    {
      id: 'status',
      align: 'center',
      label: 'userManagement.table.headers.status',
    },
  ];

  return (
    <React.Fragment>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          sx={{
            minWidth: 600,
            borderCollapse: 'separate',
            borderSpacing: '0 1rem',
          }}
        >
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <UserRow
                  index={index}
                  key={user.id}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  processing={processing}
                  user={user}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </React.Fragment>
  );
};

export default UserTable;
