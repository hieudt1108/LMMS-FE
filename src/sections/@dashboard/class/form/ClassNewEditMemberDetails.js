import sum from 'lodash/sum';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useFormContext, useFieldArray, useForm, FormProvider } from 'react-hook-form';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUsersByRoleIdRedux, getUsersRedux } from 'src/redux/slices/user';
import { getRolesRedux } from 'src/redux/slices/roles';

// @mui
import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  InputAdornment,
  MenuItem,
  Alert,
  Chip,
  TextField,
  Grid,
  InputLabel,
  Select,
  FormControl,
  Card,
} from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFAutocomplete, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { getALlRoles, getAllSubject, getAllUsers } from '../../../../dataProvider/agent';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';

export default function ClassNewEditMemberDetails(data) {
  const dispatch = useDispatch();

  const { pagination, users } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);

  console.log(users, roles);

  const defaultValues = useMemo(() => ({
    items: [
      {
        roleId: '',
        userId: '',
        // subjectId: '',
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

  // const [users, setUsers] = useState([]);
  const [listRoles, setListRoles] = useState('');
  const [oneUser, setOneUser] = useState('');

  useEffect(() => {
    dispatch(getUsersRedux(pagination));
    dispatch(getRolesRedux({ pageIndex: 1, pageSize: 100 }));
  }, [dispatch]);
  // console.log('role id', listRoles);

  const handlerRoleChange = useCallback((event, value) => {
    // console.log('handlerRoleChange', value.props.value);
    // setListRoles(value.props.value);
    dispatch(getUsersByRoleIdRedux({ ...pagination, roleId: value?.props.value }));
  }, []);

  const handlerUserChange = useCallback((event, value) => {
    // console.log('handlerUserChange', value.id);
    // setOneUser(value.props.value);
    dispatch(getUsersByRoleIdRedux({ ...pagination, userId: value?.props.value }));
  }, []);

  const onSubmit = async ({ items }) => {
    console.log('onSubmit', items);
    // for (let index = items.length - 1; index >= 0; --index) {
    //   try {
    //     const data = items[index];
    //     if (!data.file) {
    //       continue;
    //     }
    //     if (!data.programId) {
    //       data.programId = programs[0].id;
    //     }
    //     if (!data.subjectId) {
    //       data.subjectId = user.subjects[0].id;
    //     }
    //     if (!data.typeDocumentId) {
    //       data.typeDocumentId = typeDocuments[0].id;
    //     }
    //     console.log('data', data);
    //     data.folderId = folderId;

    //     formData.append('File', getValues(`items[${index}].file`));
    //     const response = await postFile(formData);
    //     if (response.status !== 200) {
    //       enqueueSnackbar(`Tạo tài liệu${data.code} thất bại`, { variant: 'error' });
    //       continue;
    //     }
    //     console.log('response', response);
    //     data.TypeFile = response.data.contentType;
    //     data.urlDocument = response.data.fileName;
    //     data.size = response.data.size;
    //     const responsePostDocument = await postDocument(data);
    //     if (responsePostDocument.status !== 200) {
    //       enqueueSnackbar(`Tạo tài liệu${data.code} thất bại`, { variant: 'error' });
    //       continue;
    //     }
    //     remove(index);
    //     enqueueSnackbar(`Tạo tài liệu${data.code} thành công`);
    //     console.log('responsePostDocument', responsePostDocument);
    //   } catch (error) {
    //     console.error(`onSubmit error at index: ${index}`, error);
    //   }
    // }
    // items.map((data, index) => {
    //   data.status = data.status ? 1 : 0;
    //   dispatch(uploadDocumentRedux(data)).then(() => {
    //     enqueueSnackbar('Tạo tài liệu thành công');
    //     push(PATH_DASHBOARD.folder.link(folderId));
    //   });
    // });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Chi tiết:
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div key={index}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Quyền</span>
                      <RHFSelect name={`items[${index}].roleId`} placeholder="Quyền">
                        {roles.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </RHFSelect>
                    </div>
                    {/* <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Người dùng</span>
                      <RHFSelect name={`items[${index}].userId`} placeholder="Môn học">
                        {users.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.email}
                          </option>
                        ))}
                      </RHFSelect>
                    </div> */}
                    {/* <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Loại</span>
                      <RHFSelect name={`items[${index}].typeDocumentId`} placeholder="Loại tài liệu">
                        {typeDocuments.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </RHFSelect>
                    </div> */}
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
          <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
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
              Đăng tải tài liệu
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Box>
  );
}
