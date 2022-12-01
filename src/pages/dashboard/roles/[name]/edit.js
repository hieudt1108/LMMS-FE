import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _typeDocumentList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import RoleNewEditForm from '../../../../sections/@dashboard/roles/RoleNewEditForm';
import {useEffect, useState} from "react";
import {getRoleById, getTypeDocumentById} from "../../../../dataProvider/agent";

// ----------------------------------------------------------------------

RolesEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function RolesEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();


    const [rolesData, setRolesData] = useState([]);

    useEffect(() => {
        fetchRoles();
    }, []);

    async function fetchRoles() {
        const res = await getRoleById(name);
        if (res.status < 400) {
            setRolesData(res.data.data);
        } else {
            console.log(res.message);
        }
    }

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Cập nhật vai trò"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Danh sách vai trò',
              href: PATH_DASHBOARD.role.list,
            },
            { name: 'Cập nhật vai trò'},
          ]}
        />

        <RoleNewEditForm isEdit currentRoles={rolesData} />
      </Container>
    </>
  );
}
