import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Container, Divider, Tab, Tabs, Card } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

GradeSub.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function GradeSub() {
  return <div>hello</div>;
}
