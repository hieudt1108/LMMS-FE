import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Math from '../../Assets/Subjects/mathLogo.png';
import Chemistry from '../../Assets/Subjects/chemistryLogo.png';
import English from '../../Assets/Subjects/englishLogo.png';
import Geography from '../../Assets/Subjects/geography.png';

import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthProvider';
import Fab from '@mui/material/Fab';
import { ROUTER } from '../../Router';
import { Button } from '@material-ui/core';

const socials = [
  {
    image: <img src={Math} alt='' />,
    bgcolor: 'primary.main',
    icon: <ThumbUpIcon sx={{ color: '#fff' }} />,
    name: 'Math',
    trend: (
      <Box style={{ display: 'flex' }}>
        <Button
          size='small'
          sx={{ bgcolor: '#039be5' }}
          component={RouterLink}
          to={ROUTER.ADMIN_DOCUMENT}
          variant='contained'
        >
          Đề cương
          <ArrowRightIcon sx={{ color: '#0d47a1' }} />
        </Button>
      </Box>
    ),
    unitKey: 'admin.home.followers.units.likes',
    teacher: 'Adam',
  },
  {
    image: <img src={Chemistry} alt='' />,
    bgcolor: 'error.main',
    icon: <FavoriteIcon style={{ color: '#fff' }} />,
    name: 'Chemistry',
    trend: (
      <Box style={{ display: 'flex' }}>
        <Button
          size='small'
          sx={{ bgcolor: '#039be5' }}
          //color='secondary'
          component={RouterLink}
          to={ROUTER.ADMIN_DOCUMENT}
          variant='contained'
        >
          Đề cương
          <ArrowRightIcon sx={{ color: '#0d47a1' }} />
        </Button>
      </Box>
    ),
    unitKey: 'admin.home.followers.units.love',
    teacher: 'Tú Sena',
  },
];

const FollowersWidget = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {socials.map((social) => (
        <Card key={social.name} sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2 }}>{social.image}</Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography component='div' variant='h6'>
                Teacher: {social.teacher}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='div'>
                Subject: {t(social.name)}
              </Typography>
            </Box>
            {social.trend}
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default FollowersWidget;
