import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import BoxedLayout from '../../core/components/BoxedLayout';
// import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { ROUTER } from '../../Router';
// import { useDispatch } from "react-redux";
// import { useAuth } from '../contexts/AuthProvider';
import {
  loginAuth,
  setLocalStorage,
  getLocalStorage,
} from '../../../src/app/api/agent';
import { dataLayerPush } from '../../Utils/dataLayerPush';

const Login = () => {
  // const { isLoggingIn, login } = useAuth();
  const navigate = useNavigate();
  // const snackbar = useSnackbar();
  const { t } = useTranslation();

  const initUser = {
    email: '',
    password: '',
  };

  const [loginData, setLoginData] = useState(initUser);
  const [error, setError] = useState('');

  useEffect(() => {
    const isAuthenticated = getLocalStorage('isAuthenticated');
    if (isAuthenticated) {
      navigate(ROUTER.ADMIN, { replace: true });
    }
  });
  // const handleLogin = (email: string, password: string) => {
  //   login(email, password)
  //     .then(() => navigate(ROUTER.ADMIN, { replace: true }))
  //     .catch(() => snackbar.error(t('common.errors.unexpected.subTitle')));
  // };

  // const formik = useFormik({
  //   initialValues: {
  //     email: 'demo@example.com',
  //     password: "guWEK<'r/-47-XG3",
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string()
  //       .email(t('common.validations.email'))
  //       .required(t('common.validations.required')),
  //     password: Yup.string()
  //       .min(8, t('common.validations.min', { size: 8 }))
  //       .required(t('common.validations.required')),
  //   }),
  //   onSubmit: (values) => handleLogin(values.email, values.password),
  // });

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    // optional
    if (!loginData.email) {
      setError('school');
      return;
    }
    if (!loginData.email) {
      setError('email');
      return;
    }
    if (!loginData.email) {
      setError('password');
      return;
    }
    setError('');

    const res = await loginAuth(loginData);
    console.log('Data :', res);
    if (res.status < 400) {
      navigate(ROUTER.ADMIN, { replace: true });
      // setLocalStore
      setLocalStorage('access_token', res.data.token);
      setLocalStorage('user_info', res.data.user);
      setLocalStorage('isAuthenticated', true);
      // dispatch({ type: LOGIN_REQUEST, user: res.data.user });
      dataLayerPush('test', {
        type: 'login',
        login: loginData,
      });
    } else if (res.response) {
      alert('Tài khoản này không có hoặc bị sai thông tin!!');
    }
  }
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        onClick={() => navigate(`/${process.env.PUBLIC_URL}`)}
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          cursor: 'pointer',
          backgroundImage: 'url(./img/startup.svg)',
          backgroundRepeat: 'no-repeat',
          bgcolor: 'background.default',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <BoxedLayout>
          <Typography component='h1' variant='h5'>
            {t('auth.login.title')}
          </Typography>
          <Box component='form' marginTop={3} noValidate onSubmit={handleLogin}>
            <TextField
              margin='normal'
              variant='filled'
              required
              fullWidth
              id='email'
              label={t('auth.login.form.email.label')}
              name='email'
              autoComplete='email'
              autoFocus
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
            {error === 'email' && (
              <span className={`  text-danger `}>Bạn chưa nhập email</span>
            )}
            <TextField
              margin='normal'
              variant='filled'
              required
              fullWidth
              name='password'
              label={t('auth.login.form.password.label')}
              type='password'
              id='password'
              autoComplete='current-password'
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              // disabled={isLoggingIn}
              // value={formik.values.password}
              // onChange={formik.handleChange}
              // error={formik.touched.password && Boolean(formik.errors.password)}
              // helperText={formik.touched.password && formik.errors.password}
            />
            {error === 'email' && (
              <span className={`  text-danger `}>Bạn chưa pass</span>
            )}
            <Box sx={{ textAlign: 'right' }}>
              <Link
                component={RouterLink}
                to={ROUTER.FORGOT_PASSWORD}
                variant='body2'
              >
                {t('auth.login.forgotPasswordLink')}
              </Link>
            </Box>
            <LoadingButton
              type='submit'
              fullWidth
              // loading={isLoggingIn}
              variant='contained'
              sx={{ mt: 3 }}
            >
              {t('auth.login.submit')}
            </LoadingButton>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
