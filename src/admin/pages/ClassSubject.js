import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import SubjectCart from '../components/SubjectCart';

export const ClassSubject = () => {
  return (
    <React.Fragment>
      <Typography variant='h1' color='GrayText'>
        Học liệu SGK Tiếng Anh
      </Typography>

      <Stack spacing={2} direction='row' alignItems='center' mt={2.5}>
        <Grid container spacing={2}>
          <SubjectCart></SubjectCart>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};
