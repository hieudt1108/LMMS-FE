import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Stack, Avatar } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import Chart from '../../../../components/chart';
// import Avatar from 'src/theme/overrides/Avatar';

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  sx: PropTypes.object,
  chart: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  percent: PropTypes.number,
};

export default function AppWidgetSummary({ title, percent, src, total, chart, sx, ...other }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ mb: 1 }} variant="subtitle2">
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            sx={{ bgcolor: 'background.neutral', width: 48, height: 48, borderRadius: 1.5, mr: 2 }}
          >
            {title === 'File khác' ? <>{src}</> : <Box sx={{ width: 36, height: 36 }} component="img" src={src} />}
          </Avatar>

          {/* <TrendingInfo percent={percent} /> */}

          <Typography variant="h4">{fNumber(total)}</Typography>
        </Box>
      </Box>

      {/* <Chart type="bar" series={[{ data: series }]} options={chartOptions} width={60} height={36} /> */}
    </Card>
  );
}

// ----------------------------------------------------------------------

// TrendingInfo.propTypes = {
//   percent: PropTypes.number,
// };

// function TrendingInfo({ percent }) {
//   return (
//     <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
//       <Iconify
//         icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
//         sx={{
//           mr: 1,
//           p: 0.5,
//           width: 24,
//           height: 24,
//           borderRadius: '50%',
//           color: 'success.main',
//           bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
//           ...(percent < 0 && {
//             color: 'error.main',
//             bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
//           }),
//         }}
//       />

//       <Typography component="div" variant="subtitle2">
//         {percent > 0 && '+'}

//         {fPercent(percent)}
//       </Typography>
//     </Stack>
//   );
// }
