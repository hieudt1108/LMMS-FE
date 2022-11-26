// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
// import ClassNewEditForm from '../../../../sections/@dashboard/class/form/ClassNewEditForm';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { getClassRedux } from 'src/redux/slices/class';

// ----------------------------------------------------------------------

addStudent.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

import React from 'react';

export default function addStudent() {
  const {
    query: { class_id },
  } = useRouter();
  const { themeStretch } = useSettingsContext();

  console.log('class ID: ', class_id);
  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add new Student to class"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Class',
              href: PATH_DASHBOARD.class.detail(class_id),
            },
            {
              name: 'New Student',
            },
          ]}
        />
      </Container>
    </>
  );
}
