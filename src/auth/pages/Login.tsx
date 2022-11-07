import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import BoxedLayout from '../../core/components/BoxedLayout';
import { ROUTER } from '../../Router';
import {
  loginAuth,
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from '../../dataProvider/agent.js';
import { dataLayerPush } from '../../Utils/dataLayerPush.js';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { InputAdornment, OutlinedInput } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface State {
  showPassword: boolean;
}
const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const initUser = {
    username: '',
    password: '',
  };
  const [show, setShow] = React.useState<State>({
    showPassword: false,
  });

  const [loginData, setLoginData] = useState(initUser);
  const [error, setError] = useState('');
  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await loginAuth(loginData);
    console.log('handleLogin :', res);
    // optional
    if (res.status !== 200) {
      setError('username or password incorrect');
      return;
    }
    clearLocalStorage();
    setLocalStorage('access_token', res.data.accessToken);
    setLocalStorage('user_info', res.config.data);
    setLocalStorage('isAuthenticated', true);
    dataLayerPush('test', {
      type: 'login',
      login: loginData,
    });
    navigate(ROUTER.ROLES, { replace: true });
    // window.location.reload();
  }

  const handleClickShowPassword = () => {
    setShow({
      ...show,
      showPassword: !show.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
            {/*<form onSubmit={handleLogin}>*/}
          <Box component='form' marginTop={3} onSubmit={handleLogin} noValidate >
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
              <span style={{ color: 'red' }} className={`  text-danger `}>
                Tên đăng nhập trống
              </span>
            )}
            <TextField
              margin='normal'
              variant='filled'
              required
              fullWidth
              name='password'
              label={t('auth.login.form.password.label')}
              type={show.showPassword ? 'text' : 'password'}
              id='password'
              autoComplete='current-password'
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {show.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error === 'password' && (
              <span style={{ color: 'red' }} className={`  text-danger `}>
                Mật khẩu trống
              </span>
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
              onSubmit={handleLogin}
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3 }}
            >
              {t('auth.login.submit')}
            </LoadingButton>
            {error === 'wrong' && (
              <span style={{ color: 'red' }} className={`  text-danger `}>
                Tài khoản hoặc mật khẩu bạn đã nhập không chính xác
              </span>
            )}
          </Box>
            {/*</form>*/}
        </BoxedLayout>
      </Grid>

    </Grid>
  );
};

export default Login;
