import { Stack, Typography, useTheme } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MemberHeader from '../components/MemberHeader';
import MemberTable from '../components/MemberTable';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import Document from '../../document/pages/Sysllabus';

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
  const [buttonHeader, setButtonHeader] = React.useState('document');

  const theme = useTheme();
  console.log('ClassDetail:', location);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleButtonHeaderChange = useCallback((value) => {
    console.log('handleButtonHeaderChange', value);
    setButtonHeader(value);
  }, []);
  return (
    <React.Fragment>
      <Card
        sx={{
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <CardContent>
          <Typography variant='h1' className='h-75 ml-3 pt-3'>
            1A - Khối 1 - Năm học 2022 - 2023
          </Typography>
        </CardContent>
        <Stack
          spacing={2}
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <CardActions
            sx={{
              padding: 0,
            }}
          >
            <Button
              size='small'
              onClick={() => handleButtonHeaderChange('document')}
            >
              Document
            </Button>
            <Button
              size='small'
              onClick={() => handleButtonHeaderChange('member')}
            >
              Member
            </Button>
          </CardActions>
        </Stack>
      </Card>

      {buttonHeader === 'document' ? (
        <Document />
      ) : (
        <>
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
        </>
      )}
    </React.Fragment>
  );
};

export default ClassDetail;
