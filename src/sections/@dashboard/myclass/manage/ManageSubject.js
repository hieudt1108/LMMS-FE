import React from 'react';
import { Grid } from '@mui/material';
import { ClassNewestBooking } from '../../class';
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';
export default function ManageSubject({ myClass }) {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ClassNewestBooking myClass={myClass} title="Môn học" subheader="12 môn học" />
        </Grid>
      </Grid>
    </>
  );
}
