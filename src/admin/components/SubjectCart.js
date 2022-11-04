import {CardHeader, Grid, ImageList, ImageListItem, Stack, Typography} from '@material-ui/core';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import SubjectImg from '../../Assets/Subjects/subject1.png';
import { ROUTER } from '../../Router';
import Card from "@mui/material/Card";
import {Alert, Avatar, IconButton} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@material-ui/core/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Container from "@material-ui/core/Container";
import {styled} from "@mui/material/styles";
import Lock from "../../Assets/Logo/lock.svg";
import Literature from "../../Assets/Logo/literature.svg";
import SearchIcon from "@mui/icons-material/Search";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const FiCard = styled(Card)(({ theme }) => ({
    position: 'relative',

}));
const FiCardActions = styled(CardActions)(({ theme }) => ({
    position: 'relative',
}));
const FiCardContent = styled(CardContent)(({ theme }) => ({
    position: 'relative',
    backgroundColor: "transparent"
}));
const FiCardMedia = styled(CardMedia)(({ theme }) => ({
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "100%"
}));

const SubjectCart = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const handleOnClickSubject = useCallback((subjectId) => {
    navigate(ROUTER.ADMIN_CLASS_DETAIL, {
      state: {
        class_id: 1,
        subject_id: subjectId,
      },
    });
  }, []);
  return (
      <React.Fragment>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                  <FiCard sx={{maxWidth:420}}>
                      <FiCardContent sx={{color:'#ffffff',backgroundColor: 'rgb(229, 96, 99)'}}>
                          <Grid container>
                              <Grid item xs={12} md={6}>
                                  <Typography gutterBottom variant="h1" component="h1">
                                      Ngữ văn
                                  </Typography>
                                  <Box>
                                      <img src={Lock} alt='' />
                                  </Box>
                              </Grid>
                              <Grid style={{ placeSelf: 'flex-end' }} item xs={12} md={6}>
                                  <Grid container justifyContent='flex-end'>
                                      <Box>
                                          <img src={Literature} alt='' />
                                      </Box>
                                  </Grid>
                              </Grid>
                          </Grid>
                      </FiCardContent>
                      <FiCardActions sx={{color:'#ffffff',backgroundColor:'white'}}>

                          <Button size="medium" color="primary">
                              Tài liệu
                          </Button>
                          <Button size="medium" color="primary">
                              Syllabus
                          </Button>
                      </FiCardActions>
                  </FiCard>
          </Grid>
      </React.Fragment>
  );
};

export default SubjectCart;
