import React, { useEffect, useMemo, useState } from 'react';
import { Card, Stack } from '@mui/material';
import FormProvider from '../../../../components/hook-form';
// API
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useRouter } from 'next/router';
import ClassNewEditMemberDetails from './ClassNewEditMemberDetails';
import { updateClassMember } from 'src/dataProvider/agent';

export default function ClassAddStudentForm({ isEdit = false, classID }) {
  const { push } = useRouter();

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <ClassNewEditMemberDetails classID={classID} />
    </div>
  );
}
