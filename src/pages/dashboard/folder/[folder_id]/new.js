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
import { FolderNewPostForm } from '../../../../sections/@dashboard/folder';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

FolderNewDocumentPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function FolderNewDocumentPostPage() {
  const { themeStretch } = useSettingsContext();
  const { folder } = useSelector((state) => state.folder);

  return (
    <>
      <Head>
        <title> Thêm tài liệu</title>
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
              name: 'Tài Liệu Của Tôi',
              href: PATH_DASHBOARD.folder.root,
            },
            {
              name: `${folder.name}`,
              href: PATH_DASHBOARD.folder.link(folder.id),
            },
            {
              name: 'Tạo tài liệu',
            },
          ]}
        />

        <FolderNewPostForm
          data={{
            ...folder,
            handleBackPage: () => {
              dispatch(getFolderRedux(folder.parentId, 'folder'));
            },
            types: ['folder'],
            menuSubFolder: ['edit', 'delete'],
            menuDocument: ['preview', 'download', 'share', 'delete'],
            panel: ['folder'],
          }}
        />
      </Container>
    </>
  );
}
