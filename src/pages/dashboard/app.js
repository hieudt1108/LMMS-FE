// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import Iconify from '../../components/iconify';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppGetAllDocDetail,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
// API
import { getReport } from '../../dataProvider/agent';
import { useEffect, useState } from 'react';
// ICON
// import IMG_IC from '/assets/icons/files/ic_img.svg';
// import VIDEO_IC from '/assets/icons/files/ic_video.svg';
// import DOCX_IC from '/assets/icons/files/ic_document.svg';
// import AUDIO_IC from '/assets/icons/files/ic_audio.svg';
// import OTHER_IC from '/assets/icons/files/ic_ai.svg';

// import IMG from '/assets/icons/files/ic_img.svg';

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const [reports, setReport] = useState();

  async function fetchReport() {
    const res = await getReport();
    if (res.status < 400) {
      setReport(res.data.data);
    } else if (res.response) {
      console.log(`${res.response.status} !`);
    }
  }

  console.log('reports: ', reports);

  useEffect(() => {
    fetchReport();
  }, []);
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Chào mừng quay trở lại! \n ${user?.firstName} ${user?.lastName}`}
              description="Hệ thống quản lí dạy và học tích hợp với hệ sinh thái học liệu số mang lại tiện ích đầy đủ."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h4">Thống kê tổng số tài liệu</Typography>
          </Grid>

          <Grid item xs={12} md={2.4}>
            <AppWidgetSummary
              title="File Docx"
              percent={2.6}
              src="/assets/icons/files/ic_document.svg"
              total={reports?.typeOfDoc.docs}
            />
          </Grid>

          <Grid item xs={12} md={2.4}>
            <AppWidgetSummary
              title="File images"
              percent={2.6}
              src="/assets/icons/files/ic_img.svg"
              total={reports?.typeOfDoc.image}
            />
          </Grid>

          <Grid item xs={12} md={2.4}>
            <AppWidgetSummary
              title="Files mp3"
              percent={2.6}
              src="/assets/icons/files/ic_audio.svg"
              total={reports?.typeOfDoc.sound}
            />
          </Grid>

          <Grid item xs={12} md={2.4}>
            <AppWidgetSummary
              title="Videos"
              percent={2.6}
              src="/assets/icons/files/ic_video.svg"
              total={reports?.typeOfDoc.videos}
            />
          </Grid>

          <Grid item xs={12} md={2.4}>
            <AppWidgetSummary
              title="File khác"
              percent={2.6}
              src={<Iconify icon="eva:file-fill" width={36} sx={{ color: 'text.disabled' }} />}
              total={reports?.typeOfDoc.others}
            />
          </Grid>
          {/* 
          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total Installed" percent={0.2} total={4876} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total Downloads" percent={-0.1} total={678} />
          </Grid> */}

          <Grid item xs={12} md={12} lg={12}>
            <AppCurrentDownload
              title="Current Download"
              chart={{
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.warning.main,
                ],
                series: [
                  { label: 'Mac', value: 12244 },
                  { label: 'Mac', value: 12244 },
                  { label: 'Window', value: 53345 },
                  { label: 'iOS', value: 44313 },
                  { label: 'Android', value: 78343 },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppGetAllDocDetail />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Area Installed"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2019',
                    data: [
                      { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                      { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
