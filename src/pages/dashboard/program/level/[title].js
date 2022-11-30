import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Container, Divider, Tab, Tabs, Card } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import { SkeletonPostDetails } from '../../../../components/skeleton';
//
import LevelFirst from '../../../../sections/@dashboard/program/level/LevelFirst';
import LevelSecond from '../../../../sections/@dashboard/program/level/LevelSecond';
import Head from "next/head";

// ----------------------------------------------------------------------

LevelLayout.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LevelLayout() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { title },
  } = useRouter();
  console.log('test: ', title);

  const [currentTab, setCurrentTab] = useState('description');

  const TABS = [
    {
      value: 'description',
      label: 'Tiểu học',
      component: <LevelFirst title={title} />,
    },
    {
      value: 'reviews',
      label: `Trung học cơ sở`,
      component: <LevelSecond title={title} />,
    },
  ];

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Khối học"
          links={[
            {
              name: 'Trang chủ',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Chương trình học',
              href: PATH_DASHBOARD.program.choose,
            },
            {
              name: title,
            },
          ]}
        />
        <Card>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{ px: 3, bgcolor: 'background.neutral' }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Divider />

          {TABS.map(
            (tab) =>
              tab.value === currentTab && (
                <Box
                  key={tab.value}
                  sx={{
                    ...(currentTab === 'description'),
                  }}
                >
                  {tab.component}
                </Box>
              )
          )}
        </Card>
      </Container>
    </>
  );
}
