import * as Yup from 'yup';
import { useState, useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Card,
  Stack,
  Typography,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
} from '@mui/material';
// routes
//components
// import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSwitch, RHFTextField, RHFSelect, RHFUpload, RHFAutocomplete } from 'src/components/hook-form';
// ----------------------------------------------------------------------
import { postDocument, postFile } from 'src/dataProvider/agent';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { createDocumentInitialRedux, uploadDocumentRedux } from 'src/redux/slices/folder';
import { Upload } from 'src/components/upload';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useSnackbar } from 'notistack';
import {
  createAddUserInCLassRedux,
  filterSubjectRedux,
  getUsersByRoleIdRedux,
  getUsersRedux,
} from 'src/redux/slices/user';
import { getRolesRedux } from 'src/redux/slices/roles';

// ----------------------------------------------------------------------
const checkArray = (arrayName) => {
  return arrayName && arrayName.length;
};

export default function BlogNewPostForm() {
  const { user } = useAuthContext();
  const formData = new FormData();
  const {
    query: { folder_id: folderId },
    push,
  } = useRouter();

  const { pagination, addUserInCLass } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);

  const validationSchema = (() => {
    return Yup.object().shape({
      items: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is require!'),
          code: Yup.string().required('Code is require!'),
          description: Yup.string().required('Description is require!'),
        })
      ),
    });
  })();

  const { newDocument } = useSelector((state) => state.folder);

  const defaultValues = useMemo(() => ({
    items: [
      {
        roleId: '',
        userId: '',
        subjectId: [],
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

  useEffect(() => {
    dispatch(getUsersRedux({ pageIndex: 1, pageSize: 100 }, 0));
  }, []);

  const onSubmit = async ({ items }) => {
    console.log('onSubmit', items);
  };

  const handleAdd = (index) => {
    dispatch(createAddUserInCLassRedux());
    dispatch(getUsersRedux({ pageIndex: 1, pageSize: 100 }, index));
    append({
      roleId: '',
      userId: '',
      subjectId: [],
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handlerRoleChange = useCallback((event, index) => {
    console.log('handlerRoleChange', event.target.name, event.target.value);
    setValue(event.target.name, event.target.value);
    // console.log('handlerRoleChange');
    // console.log('handlerRoleChange', value.props.value);
    // setListRoles(value.props.value);
    // setvalue()
    dispatch(getUsersByRoleIdRedux({ ...pagination, roleId: event.target.value }, index));
  }, []);

  const handlerUserChange = (event, index) => {
    console.log('handlerUserChange', event, index);
    setValue(event.target.name, event.target.value);
    dispatch(filterSubjectRedux({ users: addUserInCLass[index].users, userId: event.target.value, index }));
    // console.log('handlerUserChange', value.id);
    // setOneUser(value.props.value);
  };
  console.log('BlogNewPostForm', getValues('items'), addUserInCLass);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={index}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Người dùng</span>
                      <RHFSelect
                        name={`items[${index}].userId`}
                        placeholder="nguoi"
                        onChange={(event) => handlerUserChange(event, index)}
                      >
                        {checkArray(addUserInCLass) &&
                          checkArray(addUserInCLass[index].users) &&
                          addUserInCLass[index].users.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.email} - {option.firstName} {option.lastName}
                            </option>
                          ))}
                      </RHFSelect>
                    </div>
                    {checkArray(addUserInCLass) && checkArray(addUserInCLass[index].roles) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Quyền</span>
                        <RHFSelect
                          name={`items[${index}].roleId`}
                          placeholder="Quyền"
                          onChange={(event) => handlerRoleChange(event, index)}
                        >
                          {addUserInCLass[index].roles.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </RHFSelect>
                      </div>
                    )}

                    {checkArray(addUserInCLass) && checkArray(addUserInCLass[index].subjects) && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Môn học</span>
                        <RHFAutocomplete
                          sx={{ width: '856px' }}
                          name={`items[${index}].subjectId`}
                          multiple
                          onChange={(event, newValue) => {
                            console.log('RHFAutocomplete', newValue);
                            setValue(`items[${index}].subjectId`, newValue);
                          }}
                          options={addUserInCLass[index].subjects.length ? addUserInCLass[index].subjects : []}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
                            ))
                          }
                          renderInput={(params) => {
                            return <TextField {...params} />;
                          }}
                        />
                      </div>
                    )}

                    {/*
                    
                    // checkArray(addUserInCLass) && checkArray(addUserInCLass[index].subjects)
                          //   ? addUserInCLass[index].subjects
                          //   : []
                    
                    {subjects && subjects.length ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Môn học</span>
                        <RHFSelect name={`items[${index}].subjectId`} placeholder="Môn học">
                          {subjects.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </RHFSelect>
                      </div>
                    ) : (
                      ''
                    )} */}
                  </Stack>
                </Card>

                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </Button>
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
          </div>
        ))}

        <Stack
          spacing={2}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => handleAdd(fields.length)}
            sx={{ flexShrink: 0 }}
          >
            Thêm bản ghi
          </Button>

          <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
            <LoadingButton
              disabled={getValues('items').length === 0}
              type="submit"
              variant="contained"
              size="large"
              loading={isSubmitting}
            >
              Gỡ
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
}
