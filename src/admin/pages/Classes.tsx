import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField } from '@mui/material';
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
  const [age, setAge] = React.useState<number | string>('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [classObj, setClassObj] = React.useState<{ data: any }>({
    data: [],
  });
  const [grade, setGrade] = React.useState<{ data: any }>({ data: [] });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await Promise.all([
        getAllClass({ pageIndex: 1, pageSize: 10 }),
        getAllGrade({ pageIndex: 1, pageSize: 10 }),
      ]);
      setClassObj(response[0].data);
      setGrade(response[1].data);
      console.log('response', response);
    }

    fetchMyAPI();
  }, []);

  return (
    <React.Fragment>
      {/* <AdminAppBar>
        <AdminToolbar title={t("classes.title")} />
      </AdminAppBar> */}
      <ClassHeader
        title={'classes.description'}
        description={'classes.create'}
        data={grade.data}
      />
      <Stack spacing={2} direction='row' alignItems='center' mt={2.5}>
        <Grid container spacing={2}>
          <ClassCart data={classObj.data}></ClassCart>
        </Grid>
      </Stack>

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
