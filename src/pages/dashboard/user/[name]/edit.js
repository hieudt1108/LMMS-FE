// next
import Head from 'next/head';
import {useRouter} from 'next/router';
// @mui
import {Container} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../../routes/paths';
// _mock_
import {_userList} from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import {useSettingsContext} from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import UserNewForm from "../../../../sections/@dashboard/user/UserNewForm";

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const {
    query: { name },
  } = useRouter();

  const currentUser = _userList.find((user) => user.id === name);
  return (
    <>
      <Head>
        <title> User: Edit user | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Cập nhật người dùng"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Danh sách',
              href: PATH_DASHBOARD.user.list,
            },
            {
              name: currentUser?.id,
            },
          ]}
        />

        <UserNewForm isEdit currentUser={currentUser} />
      </Container>
    </>
  );
}
