import sum from 'lodash/sum';
import { useCallback, useEffect, useState } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
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
} from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFAutocomplete, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { getALlRoles, getAllSubject, getAllUsers } from '../../../../dataProvider/agent';

export default function ClassNewEditMemberDetails(data) {
  const { control, setValue, getValues, watch, resetField } = useFormContext();

  const dispatch = useDispatch();

  const { pagination, users } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.role);

  console.log('ClassNewEditMemberDetails', users, roles, pagination);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAdd = () => {
    append({
      nguoiDung: '',
      vaiTro: '',
      monDay: [],
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  // const [users, setUsers] = useState([]);
  const [listRoles, setListRoles] = useState('');

  useEffect(() => {
    dispatch(getUsersRedux(pagination));
    dispatch(getRolesRedux({ pageIndex: 1, pageSize: 100 }));
  }, [dispatch]);
  // console.log('role id', listRoles);

  const handlerRoleChange = useCallback((event, value) => {
    console.log('handlerRoleChange', value.props.value);
    dispatch(getUsersByRoleIdRedux({ ...pagination, roleId: value.props.value }));
  }, []);

  const handlerUserChange = useCallback((event, value) => {
    console.log('handlerUserChange', value.id);
    dispatch(getUsersByRoleIdRedux({ ...pagination, userId: value.id }));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Chi tiết:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column' }} spacing={2} sx={{ width: 1 }}>
              <Grid item container md={12} spacing={2}>
                <Grid item md={12} xs={12}>
                  {/* <RHFSelect name={`items[${index}].vaiTro`} label="Vai trò">
                    <option value=""></option>
                    {roles.length > 0 &&
                      roles
                        .filter((role) => role.name == 'GIAOVIEN' || role.name == 'HOCSINH')
                        .map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                  </RHFSelect> */}
                  <FormControl sx={{ minWidth: 240 }} size="large">
                    <InputLabel id="demo-simple-select-helper-label">Vai trò</InputLabel>
                    <Select
                      name={`items[${index}].vaiTro`}
                      id="demo-simple-select-helper"
                      value={listRoles}
                      label="Vai trò"
                      onChange={handlerRoleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {roles &&
                        roles?.map((obj) =>
                          obj.name === 'HOCSINH' || obj.name === 'GIAOVIEN' ? (
                            <MenuItem value={obj.id} key={obj.id}>
                              {obj.name}
                            </MenuItem>
                          ) : (
                            ''
                          )
                        )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={8} xs={12}>
                  <RHFAutocomplete
                    name={`items[${index}].nguoiDung`}
                    fullWidth
                    onChange={handlerUserChange}
                    options={users}
                    getOptionLabel={(option) => option.email || ''}
                    renderInput={(params) => <TextField label="Người dùng" {...params} />}
                  />
                </Grid>
                {users.length === 1 && (
                  <Grid item md={4} xs={12}>
                    <RHFAutocomplete
                      name={`items[${index}].monDay`}
                      multiple
                      onChange={(event, newValue) => {
                        console.log(newValue);
                        setValue(`items[${index}].monDay`, newValue);
                      }}
                      // options={LIST_SUBJECT}
                      options={users[0].subjects}
                      getOptionLabel={(option) => option.name}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option.id} size="small" label={option.name} />
                        ))
                      }
                      renderInput={(params) => <TextField label="Môn dạy" {...params} />}
                    />
                  </Grid>
                )}
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
      </Stack>

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
