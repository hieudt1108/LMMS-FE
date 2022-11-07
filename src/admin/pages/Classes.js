import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Grid, TextField } from '@mui/material';
import ClassCart from '../components/ClassCart';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';
import ClassHeader from '../components/ClassHeader';
import { getAllClass, getAllGrade } from '../../dataProvider/agent';

const Classes = () => {
  const { t } = useTranslation();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [classObj, setClassObj] = React.useState([]);
  const [grade, setGrade] = React.useState([]);

  const handleChangePage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await Promise.all([
        getAllClass({ pageIndex: 1, pageSize: 10 }),
        getAllGrade({ pageIndex: 1, pageSize: 10 }),
      ]);
      setClassObj(response[0].data.data);
      setGrade(response[1].data.data);
      console.log('response', response);
    }

    fetchMyAPI();
  }, []);

  return (
    <React.Fragment>
      <ClassHeader
        title={'classes.description'}
        description={'classes.create'}
        data={grade}
      />

      <Grid mt={2.5} container spacing={2}>
        {classObj ? (
          classObj.map((obj, index) => (
            <ClassCart key={index} data={obj}></ClassCart>
          ))
        ) : (
          <Alert severity='error'>This is an error !</Alert>
        )}
      </Grid>

      <Stack
        spacing={2}
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        mt={2}
      >
        <TablePagination
          component='div'
          labelRowsPerPage={'Trang'}
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </React.Fragment>
  );
};

export default Classes;
