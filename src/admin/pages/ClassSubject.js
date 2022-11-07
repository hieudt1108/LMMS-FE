import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useCallback } from 'react';
import { getAllSubjectInClass } from '../../dataProvider/agent';
import SubjectCart from '../components/SubjectCart';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MemberHeader from '../components/MemberHeader';
import MemberTable from '../components/MemberTable';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ClassSubject = () => {
  const { t } = useTranslation();
  const [subject, setSubject] = React.useState([]);
  const [buttonHeader, setButtonHeader] = React.useState('subject');

  const handleButtonHeaderChange = useCallback((value) => {
    console.log('handleButtonHeaderChange', value);
    setButtonHeader(value);
  }, []);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await Promise.all([
        getAllSubjectInClass({ pageIndex: 1, pageSize: 10 }),
      ]);
      setSubject([
        { id: 9, code: 'literature', name: 'Ngữ Văn' },
        { id: 9, code: 'biology', name: 'Sinh học' },
        { id: 9, code: 'chemistry', name: 'Hóa học' },
        { id: 9, code: 'economic-legal', name: 'Kinh Tế' },
        { id: 9, code: 'history', name: 'Lịch Sử' },
        { id: 9, code: 'literature', name: 'Văn Học' },
        { id: 9, code: 'math', name: 'Toán Học' },
        { id: 9, code: 'physics', name: 'Vật Lý' },
        { id: 9, code: 'english', name: 'Tiếng Anh' },
      ]);
    }

    fetchMyAPI();
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
              onClick={() => handleButtonHeaderChange('subject')}
            >
              Subject
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

      {buttonHeader === 'subject' ? (
        <Grid container spacing={2} mt={2.5}>
          {subject ? (
            subject.map((obj, index) => (
              <SubjectCart key={index} data={obj}></SubjectCart>
            ))
          ) : (
            <Alert severity='error'>This is an error !</Alert>
          )}
        </Grid>
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
