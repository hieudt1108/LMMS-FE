import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoadingButton from '@material-ui/lab/LoadingButton';

import {useTranslation} from 'react-i18next';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import BoxedLayout from '../../core/components/BoxedLayout';
import {ROUTER} from '../../Router';

import {
  loginAuth,
  setLocalStorage,
  getLocalStorage,
} from '../../dataProvider/agent.js';
import {dataLayerPush} from '../../Utils/dataLayerPush.js';

const Login = () => {
  const navigate = useNavigate();

  const {t} = useTranslation();

  const initUser = {
    username: '',
    password: '',
  };

  const [loginData, setLoginData] = useState(initUser);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const isAuthenticated = getLocalStorage('isAuthenticated');
  //   if (isAuthenticated) {
  //     navigate(ROUTER.ADMIN);
  //   }
  // });

  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    // optional

    if (!loginData.username) {
      setError('username');
      return;
    }
    if (!loginData.username) {
      setError('password');
      return;
    }
    setError('');

    const res = await loginAuth(loginData);
    console.log('Data :', res);
    if (res.status < 400) {
      navigate(ROUTER.ADMIN);

      setLocalStorage('access_token', res.data.token);
      setLocalStorage('user_info', res.data.user);
      setLocalStorage('isAuthenticated', true);

      dataLayerPush('test', {
        type: 'login',
        login: loginData,
      });
    } else if (res.response) {
      alert('Tài khoản này không có hoặc bị sai thông tin!!');
    }
  }

  return (
      <Grid container component='main' sx={{height: '100vh'}}>
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
                  id='username'
                  label={t('auth.login.form.username.label')}
                  name='username'
                  autoComplete='username'
                  autoFocus
                  value={loginData.username}
                  onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        username: e.target.value,
                      })
                  }
              />
              {error === 'username' && (
                  <span className={`  text-danger `}>Bạn chưa nhập username</span>
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
              {error === 'username' && (
                  <span className={`  text-danger `}>Bạn chưa pass</span>
              )}
              <Box sx={{textAlign: 'right'}}>
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
                  sx={{mt: 3}}
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
