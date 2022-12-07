import React from 'react';
import { Grid } from '@mui/material';
import { ClassNewestBooking } from '../../myclass';
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';
export default function ManageSubject({ myClass }) {
  return (
    <>
      <ClassNewestBooking myClass={myClass} title="Môn học" subheader="12 môn học" />
    </>
  );
}
