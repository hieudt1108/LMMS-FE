import React from 'react';
import {Container, Grid} from '@mui/material';
import { ClassNewestBooking } from '../../myclass';
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';
import {useSettingsContext} from "../../../../components/settings";
export default function ManageSubject({ myClass }) {
    const { themeStretch } = useSettingsContext();
  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ClassNewestBooking myClass={myClass} title="Môn học" subheader="12 môn học" />
            </Grid>
          </Grid>
      </Container>
    </>
  );
}
