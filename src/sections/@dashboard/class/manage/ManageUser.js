import React from 'react';
import { Grid } from '@mui/material';
import { CLassDetails } from '../../class';
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';

export default function ManageUser() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CLassDetails
            title="Thông tin học sinh"
            tableData={_subjects}
            tableLabels={[
              { id: 'STT', label: 'STT' },
              { id: 'name', label: 'Họ và tên' },
              { id: 'email', label: 'E-mail' },
              { id: 'enable', label: 'Trạng thái' },
              { id: 'gender', label: 'Giới tính' },
              { id: '' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <CLassDetails
            title="Thông tin giáo viên"
            tableData={_subjects}
            tableLabels={[
              { id: 'STT', label: 'STT' },
              { id: 'name', label: 'Họ và tên' },
              { id: 'email', label: 'E-mail' },
              { id: 'enable', label: 'Trạng thái' },
              { id: 'gender', label: 'Giới tính' },
              { id: '' },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}
