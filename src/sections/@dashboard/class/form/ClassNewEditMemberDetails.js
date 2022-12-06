import sum from 'lodash/sum';
import { useCallback, useEffect, useState } from 'react';
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
    Grid,
    Autocomplete,
} from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFAutocomplete, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { getALlRoles, getAllSubject, getAllUsers } from '../../../../dataProvider/agent';



export default function ClassNewEditMemberDetails(data) {
    const { control, setValue, getValues, watch, resetField } = useFormContext();

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

    const [users, setUsers] = useState([]);
    const [listRoles, setListRoles] = useState([]);
    const [listSubjects, setListSubjects] = useState([]);

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await getALlRoles({ pageSize: 100 });
            setListRoles(response.data.data);
        };

        const fetchSubjects = async () => {
            const response = await getAllSubject({ pageSize: 100 });
            console.log(response.data.data);
            setListSubjects(response.data.data);
        };

        fetchRoles();
        fetchSubjects();
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
                                <Grid item md={4} xs={12}>
                                    <RHFAutocomplete
                                        name={`items[${index}].nguoiDung`}
                                        fullWidth
                                        onChange={(event, value) => {
                                            console.log(value);
                                            setValue(`items[${index}].nguoiDung`, value);
                                        }}
                                        onInputChange={async (event, value, reason) => {
                                            // if (reason === 'input') {
                                            const response = await getAllUsers({
                                                searchByEmail: value,
                                                pageSize: 5,
                                            });
                                            console.log(response.data.data);
                                            setUsers(response.data.data);
                                            // }
                                        }}
                                        options={users}
                                        getOptionLabel={(option) => option.email || ''}
                                        renderInput={(params) => <TextField label="Người dùng" {...params} />}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <RHFSelect name={`items[${index}].vaiTro`} label="Vai trò">
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
