import orderBy from 'lodash/orderBy';
import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Grid, Button, Container, Stack } from '@mui/material';
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
import { DocumentPostCard, DocumentPostsSort, DocumentPostsSearch } from '../../../../sections/@dashboard/documents';

// api
import { getAllDocument } from '../../../../dataProvider/agent';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

DocumentPostsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function DocumentPostsPage() {
  const { themeStretch } = useSettingsContext();

  const [posts, setPosts] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [sortBy, setSortBy] = useState('latest');

  const sortedPosts = applySortBy(posts, sortBy);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/Document/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log('data: ', documents);

  async function fetchAllDocument() {
    const res = await getAllDocument({ pageIndex: 1, pageSize: 100 });
    if (res.status < 400) {
      setDocuments(res.data.data);
    } else {
      console.log(res.message);
    }
  }
  useEffect(() => {
    fetchAllDocument();
  }, []);

  // useEffect(() => {
  //   getAllPosts();
  // }, [getAllPosts]);

  // useEffect(() => {
  //   getAllDocument();
  // }, []);
  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

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
          <DocumentPostsSearch />
          <DocumentPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
        </Stack>

        <Grid container spacing={3}>
          {/* {(!posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={3}>
                <DocumentPostCard documents={documents} post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )} */}
          {documents?.map((document, index) => (
            <Grid key={document.id} item xs={12} sm={6} md={3}>
              <DocumentPostCard document={document} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const applySortBy = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};
