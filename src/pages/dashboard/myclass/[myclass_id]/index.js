// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { Grid, Container, Tab, Tabs, Card, Divider, Box, Alert } from '@mui/material';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// _mock_
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../../components/settings';
// sections
import { ClassWidgetSummary } from '../../../../sections/@dashboard/class';
// assets
import ManageSubject from '../../../../sections/@dashboard/class/manage/ManageSubject';
import ManageUser from '../../../../sections/@dashboard/class/manage/ManageUser';

import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../../../assets/illustrations';
import { useRouter } from 'next/router';

//API
import { getMyClassGetOne } from '../../../../dataProvider/agent';

MyClassDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function MyClassDetail() {
  const router = useRouter();
  const theme = useTheme();
  const {
    query: { myclass_id },
  } = useRouter();
  console.log('class_id: ', myclass_id);
  const [myClass, setmyClass] = useState();
  const [currentTab, setCurrentTab] = useState('description');

  async function fetchMyClass() {
    const res = await getMyClassGetOne(myclass_id);
    if (res.status < 400) {
      setmyClass(res.data.data);
    } else {
      <Alert severity="info" sx={{ mb: 3 }}>
        {res.message}
      </Alert>;
    }
  }
  console.log('data: ', myClass);

  useEffect(() => {
    fetchMyClass();
  }, [myclass_id]);
  const TABS = [
    {
      id: 1,
      value: 'description',
      label: 'Quản lý môn học',
      component: <ManageSubject myClass={myClass} />,
    },
    {
      id: 2,
      value: 'reviews',
      label: `Quản lý người dùng`,
      component: <ManageUser myClass={myClass} />,
    },
  ];

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} mb={2}>
          <Grid item xs={12} md={4}>
            <ClassWidgetSummary title="Giáo viên" total={7} icon={<BookingIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassWidgetSummary title="Học sinh" total={30} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassWidgetSummary title="Tài liệu" total={124000} icon={<CheckOutIllustration />} />
          </Grid>

          {/* <Grid item xs={12} md={8}>
           <ClassReservationStats
             title="Thống kê tài liệu"
             subheader="Tiên học lễ. Hậu học văn"
             chart={{
               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
               series: [
                 {
                   type: 'Week',
                   data: [
                     { name: 'Tải lên', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                     { name: 'Tải xuống', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                   ],
                 },
                 {
                   type: 'Month',
                   data: [
                     { name: 'Tải lên', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                     { name: 'Tải xuống', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                   ],
                 },
                 {
                   type: 'Year',
                   data: [
                     { name: 'Tải lên', data: [76, 42, 29, 41, 27, 138, 117, 86, 63] },
                     { name: 'Tải xuống', data: [80, 55, 34, 114, 80, 130, 15, 28, 55] },
                   ],
                 },
               ],
             }}
           />
         </Grid>

         // <Grid item xs={12} md={4}>
         //   <ClassCustomerReviews title="Thông tin giáo viên" list={_subjectReview} />
         // </Grid> */}

          {/* <Grid item xs={12}>
           <ClassNewestBooking title="Môn học" subheader="12 môn học" list={_subjectNew} />
         </Grid>

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
         </Grid> */}
        </Grid>
        <Card>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{ px: 3, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.id} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Divider />

          {TABS.map(
            (tab) =>
              tab.value === currentTab && (
                <Box
                  key={tab.id}
                  sx={{
                    ...(currentTab === 'description' && {
                      p: 3,
                    }),
                  }}
                >
                  {tab.component}
                </Box>
              )
          )}
        </Card>
      </Container>
    </>
  );
}