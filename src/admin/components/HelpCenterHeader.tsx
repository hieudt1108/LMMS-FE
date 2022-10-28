import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import LogoutIcon from '@mui/icons-material/Logout';

//Subject img
import Math from "../../Assets/Subjects/mathLogo.png";
import ClassHeader from "../../admin/components/ClassHeader";
import {Button, Grid} from "@material-ui/core";
import CreateIcon from "@mui/icons-material/Create";
import Fab from "@material-ui/core/Fab";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {useAuth} from "../../auth/contexts/AuthProvider";
import {useNavigate} from "react-router-dom";
import {ROUTER} from "../../Router";

type HeaderProps = {
  title: string;
};


const HelpCenterHeader = ({ title }: HeaderProps) => {

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
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default HelpCenterHeader;
