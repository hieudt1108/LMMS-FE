import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LogoutIcon from '@mui/icons-material/Logout';
import {Button, Grid} from "@material-ui/core";
import {useAuth} from "../../auth/contexts/AuthProvider";
import {useNavigate} from "react-router-dom";
import {ROUTER} from "../../Router";

type HeaderProps = {
  title: string;
};



const ProfileHeader = ({ title }: HeaderProps) => {

  const { isLoggingOut, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout(e: { preventDefault: () => void }) {
    e.preventDefault();
    navigate(ROUTER.LANDING, { replace: true });
    localStorage.clear();
  }

  return (
    <React.Fragment>
      <Card sx={{ mb: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{mt:2}}>
                <Typography component="div" variant="h4">
                  {title}
                </Typography>
              </Box>
            </Grid>
            <Grid style={{ placeSelf: 'flex-end' }} item xs={12} md={6}>
              <Grid container justifyContent="flex-end">
                <Button className="button" startIcon={<LogoutIcon fontSize="small" />} onClick={handleLogout} disabled={isLoggingOut}>
                  Đăng xuất
                </Button>
              </Grid>
            </Grid>
          </Grid>


        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default ProfileHeader;
