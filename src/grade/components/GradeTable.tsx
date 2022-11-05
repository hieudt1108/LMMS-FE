import Box from '@material-ui/core/Box';
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
import { Grade } from '../types/grade';

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
    id: 'grade',
    align: 'center',
    label: 'Tên khối học',
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
          Hành động
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

type GradeRowProps = {
  index: number;
  onDelete: (gradeIds: string[]) => void;
  onEdit: (grade: Grade) => void;
  processing: boolean;
  selected: boolean;
  grade: Grade;
};

const GradeRow = ({
  index,
  onDelete,
  onEdit,
  processing,
  selected,
  grade,
}: GradeRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const openActions = Boolean(anchorEl);

  const handleOpenActions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleCloseActions();
    onDelete([grade.id]);
  };

  const handleEdit = () => {
    handleCloseActions();
    onEdit(grade);
  };

  return (
    <TableRow sx={{ '& td': { bgcolor: 'background.paper', border: 0 } }}>
      <TableCell
        sx={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component='div' variant='h6'>
            {`${grade.id}`}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align='center'>
        <Box sx={{ alignItems: 'center' }}>
          <Box>
            <Typography component='div' variant='h6'>
              {`${grade.name}`}
            </Typography>
          </Box>
        </Box>
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
          <MenuItem onClick={handleDelete}>
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

type GradeTableProps = {
  processing: boolean;
  onDelete: (gradeIds: string[]) => void;
  onEdit: (grade: Grade) => void;
  onSelectedChange: (selected: string[]) => void;
  selected: string[];
  grades?: Grade[];
};

const GradeTable = ({
  onDelete,
  onEdit,
  onSelectedChange,
  processing,
  selected,
  grades = [],
}: GradeTableProps) => {
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

  if (grades.length === 0) {
    return <Empty title='No grade yet' />;
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
            {grades
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((grade, index) => (
                <GradeRow
                  index={index}
                  key={grade.id}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  processing={processing}
                  selected={isSelected(grade.id)}
                  grade={grade}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={grades.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default GradeTable;
