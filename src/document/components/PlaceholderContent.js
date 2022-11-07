// material-ui
import { Typography, Stack, CardMedia } from '@mui/material';

// assets
import UploadCover from '../../Assets/Logo/upload.svg';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
      <Stack sx={{ p: 3 }} spacing={1}>
        <Typography sx={{ml:10}} variant="h5">Kéo & Thả hoặc Chọn tệp</Typography>

        <Typography>
          Thả tệp vào đây hoặc nhấp vào&nbsp;
          <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
            duyệt qua
          </Typography>
          &nbsp;máy tính của bạn
        </Typography>
      </Stack>
    </Stack>
  );
}
