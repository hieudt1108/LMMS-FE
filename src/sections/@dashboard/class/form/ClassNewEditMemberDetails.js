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

  const [listRoles, setListRoles] = useState([]);
  const [listSubjects, setListSubjects] = useState([]);
  const [roleID, setRoleID] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (roleID.length > 0) {
        const response = await getAllUsers({ pageSize: 100, roleId: roleID });
        console.log(response.data.data);
        setUsers(response.data.data);
      }
    };

    const fetchRoles = async () => {
      const response = await getALlRoles({ pageSize: 100 });
      setListRoles(response.data.data);
    };

    const onSubmit = async ({ items }) => {
      console.log('onSubmit', items);
    };

    fetchUsers();
    fetchRoles();
    fetchSubjects();
  }, []);

  const handlerRoleChange = useCallback((event, value) => {
    console.log('handlerRoleChange', event.target.value);
    setRoleID(event.target.value);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Chi tiết:
      </Typography>

      {/* <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column' }} spacing={2} sx={{ width: 1 }}>
              <Grid item container md={12} spacing={2}>
                <Grid item md={4} xs={12}>
                  <RHFSelect name={`items[${index}].vaiTro`} onChange={handlerRoleChange} label="Vai trò">
                    <option value="" />
                    {listRoles.length > 0 &&
                      listRoles
                        .filter((role) => role.name == 'GIAOVIEN' || role.name == 'HOCSINH')
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                  </RHFSelect>
                </Grid>
                {roleID.length > 0 && (
                  <Grid item md={4} xs={12}>
                    <RHFAutocomplete
                      name={`items[${index}].nguoiDung`}
                      fullWidth
                      onChange={(event, value) => {
                        console.log(value);
                        setValue(`items[${index}].nguoiDung`, value);
                      }}
                      options={users}
                      getOptionLabel={(option) => option.email || ''}
                      renderInput={(params) => <TextField label="Người dùng" {...params} />}
                    />
                  </Grid>
                )}
                <Grid item md={4} xs={12}>
                  <RHFAutocomplete
                    name={`items[${index}].monDay`}
                    multiple
                    onChange={(event, newValue) => {
                      console.log(newValue);
                      setValue(`items[${index}].monDay`, newValue);
                    }}
                    // options={LIST_SUBJECT}
                    options={listSubjects}
                    getOptionLabel={(option) => option.name}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option.id} size="small" label={option.name} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Môn dạy" {...params} />}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              Gỡ
            </Button>
          </Stack>
        ))}
      </Stack> */}

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          Thêm mới
        </Button>
      </Stack>
    </Box>
  );
}
