import { useState } from 'react';
import * as Yup from 'yup';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {Link, Stack, Alert, IconButton, InputAdornment, TextField, MenuItem} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, {RHFSelect, RHFTextField} from '../../components/hook-form';
import {BlogPostsSort} from "../@dashboard/blog";

// ----------------------------------------------------------------------


const SORT_OPTIONS = [
    { value: 'admin', label: 'Quản trị viên' },
    { value: 'teacher', label: 'Giáo viên' },
    { value: 'student', label: 'Học sinh' },
];

export default function AuthLoginForm() {
  const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });



  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}


          <TextField
              select
              size="small"
              SelectProps={{
                  sx: { typography: 'body2' },
              }}
          >
              {SORT_OPTIONS.map((option) => (
                  <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{
                          mx: 1,
                          my: 0.5,
                          borderRadius: 0.75,
                          textTransform: 'capitalize',
                          '&:first-of-type': { mt: 0 },
                          '&:last-of-type': { mb: 0 },
                      }}
                  >
                      {option.label}
                  </MenuItem>
              ))}
          </TextField>

        <RHFTextField name="email" label="Tên đăng nhập" />

        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="body2" color="inherit" underline="always">
            Quên mật khẩu
          </Link>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
        sx={{
          bgcolor: 'text.primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
