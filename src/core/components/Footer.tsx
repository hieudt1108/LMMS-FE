import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ p: 6 }} component="footer">
      <Typography variant="body2" color="text.secondary" sx={{pl:15}}>
        Copyright © Victoria Thăng Long Corporation. All Rights Reserved{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
