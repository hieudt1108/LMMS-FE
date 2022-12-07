import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useFormContext, useFieldArray, useForm, FormProvider } from 'react-hook-form';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsersByRoleIdRedux, getUsersRedux } from 'src/redux/slices/user';
import { getRolesRedux } from 'src/redux/slices/roles';

// @mui
import { Box, Stack, Button, Divider, Typography, Grid, Card } from '@mui/material';
// utils
// components
import Iconify from '../../../../components/iconify';
import { RHFSelect } from '../../../../components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';

export default function ClassNewEditMemberDetails(data) {
  const dispatch = useDispatch();

  const formData = new FormData();

  const { pagination, users } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);

  console.log(users, roles);

  const defaultValues = useMemo(() => ({
    items: [
      {
        roleId: '',
        userId: '',
        subjectId: '',
      },
    ],
  }));

  const methods = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({
      roleId: '',
      userId: '',
      subjectId: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  useEffect(() => {
    dispatch(getUsersRedux(pagination));
    dispatch(getRolesRedux({ pageIndex: 1, pageSize: 100 }));
  }, [dispatch]);

  const handlerRoleChange = useCallback((event, value) => {
    dispatch(getUsersByRoleIdRedux({ ...pagination, roleId: value?.props.value }));
  }, []);

  const handlerUserChange = useCallback((event, value) => {
    dispatch(getUsersByRoleIdRedux({ ...pagination, userId: value?.props.value }));
  }, []);

  const onSubmit = async ({ items }) => {
    console.log('onSubmit', items);
  };

  return <Box></Box>;
}
