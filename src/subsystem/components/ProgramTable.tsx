import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Empty from '../../core/components/Empty';
import * as selectUtils from '../../core/utils/selectUtils';
import { Program } from '../types/program';
import { useParams, useNavigate } from 'react-router-dom';
import { User } from '../../users/types/user';
import { deleteProgram } from '../../dataProvider/agent.js';

interface HeadCell {
  id: string;
  label: string;
  align: 'center' | 'left' | 'right';
}

const headCells: HeadCell[] = [
  {
    id: 'id',
    align: 'left',
    label: 'ID',
  },
  {
    id: 'program',
    align: 'center',
    label: 'Tên chương trình',
  },
  {
    id: 'status',
    align: 'center',
    label: 'Trạng thái',
  },
];

function EnhancedTableHead() {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow sx={{ '& th': { border: 0 } }}>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ py: 0 }}>
            {t(headCell.label)}
          </TableCell>
        ))}
        <TableCell align='right' sx={{ py: 0 }}>
          {t('userManagement.table.headers.actions')}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

type ProgramRowProps = {
  index: number;
  onDelete: (programIds: any) => void;
  onEdit: (program: Program) => void;
  processing: boolean;
  selected: boolean;
  program: Program;
};

const ProgramRow = ({
  index,
  onDelete,
  onEdit,
  processing,
  selected,
  program,
}: ProgramRowProps) => {
  const { id } = useParams();
  //console.log('ID: ', program.id);
  //let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const handleDeleteProgram = async (id: any) => {
    const res = await deleteProgram(id);
    if (res.status < 400) {
      //const updatData = prog
      console.log('delete success');
      handleCloseActions();
    } else {
      console.log('delete fail');
    }
  };
  const openActions = Boolean(anchorEl);

  const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleCloseActions();
    onDelete(program.id);
    console.log(program.id);
  };

  const handleEdit = () => {
    handleCloseActions();
    onEdit(program);
  };

  return (
    <TableRow sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}>
      <TableCell
        sx={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component='div' variant='h6'>
            {`${program.id}`}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align='center'>
        <Box sx={{ alignItems: 'center' }}>
          <Box>
            <Typography component='div' variant='h6'>
              {`${program.name}`}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align='center'>
        {program.enable ? (
          <Chip label='Disabled' />
        ) : (
          <Chip color='primary' label='Active' />
        )}
      </TableCell>
      <TableCell
        align='right'
        sx={{ borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}
      >
        <IconButton
          id='user-row-menu-button'
          aria-label='user actions'
          aria-controls='user-row-menu'
          aria-haspopup='true'
          aria-expanded={openActions ? 'true' : 'false'}
          disabled={processing}
          onClick={handleOpenActions}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='user-row-menu'
          anchorEl={anchorEl}
          aria-labelledby='user-row-menu-button'
          open={openActions}
          onClose={handleCloseActions}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleEdit}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>{' '}
            {t('common.edit')}
          </MenuItem>
          <MenuItem onClick={() => handleDeleteProgram(program.id)}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>{' '}
            {t('common.delete')}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

type ProgramTableProps = {
  processing: boolean;
  onDelete: (programIds: string[]) => void;
  onEdit: (program: Program) => void;
  onSelectedChange: (selected: string[]) => void;
  selected: string[];
  programs?: Program[];
};

const ProgramTable = ({
  onDelete,
  onEdit,
  onSelectedChange,
  processing,
  selected,
  programs = [],
}: ProgramTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (id: string) => {
    let newSelected: string[] = selectUtils.selectOne(selected, id);
    onSelectedChange(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  if (programs.length === 0) {
    return <Empty title='No program yet' />;
  }

  return (
    <React.Fragment>
      <TableContainer>
        <Table
          aria-labelledby='tableTitle'
          sx={{
            minWidth: 600,
            borderCollapse: 'separate',
            borderSpacing: '0 1rem',
          }}
        >
          <EnhancedTableHead />
          <TableBody>
            {programs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((program, index) => (
                <ProgramRow
                  index={index}
                  key={program.id}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  processing={processing}
                  selected={isSelected(program.id)}
                  program={program}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={programs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default ProgramTable;