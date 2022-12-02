import React from 'react';
import { Grid } from '@mui/material';
import { CLassDetails, ClassTeacher } from '../../class';
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';

export default function ManageUser({ myClass }) {
  console.log('my class: ', myClass);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CLassDetails
            title="Thông tin học sinh"
            myClass={myClass}
            tableData={_subjects}
            tableLabels={[
              { id: 'STT', label: 'STT' },
              { id: 'name', label: 'Họ và tên' },
              { id: 'birthDate', label: 'Ngày sinh' },
              { id: 'email', label: 'E-mail' },
              { id: 'gender', label: 'Giới tính' },
              { id: '' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <ClassTeacher
            title="Thông tin giáo viên"
            myClass={myClass}
            tableData={_subjects}
            tableLabels={[
              { id: 'STT', label: 'STT' },
              { id: 'name', label: 'Họ và tên' },
              { id: 'Subject', label: 'Môn dạy' },
              { id: 'email', label: 'E-mail' },
              { id: 'gender', label: 'Giới tính' },
              { id: '' },
            ]}
          />
        </Grid>
      </Grid>
    </>
  );
}
