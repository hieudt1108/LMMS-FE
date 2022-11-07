import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTER } from '../../Router';
import Box from '@mui/material/Box';
import HeaderSyllabus from '../components/HeaderSysllabus';
import { Button } from '@material-ui/core';
function createData(
  week: number,
  slot: number,
  schedule: string,
  note: string
) {
  return { week, slot, schedule, note };
}

const rows = [
  createData(
    1,
    1,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    1,
    2,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    1,
    3,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    1,
    4,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    2,
    5,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    2,
    6,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    2,
    7,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    2,
    8,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    3,
    9,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    3,
    10,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
  createData(
    3,
    11,
    'Bài 1: Tập hợp',
    'Hoàn thành bài tập 1.1 - 1.6 SBT trang 6'
  ),
];

export default function Document() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {/* <Box>
        <HeaderSyllabus />
      </Box> */}
      <Box mt={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center' colSpan={6}>
                  Kỳ 1
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={10}>Tuần</TableCell>
                <TableCell width={10}>Tiết</TableCell>
                <TableCell align='center'>Bài dạy/ chủ đề</TableCell>
                <TableCell width={10}>isOnline</TableCell>
                <TableCell align='center'>Ghi chú/ BTVN</TableCell>
                <TableCell width={50} align='center'>
                  Tài liệu
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.week}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.week}
                  </TableCell>
                  <TableCell align='center'>{row.slot}</TableCell>

                  <TableCell align='center'>{row.schedule}</TableCell>
                  <TableCell align='center'>Offline</TableCell>
                  <TableCell align='center'>{row.note}</TableCell>
                  <TableCell align='right'>
                    <Box style={{ display: 'flex' }}>
                      <Button
                        color='secondary'
                        component={RouterLink}
                        to={ROUTER.ADMIN_DOCUMENT_SUBJECT}
                        variant='contained'
                      >
                        Document
                        <ArrowRightIcon sx={{ color: '#757de8' }} />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
}
