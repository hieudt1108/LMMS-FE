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
import LevelNewEditForm from '../../../sections/@dashboard/level/LevelNewEditForm';

// ----------------------------------------------------------------------

LevelCreatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LevelCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Level: Create a new level | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new level"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Level',
              href: PATH_DASHBOARD.level.list,
            },
            { name: 'New level' },
          ]}
        />
        <LevelNewEditForm />
      </Container>
    </>
  );
}
