// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';

// ----------------------------------------------------------------------

BlogNewPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogNewPostPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Tạo một tài liệu mới"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Danh sách tài liệu',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: 'Tạo tài liệu',
            },
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </>
  );
}
