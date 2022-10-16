import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const Footer = () => {
  return (
    <Box sx={{ p: 6 }} component='footer'>
      <Typography variant='body2' color='text.secondary'>
        Copyright © Victoria Thăng Long Corporation. All Rights Reserved{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;
