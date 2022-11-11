import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _levelList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import LevelNewEditForm from '../../../../sections/@dashboard/level/LevelNewEditForm';

// ----------------------------------------------------------------------

LevelEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LevelEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();

  const currentLevel = _levelList.find((level) => paramCase(level.name) === name);

  return (
    <>
      <Head>
        <title> Level: Edit level | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit level"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Level',
              href: PATH_DASHBOARD.level.list,
            },
            { name: currentLevel?.name },
          ]}
        />

        <LevelNewEditForm isEdit currentLevel={currentLevel} />
      </Container>
    </>
  );
}
