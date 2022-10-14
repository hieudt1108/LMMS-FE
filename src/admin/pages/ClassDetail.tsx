import { Grid, Pagination, Stack, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ClassSelect } from '../components/ClassSelect';
import SwipeableViews from 'react-swipeable-views';
import ListDocument from '../../document/components/ListDocument';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import MemberTable from '../components/MemberTable';
import MemberHeader from '../components/MemberHeader';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const ClassDetail = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <React.Fragment>
      <Stack spacing={2} direction="row" alignItems="center" mt={2}>
        <Box
          sx={{
            width: '100%',
            height: 186,
          }}
          className="rounded bg-light"
        >
          <Typography variant="h1" className="h-75 ml-3 pt-3">
            1A - Khối 1 - Năm học 2022 - 2023
          </Typography>
          <Tabs
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="nav tabs example"
            centered
          >
            <Tab {...a11yProps(0)} label={t('classDetail.titleBar.document')} />
            <Tab {...a11yProps(1)} label={t('classDetail.titleBar.member')} />
          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Stack spacing={2} direction="column" justifyContent="flex-end">
                <Stack spacing={2} direction="row" justifyContent="flex-end">
                  <ClassSelect></ClassSelect>
                </Stack>

                <Box>
                  <Grid container spacing={2}>
                    {Array.from(Array(10)).map((_, index) => (
                      <Grid item xs={6} md={4} lg={2}>
                        <Item>
                          <ListDocument />
                        </Item>
                      </Grid>
                    ))}
                    ;
                  </Grid>
                </Box>
                <Stack
                  spacing={2}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  mt={2}
                >
                  <Pagination count={10} color="secondary" size="large" />
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Stack spacing={2} direction="column" justifyContent="flex-start" mt={2}>
                <MemberHeader
                  title={t('classDetail.member.teacher')}
                  numberMember={12}
                  titleAction={t('classDetail.action.addTeacher')}
                ></MemberHeader>
                <MemberTable></MemberTable>
              </Stack>

              <Stack spacing={2} direction="column" justifyContent="flex-start" mt={2}>
                <MemberHeader
                  title={t('classDetail.member.student')}
                  numberMember={12}
                  titleAction={t('classDetail.action.addStudent')}
                ></MemberHeader>
                <MemberTable></MemberTable>
              </Stack>
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default ClassDetail;
