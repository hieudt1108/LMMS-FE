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

  const currentGrade = _gradeList.find((grade) => paramCase(grade.name) === name);

  return (
    <>
      <Head>
        <title> Grade: Edit grade | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit grade"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Grade',
              href: PATH_DASHBOARD.grade.list,
            },
            { name: currentGrade?.name },
          ]}
        />

        <GradeNewEditForm isEdit currentGrade={currentGrade} />
      </Container>
    </>
  );
}
