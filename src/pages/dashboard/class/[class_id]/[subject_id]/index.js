import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../../../layouts/dashboard';
import { Container, Grid, Stack, Alert, Typography } from '@mui/material';
import { useSettingsContext } from '../../../../../components/settings';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// component subject
import SysllabusSubject from '../../../../../sections/@dashboard/class/subject/SysllabusSubject';
import DocumentLocal from '../../../../../sections/@dashboard/class/subject/DocumentLocal';
import Head from 'next/head';

//
import { getSubjectById, getDocInClass } from '../../../../../dataProvider/agent';
import UploadDocToSlot from 'src/sections/@dashboard/myclass/popupdiaglog/UploadDocToSlot';
import { getFolderUploadDocToSlotRedux } from 'src/redux/slices/folder';
import { dispatch } from 'src/redux/store';

index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function index() {
  const { themeStretch } = useSettingsContext();

  const [subject, setSubject] = useState();

  const [docs, setDocs] = useState([]);

  const [slotId, setSlotId] = useState(0);

  const [openFormUploadDocToSLot, setOpenFormUploadDocToSlot] = useState(false);

  const handleOpenFormUploadDocToSlot = (id) => {
    console.log('handleOpenFormUploadDocToSlot', id);
    setSlotId(id);
    setOpenFormUploadDocToSlot(true);
  };

  const handleFormUploadDocToSlot = () => {
    setOpenFormUploadDocToSlot(false);
  };

  const {
    query: { class_id, subject_id },
  } = useRouter();

  useEffect(() => {
    dispatch(getFolderUploadDocToSlotRedux(0));
  }),
    useEffect(() => {
      fetchOneSubject();
      fetchDocumentInClass();
    }, [subject_id]);

  async function fetchOneSubject() {
    const res = await getSubjectById(subject_id);
    if (res.status < 400) {
      setSubject(res.data.data);
    } else {
      <Alert severity="info" sx={{ mb: 3 }}>
        {res.message}
      </Alert>;
    }
  }

  async function fetchDocumentInClass() {
    const res = await getDocInClass({
      classId: class_id,
      subjectId: subject_id,
    });
    if (res.status < 400) {
      setDocs(res.data.data);
    } else {
      <Alert severity="info" sx={{ mb: 3 }}>
        {res.message}
      </Alert>;
    }
  }
  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={'xl'}>
        <CustomBreadcrumbs
          heading="Khung chương trình"
          links={[
            { name: 'Trang chủ', href: PATH_DASHBOARD.root },
            { name: 'Môn học', href: PATH_DASHBOARD.class.detail(class_id) },
            { name: 'Khung chương trình' },
          ]}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {' '}
                Tài liệu chung:
              </Typography>
              <DocumentLocal
                docs={docs}
                classId={class_id}
                subjectId={subject_id}
                handleOpenFormUploadDocToSlot={handleOpenFormUploadDocToSlot}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack spacing={1}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                {' '}
                Tài liệu từng tiết:
              </Typography>
              {subject?.listSlots?.map((data) => (
                <SysllabusSubject
                  data={data}
                  classId={class_id}
                  subjectId={subject_id}
                  key={data.id}
                  docs={docs}
                  handleOpenFormUploadDocToSlot={handleOpenFormUploadDocToSlot}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <UploadDocToSlot
        classId={class_id}
        subjectId={subject_id}
        slotId={slotId}
        open={openFormUploadDocToSLot}
        onClose={handleFormUploadDocToSlot}
      />
    </>
  );
}
