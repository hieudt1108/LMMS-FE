import React from 'react';
import { Container, Grid, Stack } from '@mui/material';
import { ClassNewestBooking } from '../../class';
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';
import { useSettingsContext } from '../../../../components/settings';

export default function ManageSubject({ myClass }) {
  const { themeStretch } = useSettingsContext();
  const countSubject = myClass?.subjects.length;
  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ClassNewestBooking myClass={myClass} title="Môn học hiện có trong lớp" subheader={countSubject} />
      </Container>
    </>
  );
}
