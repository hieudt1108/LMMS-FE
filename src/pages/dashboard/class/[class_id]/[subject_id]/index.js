import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../../../layouts/dashboard';

index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function index() {
  const {
    query: { class_id, subject_id },
  } = useRouter();

  console.log(class_id, subject_id);
  return <div>sysllabus</div>;
}
