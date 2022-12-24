// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Grid,
  Typography,
  Alert,
  Pagination,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
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
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
// API
import {
  getReport,
  getAllDocsReport,
  getAllTypeDocument,
  getAllSubject,
  getAllProgram,
} from '../../dataProvider/agent';
import React, { useEffect, useCallback, useState } from 'react';
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

  const [filters, setFilter] = useState({
    pageIndex: 1,
    pageSize: 7,
    programId: '',
    typeDocumentId: '',
    subjectId: '',
    searchByName: '',
  });

  const [paging, setPaging] = useState();

  const [reportDocs, setReportDocs] = useState([]);
  const [typeDocs, setTypeDoc] = useState([]);
  const [subjects, setSubject] = useState([]);
  const [programs, setPrograms] = useState([]);

  async function fetchReport() {
    const res = await getReport();
    if (res.status < 400) {
      setReport(res.data.data);
    } else if (res.response) {
      console.log(`${res.response.status} !`);
    }
  }

  async function fetchAllTypeDoc() {
    const res = await getAllTypeDocument({
      pageIndex: 1,
      pageSize: 100,
    });
    if (res.status < 400) {
      setTypeDoc(res.data.data);
    } else {
      console.log(res.message);
    }
  }

  async function fetchAllSubject() {
    const res = await getAllSubject({
      pageIndex: 1,
      pageSize: 100,
    });
    if (res.status < 400) {
      setSubject(res.data.data);
    } else {
      console.log(res.message);
    }
  }
  async function fetchAllProgram() {
    const res = await getAllProgram({
      pageIndex: 1,
      pageSize: 100,
    });
    if (res.status < 400) {
      setPrograms(res.data.data);
    } else {
      console.log(res.message);
    }
  }

  async function fetchReportDoc() {
    const res = await getAllDocsReport(filters);
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers['x-pagination']));

      setReportDocs(res.data.data);
    } else if (res.response) {
      console.log(`${res.response.status} !`);
    }
  }
  console.log('reportDocs: ', paging);

  const handleSearchChange = useCallback(
    (event, value) => {
      setFilter({ ...filters, searchByName: event.target.value });
    },
    [filters]
  );

  const handleFilterDocType = useCallback(
    (event, value) => {
      setFilter({ ...filters, typeDocumentId: event.target.value.id });
    },
    [filters]
  );

  const handleFilterSubject = useCallback(
    (event, value) => {
      setFilter({ ...filters, subjectId: event.target.value.id });
    },
    [filters]
  );

  const handleFilterProgram = useCallback(
    (event, value) => {
      setFilter({ ...filters, programId: event.target.value.id });
    },
    [filters]
  );
  useEffect(() => {
    fetchReport();

    fetchAllTypeDoc();
    fetchAllSubject();
    fetchAllProgram();
  }, []);

  useEffect(() => {
    fetchReportDoc();
  }, [filters]);
  const renderMenuItem = useCallback((item) => {
    if (item && item.length) {
      return item.map((obj, index) => (
        <MenuItem value={obj} key={index}>
          {obj.name}
        </MenuItem>
      ));
    }
    return (
      <MenuItem>
        <Alert severity="error">This is an error !</Alert>
      </MenuItem>
    );
  });

  console.log('typedoc: ', typeDocs);

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
          <Grid item xs={12} md={12} lg={6}>
            <AppCurrentDownload
              title="Dung lượng"
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
          {/* <Grid item xs={12} md={6} lg={6}>
            <AppTopRelated title="Top Related Applications" list={_appRelated} />
          </Grid> */}

          {/* 
          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total Installed" percent={0.2} total={4876} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary title="Total Downloads" percent={-0.1} total={678} />
          </Grid> */}

          <Grid item xs={12} lg={12}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row">
                <TextField
                  size="small"
                  sx={{ mr: 3, ml: 2 }}
                  autohighlight="true"
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm tài liệu..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl sx={{ minWidth: 170, mr: 3 }} size="small">
                  <InputLabel id="demo-simple-select-helper-label">Chương trình học</InputLabel>
                  <Select id="demo-simple-select-helper" label="Subject" onChange={handleFilterProgram}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {renderMenuItem(programs)}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 170, mr: 3 }} size="small">
                  <InputLabel id="demo-simple-select-helper-label">Môn học</InputLabel>
                  <Select id="demo-simple-select-helper" label="Subject" onChange={handleFilterDocType}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {renderMenuItem(subjects)}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 170 }} size="small">
                  <InputLabel id="demo-simple-select-helper-label">Loại tài liệu</InputLabel>
                  <Select id="demo-simple-select-helper" label="Subject" onChange={handleFilterSubject}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {renderMenuItem(typeDocs)}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} lg={12}>
            <AppNewInvoice
              title="Thống kê tài liệu"
              tableData={reportDocs}
              tableLabels={[
                { id: 'code', label: 'Code Document' },
                { id: 'name', label: 'Tên tài liệu' },
                { id: 'createDate', label: 'Ngày tạo' },
                { id: 'userDto', label: 'Người tạo' },
                { id: 'email', label: 'Email' },
                { id: 'phone', label: 'Phone' },
                { id: '' },
              ]}
            />
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
