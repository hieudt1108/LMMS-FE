import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import {
  Alert,
  Pagination,
  Button,
  Container,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
// utils
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Iconify from '../../../../components/iconify';
import { SkeletonPostItem } from '../../../../components/skeleton';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
// sections
// api
import { getAllDocument, getAllTypeDocument, getAllSubject } from '../../../../dataProvider/agent';
import { DocumentPostCard } from '../../../../sections/@dashboard/documents';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

DocumentPostsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DocumentPostsPage() {
  const { themeStretch } = useSettingsContext();

  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 8,
    programId: 6,
    searchByName: '',
    typeDocumentId: '',
    subjectId: '',
  });

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
  const [documents, setDocuments] = useState([]);
  const [typeDocs, setTypeDoc] = useState([]);
  const [subjects, setSubject] = useState([]);

  async function fetchAllDocument() {
    const res = await getAllDocument(filter);
    if (res.status < 400) {
      setDocuments(res.data.data);
    } else {
      console.log(res.message);
    }
  }
  async function fetchAllTypeDoc() {
    const res = await getAllTypeDocument({
      pageIndex: 1,
      pageSize: 100,
    });
    if (res.status < 400) {
      setTypeDoc(res.data);
    } else {
      console.log(res.message);
    }
  }
  console.log('test: ', typeDocs);

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

  const handleSearchChange = useCallback(
    (event, value) => {
      setFilter({ ...filter, searchByName: event.target.value });
    },
    [filter]
  );

  const handleFilterDocType = useCallback(
    (event, value) => {
      setFilter({ ...filter, typeDocumentId: event.target.value.id });
    },
    [filter]
  );

  const handleFilterSubject = useCallback(
    (event, value) => {
      setFilter({ ...filter, subjectId: event.target.value.id });
    },
    [filter]
  );
  const handlePageChange = useCallback(async (event, pageIndex) => {
    let response = await getAllDocument({
      ...filter,
      pageIndex: pageIndex,
    });
    setFilter({ ...filter, pageIndex: pageIndex });
  }, []);
  useEffect(() => {
    fetchAllDocument();
  }, [filter]);

  useEffect(() => {
    fetchAllTypeDoc();
    fetchAllSubject();
  }, []);

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Danh sách tài liệu"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Danh sách tài liệu',
            },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.documents.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Document
              </Button>
            </NextLink>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <TextField
              size="small"
              sx={{ mr: 1, mr: 3 }}
              autoHighlight
              onChange={handleSearchChange}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
              <InputLabel id="demo-simple-select-helper-label">Khối</InputLabel>
              <Select id="demo-simple-select-helper" label="Khối" onChange={handleFilterDocType}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {renderMenuItem(typeDocs)}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-helper-label">Subject</InputLabel>
              <Select id="demo-simple-select-helper" label="Subject" onChange={handleFilterSubject}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {renderMenuItem(subjects)}
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <DocumentPostCard documents={documents} />

        <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center" mt={2}>
          <Pagination
            size="small"
            count={documents?.length}
            rowsperpage={filter.pageSize}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </Container>
    </>
  );
}
