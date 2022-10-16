import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Stack from '@material-ui/core/Stack';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import { url } from 'inspector';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthProvider';
import { ROUTER } from '../../Router';
import LandingLayout from '../components/LandingLayout';

const Landing = () => {
  const { userInfo } = useAuth();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <main>
        <Box
          sx={{
            py: 6,
          }}
          style={{ display: 'flex' }}
        >
          <Container
            maxWidth='sm'
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
            }}
          >
            <Typography
              variant='h1'
              align='center'
              color='text.primary'
              marginBottom={2}
              style={{
                fontSize: 60,
                color: 'white',
              }}
              sx={{ fontSize: 60 }}
            >
              {t('landing.bigtitle')}
            </Typography>
            <Typography
              variant='h2'
              // align="center"
              color='text.primary'
              marginBottom={2}
              sx={{ mt: 4, ml: 6 }}
              style={{
                color: 'white',
              }}
            >
              {t('landing.title')}
            </Typography>
            <Stack
              sx={{ pt: 2 }}
              direction='row'
              spacing={2}
              justifyContent='center'
            >
              {userInfo ? (
                <Button
                  component={RouterLink}
                  to={ROUTER.ADMIN}
                  variant='contained'
                >
                  {t('landing.cta.mainAuth', { name: userInfo.firstName })}
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  to={ROUTER.LOGIN}
                  variant='contained'
                >
                  {t('landing.cta.main')}
                </Button>
              )}
            </Stack>
          </Container>
          <Container sx={{ py: 6 }} maxWidth='md'>
            <img
              alt='Application demo'
              src={`img/landing.png`}
              style={{
                borderRadius: 24,
                borderWidth: 4,
                borderColor: theme.palette.background.default,
                width: '100%',
              }}
            />
          </Container>
        </Box>
      </main>
    </LandingLayout>
  );
};

export default Landing;
