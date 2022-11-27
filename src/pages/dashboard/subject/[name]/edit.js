import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _subjects } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import SubjectNewEditForm from '../../../../sections/@dashboard/subject/SubjectNewEditForm';
import {useEffect, useState} from "react";
import {getGradeById, getSubjectById} from "../../../../dataProvider/agent";

// ----------------------------------------------------------------------

SubjectEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function SubjectEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();

    const [subjectData, setSubjectData] = useState([]);

    useEffect(() => {
        fetchSubject();
    }, []);

    async function fetchSubject() {
        const res = await getSubjectById(name);
        console.log(res.data.data)
        if (res.status < 400) {
            setSubjectData(res.data.data);
        } else {
            console.log('error');
        }
    }

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Cập nhật môn học"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Danh sách môn học',
              href: PATH_DASHBOARD.subject.list,
            },
            { name: 'Cập nhật môn học' },
          ]}
        />
        <SubjectNewEditForm isEdit currentSubject={subjectData} />
      </Container>
    </>
  );
}
