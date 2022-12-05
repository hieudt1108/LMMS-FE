import sum from 'lodash/sum';
import {useCallback, useEffect, useState} from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import {Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem, Alert, Chip, TextField} from '@mui/material';
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

export default function ClassNewEditMemberDetails() {
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
    console.log('user: ', userRole);

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
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                <RHFTextField
                    size="small"
                    name={`items[${index}].title`}
                    label="Title"
                    InputLabelProps={{ shrink: true }}
                />

                <RHFTextField
                    size="small"
                    name={`items[${index}].description`}
                    label="Description"
                    InputLabelProps={{ shrink: true }}
                />

                <RHFSelect
                    name={`items[${index}].service`}
                    size="small"
                    label="Service"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        native: false,
                        MenuProps: {
                            PaperProps: {
                                sx: { maxHeight: 220 },
                            },
                        },
                        sx: { textTransform: 'capitalize' },
                    }}
                    sx={{
                        maxWidth: { md: 160 },
                    }}
                >
                    <MenuItem
                        value=""
                        onClick={() => handleClearService(index)}
                        sx={{
                            mx: 1,
                            borderRadius: 0.75,
                            typography: 'body2',
                            fontStyle: 'italic',
                            color: 'text.secondary',
                        }}
                    >
                        None
                    </MenuItem>

                    <Divider />

                    {SERVICE_OPTIONS.map((option) => (
                        <MenuItem
                            key={option.id}
                            value={option.name}
                            onClick={() => handleSelectService(index, option.name)}
                            sx={{
                                mx: 1,
                                my: 0.5,
                                borderRadius: 0.75,
                                typography: 'body2',
                                textTransform: 'capitalize',
                                '&:first-of-type': { mt: 0 },
                                '&:last-of-type': { mb: 0 },
                            }}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </RHFSelect>
                <RHFAutocomplete
                    name="tags"
                    multiple
                    freeSolo
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{
                        native: false,
                        MenuProps: {
                            PaperProps: {
                                sx: { maxHeight: 220 },
                            },
                        },
                        sx: { textTransform: 'capitalize' },
                    }}
                    sx={{
                        maxWidth: { md: 160 },
                    }}
                    onChange={(event, newValue) => setValue('tags', newValue)}
                    options={users.map((option) => option.email)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                    }
                    renderInput={(params) => <TextField label="Danh sách người dùng" {...params} />}
                />
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
