import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../../../layouts/dashboard';
import { Container, Grid, Stack } from '@mui/material';
import { useSettingsContext } from '../../../../../components/settings';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// component subject
import SysllabusSubject from '../../../../../sections/@dashboard/class/subject/SysllabusSubject';
import DocumentLocal from '../../../../../sections/@dashboard/class/subject/DocumentLocal';
import Head from "next/head";

//
index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function index() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { class_id, subject_id },
  } = useRouter();

  console.log(class_id, subject_id);
  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={'xl'}>
        <CustomBreadcrumbs
          heading="Khung chương trình"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Môn học', href: PATH_DASHBOARD.user.root },
            { name: 'Khung chương trình' },
          ]}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <DocumentLocal />
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <SysllabusSubject />
              <SysllabusSubject />
              <SysllabusSubject />
              <SysllabusSubject />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
