import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { bgGradient } from '../../../utils/cssStyles';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

ClassBanner.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.object,
};

const colors = ['primary', 'info', 'warning'];

export default function ClassBanner({
  data,
  color = data ? colors[Math.floor((data.gradeId - 1) / 5)] : 'primary',
  sx,
  ...other
}) {
  const router = useRouter();
  const theme = useTheme();
  const handleClassDetails = useCallback((class_id) => {
    router.push(PATH_DASHBOARD.class.detail(class_id));
  }, []);
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
      onClick={() => handleClassDetails(data.id)}
    >
      <Iconify
        icon={'ant-design:android-filled'}
        sx={{
          mb: 3,
          p: 2.5,
          width: 64,
          height: 64,
          borderRadius: '50%',
          color: (theme) => theme.palette[color].dark,
          ...bgGradient({
            direction: '135deg',
            startColor: `${alpha(theme.palette[color].dark, 0)} 0%`,
            endColor: `${alpha(theme.palette[color].dark, 0.24)} 100%`,
          }),
        }}
      />

      <Typography variant="h3">{data ? data.name : 'Undefined'}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        {data ? data.schoolYear : 'Undefined'}
      </Typography>
    </Card>
  );
}
