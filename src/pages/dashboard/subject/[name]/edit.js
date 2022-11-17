import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _subjectList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import SubjectNewEditForm from '../../../../sections/@dashboard/subject/SubjectNewEditForm';

// ----------------------------------------------------------------------

SubjectEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function SubjectEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();

  const currentSubject = _subjectList.find((subject) => paramCase(subject.name) === name);

  return (
    <>
      <Head>
        <title> Subject: Edit subject | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit subject"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Subject',
              href: PATH_DASHBOARD.subject.list,
            },
            { name: currentSubject?.name },
          ]}
        />

        <SubjectNewEditForm isEdit currentSubject={currentSubject} />
      </Container>
    </>
  );
}
