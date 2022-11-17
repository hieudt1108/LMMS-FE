import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _gradeList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import GradeNewEditForm from '../../../../sections/@dashboard/grade/GradeNewEditForm';

// ----------------------------------------------------------------------

GradeEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GradeEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();

  const currentGrade = _gradeList.find((grade) => grade.id === name);

  return (
    <>
      <Head>
        <title> Grade: Edit grade | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Cập nhật khối học"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Danh sách khối học',
              href: PATH_DASHBOARD.grade.list,
            },
            { name: `Cập nhật ${currentGrade?.id}` },
          ]}
        />

        <GradeNewEditForm isEdit currentGrade={currentGrade} />
      </Container>
    </>
  );
}
