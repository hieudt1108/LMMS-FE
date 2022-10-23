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
  async function handleLogin(e: { preventDefault: () => void }) {
    e.preventDefault();
    const res = await loginAuth(loginData);
    // optional
    if (!loginData.username) {
      setError('username');
      return;
    }
    else if (!loginData.password) {
      setError('password');
      return;
    }
    else if (res.status < 400) {
        // navigate(ROUTER.ADMIN);
        setLocalStorage('access_token', res.data.accessToken);
        setLocalStorage('user_info', res.config.data);
        setLocalStorage('isAuthenticated', true);
        dataLayerPush('test', {
            type: 'login',
            login: loginData,
        });
    }
    else {
        setError('wrong');
    }
    console.log('Data :', res);
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
                  <span style={{color : 'red'}} className={`  text-danger `}>Tên đăng nhập trống</span>
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
              />
              {error === 'password' && (
                  <span style={{color : 'red'}} className={`  text-danger `}>Mật khẩu trống</span>
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
                  variant='contained'
                  sx={{mt: 3}}
              >
                {t('auth.login.submit')}
              </LoadingButton>
                {error === 'wrong' && (
                    <span style={{color : 'red'}}  className={`  text-danger `}>Tài khoản hoặc mật khẩu bạn đã nhập không chính xác</span>
                )}
            </Box>
          </BoxedLayout>
        </Grid>
      </Grid>
  );
};

export default Login;
