import React from 'react';
import DashboardLayout from '../../../../layouts/dashboard';
import { useRouter } from 'next/router';

SubGrade.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function SubGrade() {
  const {
    query: { sub_id },
  } = useRouter();
  console.log(sub_id);

  return <div>grade</div>;
}
