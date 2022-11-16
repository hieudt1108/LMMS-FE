// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// _mock_
import { _subjects, _subjectNew, _subjectsOverview, _subjectReview } from '../../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../../components/settings';
// sections
import {
  ClassCustomerReviews,
  CLassDetails,
  ClassNewestBooking,
  ClassReservationStats,
  ClassRoomAvailable,
  ClassTotalIncomes,
  ClassWidgetSummary,
  ClassBookedRoom,
} from '../../../../sections/@dashboard/class';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration } from '../../../../assets/illustrations';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

ClassDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function ClassDetail() {
  const router = useRouter();
  const theme = useTheme();

  const {
    query: { class_id },
  } = useRouter();
  console.log('ClassDetail', class_id);

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Class: Class Detail</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ClassWidgetSummary title="Giáo viên" total={7} icon={<BookingIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassWidgetSummary title="Học sinh" total={30} icon={<CheckInIllustration />} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassWidgetSummary title="Tài liệu" total={124000} icon={<CheckOutIllustration />} />
          </Grid>

          <Grid item xs={12} md={8}>
            <ClassReservationStats
              title="Thống kê tài liệu"
              subheader="Tiên học lễ. Hậu học văn"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    type: 'Week',
                    data: [
                      { name: 'Tải lên', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      { name: 'Tải xuống', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      { name: 'Tải lên', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'Tải xuống', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      { name: 'Tải lên', data: [76, 42, 29, 41, 27, 138, 117, 86, 63] },
                      { name: 'Tải xuống', data: [80, 55, 34, 114, 80, 130, 15, 28, 55] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <ClassCustomerReviews title="Thông tin giáo viên" list={_subjectReview} />
          </Grid>

          <Grid item xs={12}>
            <ClassNewestBooking title="Môn học" subheader="12 môn học" list={_subjectNew} />
          </Grid>

          <Grid item xs={12}>
            <CLassDetails
              title="Thông tin giáo viên"
              tableData={_subjects}
              tableLabels={[
                { id: 'STT', label: 'STT' },
                { id: 'name', label: 'Họ và tên' },
                { id: 'email', label: 'E-mail' },
                { id: 'enable', label: 'Trạng thái' },
                { id: 'subject', label: 'Môn phụ trách' },
                { id: '' },
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <CLassDetails
              title="Thông tin học sinh"
              tableData={_subjects}
              tableLabels={[
                { id: 'STT', label: 'STT' },
                { id: 'name', label: 'Họ và tên' },
                { id: 'email', label: 'E-mail' },
                { id: 'enable', label: 'Trạng thái' },
                { id: 'gender', label: 'Giới tính' },
                { id: '' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}