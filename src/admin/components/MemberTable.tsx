import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Pagination, Stack } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  account: String,
  subject: String,
  homeroomTeacher: React.ReactNode,
  tools: React.ReactNode
) {
  return { account, subject, homeroomTeacher, tools };
}

const rows = [
  createData(
    'Thong Chu Toi choi',
    'Math',
    <CheckCircleRoundedIcon></CheckCircleRoundedIcon>,
    <>
      <AutoFixHighTwoToneIcon></AutoFixHighTwoToneIcon>
      <DeleteTwoToneIcon></DeleteTwoToneIcon>
    </>
  ),
  createData(
    'Thong Chu Toi choi',
    'Math',
    <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>,
    <>
      <AutoFixHighTwoToneIcon></AutoFixHighTwoToneIcon>
      <DeleteTwoToneIcon></DeleteTwoToneIcon>
    </>
  ),
  createData(
    'Thong Chu Toi choi',
    'Math',
    <CheckCircleRoundedIcon></CheckCircleRoundedIcon>,
    <>
      <AutoFixHighTwoToneIcon></AutoFixHighTwoToneIcon>
      <DeleteTwoToneIcon></DeleteTwoToneIcon>
    </>
  ),
  createData(
    'Thong Chu Toi choi',
    'Math',
    <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>,
    <>
      <AutoFixHighTwoToneIcon></AutoFixHighTwoToneIcon>
      <DeleteTwoToneIcon></DeleteTwoToneIcon>
    </>
  ),
  createData(
    'Thong Chu Toi choi',
    'Math',
    <CheckCircleRoundedIcon></CheckCircleRoundedIcon>,
    <>
      <AutoFixHighTwoToneIcon></AutoFixHighTwoToneIcon>
      <DeleteTwoToneIcon></DeleteTwoToneIcon>
    </>
  ),
];

export default function MemberTable() {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Stack spacing={2} justifyContent="center" direction="column" alignItems="flex-end">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{t('classDetail.member.account')}</StyledTableCell>
                <StyledTableCell align="center">{t('classDetail.member.subject')}</StyledTableCell>
                <StyledTableCell align="center">
                  {t('classDetail.member.homeroomTeacher')}
                </StyledTableCell>
                <StyledTableCell align="center">{t('classDetail.member.tools')}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.account}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.subject}</StyledTableCell>
                  <StyledTableCell align="center">{row.homeroomTeacher}</StyledTableCell>
                  <StyledTableCell align="center">{row.tools}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination count={10} color="primary" />
      </Stack>
    </React.Fragment>
  );
}
