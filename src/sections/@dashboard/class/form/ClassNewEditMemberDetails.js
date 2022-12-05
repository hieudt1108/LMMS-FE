import sum from 'lodash/sum';
import {useCallback, useEffect, useState} from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
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
    Grid
} from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import {RHFAutocomplete, RHFSelect, RHFTextField} from '../../../../components/hook-form';
import {getALlRoles, getAllSubject, getAllUsers} from "../../../../dataProvider/agent";

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  { id: 1, name: 'full stack development', price: 90.99 },
  { id: 2, name: 'backend development', price: 80.99 },
  { id: 3, name: 'ui design', price: 70.99 },
  { id: 4, name: 'ui/ux design', price: 60.99 },
  { id: 5, name: 'front end development', price: 40.99 },
];

// ----------------------------------------------------------------------

export default function ClassNewEditMemberDetails(data) {
  const { control, setValue,getValues, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const totalPrice = sum(totalOnRow) - values.discount + values.taxes;

  useEffect(() => {
    setValue('totalPrice', totalPrice);
  }, [setValue, totalPrice]);

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(`items[${index}].price`, SERVICE_OPTIONS.find((service) => service.name === option)?.price);
      setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
    },
    [setValue, values.items]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].price`, Number(event.target.value));
      setValue(`items[${index}].total`, values.items.map((item) => item.quantity * item.price)[index]);
    },
    [setValue, values.items]
  );
    const tagsId = '';
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [userSubjects, setUserSubjects] = useState([]);
    const [role, setRole] = useState([]);
    useEffect(() => {
        fetchRoles();
        fetchSubject();
        fetchAllUser();
    }, []);

    async function fetchRoles() {
        const res = await getALlRoles({ pageIndex: 1, pageSize: 100 });
        if (res.status < 400) {
            const transformData = res.data.data.map((tag) => {
                return {
                    label: tag.name,
                    id: tag.id,
                };
            });
            setUserRole(transformData);
        } else {
            <Alert severity="info" sx={{ mb: 3 }}>
                {res.message}
            </Alert>;
        }
    }
    async function fetchAllUser() {
        const res = await getAllUsers();
        if (res.status < 400) {
            setUsers(res.data.data);
        } else {
            <Alert severity="info" sx={{ mb: 3 }}>
                {res.message}
            </Alert>;
        }
    }

    async function fetchSubject() {
        const res = await getAllSubject({ pageIndex: 1, pageSize: 100 });
        if (res.status < 400) {
            const transformDataSubject = res.data.data.map((su) => {
                return {
                    label: su.name,
                    id: su.id,
                };
            });

            setUserSubjects(transformDataSubject);
        } else {
            <Alert severity="info" sx={{ mb: 3 }}>
                {res.message}
            </Alert>;
        }
    }

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
                    <Grid item md={4} xs={12}>
                        <RHFAutocomplete
                            name="tags"
                            multiple
                            freeSolo
                            onChange={(event, newValue) => setValue('tags', newValue)}
                            options={users.map((option) => option.email)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                                ))
                            }
                            renderInput={(params) => <TextField label="Danh sách người dùng" {...params} />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <RHFAutocomplete
                            name="roleID"
                            multiple
                            onChange={(event, newValue) => {
                                setValue('roleID', newValue);
                                const tagsId = newValue.map((tag) => tag.id);
                                setValue('tagsId', tagsId);
                                setRole(tagsId);
                                if (!getValues('tagsId').includes(11)) {
                                    setValue('subjectId', []);
                                }
                            }}
                            options={userRole}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
                                ))
                            }
                            renderInput={(params) => <TextField label="Vai trò" {...params} />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <RHFAutocomplete
                            name="subjectId"
                            multiple
                            onChange={(event, newValue) => {
                                setValue('subjectId', newValue);
                                const suId = newValue.map((su) => su.id);
                                setValue('suId', suId);
                            }}

                            options={userSubjects}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
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
