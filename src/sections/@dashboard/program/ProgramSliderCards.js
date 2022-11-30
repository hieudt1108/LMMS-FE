import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Button, Card, Grid, InputBase, Stack, Typography } from '@mui/material';
// components
import Image from '../../../components/image';
// utils
import { bgGradient } from '../../../utils/cssStyles';
//
import { useRouter } from 'next/router';
//
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

ProgramSliderCards.propTypes = {
  sx: PropTypes.object,
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function ProgramSliderCards({ id, img, title, description, sx, ...other }) {
  const theme = useTheme();
  const router = useRouter();
  const { push } = useRouter();

  const handlerRedirect = (id) => {
    router.push(PATH_DASHBOARD.program.level(id));
    // console.log('clicked: ');
  };
  return (
    <Box {...other} sx={{ position: 'relative', cursor: 'pointer' }}>
      <Image
        disabledEffect
        alt="illustration-invite"
        src={img}
        sx={{
          left: 40,
          zIndex: 9,
          width: 140,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
          ...sx,
        }}
      />
      <Box
        onClick={() => handlerRedirect(id)}
        sx={{
          mt: -15,
          color: 'common.white',
          borderRadius: 2,
          p: (theme) => theme.spacing(19, 19, 19, 19),
          ...bgGradient({
            direction: '135deg',
            startColor: theme.palette.primary.main,
            endColor: theme.palette.primary.dark,
          }),
        }}
      >
        <Typography variant="h4" sx={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
