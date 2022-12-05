import React, {useEffect, useMemo, useState} from 'react';
import {Card, Stack} from '@mui/material';
import FormProvider from '../../../../components/hook-form';
// API
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {LoadingButton} from '@mui/lab';
import {PATH_DASHBOARD} from '../../../../routes/paths';
import {useRouter} from 'next/router';
import ClassNewEditMemberDetails from './ClassNewEditMemberDetails';

export default function ClassAddStudentForm({ isEdit = false, currentMember }) {

  const { push } = useRouter();

  const [loadingSend, setLoadingSend] = useState(false);


  const defaultValues = useMemo(
      () => ({
        items: currentMember?.items || [{ title: '', description: '', service: '', quantity: 1, price: 0, total: 0 }],

      }),
      [currentMember]
  );

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentMember) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentMember]);



  const handleCreateAndSend = async (data) => {
  };

  return (
      <FormProvider methods={methods}>

          <ClassNewEditMemberDetails />


        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>

          <LoadingButton
              size="large"
              variant="contained"
              loading={loadingSend && isSubmitting}
              onClick={handleSubmit(handleCreateAndSend)}
          >
            {isEdit ? 'Cập nhật' : 'Tạo mới'}
          </LoadingButton>
        </Stack>
      </FormProvider>
  );
}
