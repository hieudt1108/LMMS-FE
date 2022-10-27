import React from 'react';
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



const Classes = () => {
  const { t } = useTranslation();
  const [age, setAge] = React.useState<number | string>('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || '');
  };



  return (
    <React.Fragment>
      {/* <AdminAppBar>
        <AdminToolbar title={t("classes.title")} />
      </AdminAppBar> */}
      <ClassHeader
          title={'classes.description'}
          description={'classes.create'}
      />
      <Stack spacing={2} direction='row' alignItems='center' mt={2.5} ml={8}>
        <Grid container spacing={2}>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
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
            component="div"
            labelRowsPerPage={"Trang"}
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
