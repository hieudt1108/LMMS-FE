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
import ClassCart from '../../admin/components/ClassCart';
import { useAuth } from '../../auth/contexts/AuthProvider';
import { ROUTER } from '../../Router';
import CartRole from '../components/CartRole';
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
          style={{ height: '66vh' }}
        >
          <Stack
            direction='column'
            spacing={2}
            alignItems='center'
            justifyContent='center'
          >
            <Typography
              variant='h2'
              color='inherit'
              style={{ color: 'white' }}
              sx={{ flexGrow: 1, ml: 7 }}
            >
              Select Your Roles
            </Typography>
            <Stack
              direction='row'
              spacing={2}
              alignItems='center'
              justifyContent='space-around'
            >
              {itemData.map((item) => (
                <CartRole item={item}></CartRole>
              ))}
            </Stack>
          </Stack>
        </Box>
      </main>
    </LandingLayout>
  );
};

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Admin',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Hiệu trưởng',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Giáo Viên Chủ Nhiệm',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Giáo viên',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Học Sinh',
    author: '@nolanissac',
    cols: 2,
  },
];

export default Landing;
