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
import ClassNewEditForm from '../../../../sections/@dashboard/class/form/ClassNewEditForm';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClassRedux } from 'src/redux/slices/class';

// ----------------------------------------------------------------------

ClassCreatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ClassCreatePage() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  const { classObj } = useSelector((state) => state.class);

  const {
    query: { class_id },
  } = useRouter();

  useEffect(() => {
    dispatch(getClassRedux(class_id));
  }, [dispatch, class_id]);

  console.log('ClassCreatePage', class_id, classObj);
  return (
    <>
      <Head>
        <title> Class: Create a new Class | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new class"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Class',
              href: PATH_DASHBOARD.class.root,
            },
            {
              name: 'New class',
            },
          ]}
        />
        <ClassNewEditForm isEdit currentClass={classObj} />
      </Container>
    </>
  );
}
