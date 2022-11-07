import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { getAllSubjectInClass } from '../../dataProvider/agent';
import SubjectCart from '../components/SubjectCart';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/system';

export const ClassSubject = () => {
  const [subject, setSubject] = React.useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await Promise.all([
        getAllSubjectInClass({ pageIndex: 1, pageSize: 10 }),
      ]);
      setSubject([
        { id: 9, name: 'mon van' },
        { id: 9, name: 'mon van' },
        { id: 9, name: 'mon van' },
        { id: 9, name: 'mon van' },
        { id: 9, name: 'mon van' },
        { id: 9, name: 'mon van' },
      ]);
    }

    fetchMyAPI();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {subject ? (
          subject.map((obj, index) => (
            <SubjectCart key={index} data={obj}></SubjectCart>
          ))
        ) : (
          <Alert severity='error'>This is an error !</Alert>
        )}
      </Grid>
    </React.Fragment>
  );
};
