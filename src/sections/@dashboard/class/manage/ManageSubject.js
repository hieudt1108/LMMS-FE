import React from 'react';
import { Grid } from '@mui/material';
import { ClassNewestBooking } from '../../class';
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';
export default function ManageSubject() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ClassNewestBooking title="Môn học" subheader="12 môn học" list={_subjectNew} />
        </Grid>
      </Grid>
    </>
  );
}
