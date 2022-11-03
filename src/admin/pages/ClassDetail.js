import {
  Grid,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AdminAppBar from '../components/AdminAppBar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AdminToolbar from '../components/AdminToolbar';
import { ClassSelect } from '../components/ClassSelect';
import SwipeableViews from 'react-swipeable-views';
import ListDocument from '../../document/components/ListDocument';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MemberHeader from '../components/MemberHeader';
import MemberTable from '../components/MemberTable';
import { useLocation, useNavigate, useParams } from 'react-router';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
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

function a11yProps(index) {
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

const ClassDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let location = useLocation();
  const [value, setValue] = React.useState(0);

  const theme = useTheme();
  console.log('ClassDetail:', location);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <React.Fragment>
      <Stack spacing={2} direction='row' alignItems='center' mt={2}>
        <Box
          sx={{
            width: '100%',
            height: 186,
          }}
          className='rounded bg-light'
        >
          <Typography variant='h1' className='h-75 ml-3 pt-3'>
            1A - Khối 1 - Năm học 2022 - 2023
          </Typography>

          <Stack
            spacing={2}
            direction='column'
            justifyContent='flex-start'
            mt={2}
          >
            <MemberHeader
              title={t('classDetail.member.teacher')}
              numberMember={12}
              titleAction={t('classDetail.action.addTeacher')}
            ></MemberHeader>
            <MemberTable></MemberTable>
          </Stack>

          <Stack
            sx={{ pb: 2 }}
            spacing={2}
            direction='column'
            justifyContent='flex-start'
            mt={2}
          >
            <MemberHeader
              title={t('classDetail.member.student')}
              numberMember={12}
              titleAction={t('classDetail.action.addStudent')}
            ></MemberHeader>
            <MemberTable></MemberTable>
          </Stack>
        </Box>
      </Stack>
    </React.Fragment>
  );
};

export default ClassDetail;
