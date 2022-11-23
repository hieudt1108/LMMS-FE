import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _programList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import ProgramNewEditForm from '../../../../sections/@dashboard/program/ProgramNewEditForm';

// ----------------------------------------------------------------------

ProgramEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ProgramEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();

  const currentProgram = _programList.find((program) => program.id === name);

  return (
    <>
      <Head>
        <title> Program: Edit program | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Cập nhật chương trình học"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Danh sách chương trình học',
              href: PATH_DASHBOARD.program.list,
            },
            { name: `Cập nhật ${currentProgram?.id}`},
          ]}
        />

        <ProgramNewEditForm isEdit currentProgram={currentProgram} />
      </Container>
    </>
  );
}
