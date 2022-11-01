import React, { useEffect } from 'react';
import {
  CardActionArea,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardHeader, Grid, Card } from '@material-ui/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../Router';
import { getAllGrade } from '../../dataProvider/agent';

export default function SecondarySchool() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [grade, setGrade] = React.useState<any[]>([]);

  useEffect(() => {
    fetchGradeSecond();
  }, []);

  async function fetchGradeSecond() {
    const res = await getAllGrade(1, 10, '', 7);
    console.log(res);
    if (res.status < 400) {
      setGrade(res.data.data);
    } else {
      console.log('error fetch api');
    }
  }
  return (
    <React.Fragment>
      {grade?.map((g) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              action={
                <PopupState variant='popover' popupId='demo-popup-menu'>
                  {(popupState) => (
                    <React.Fragment>
                      <IconButton
                        aria-label='settings'
                        {...bindTrigger(popupState)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Delte</MenuItem>
                        <MenuItem onClick={popupState.close}>Update</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              }
              title={
                <Typography
                  gutterBottom
                  variant='h4'
                  component='div'
                  align='center'
                  sx={{ ml: 4 }}
                >
                  {g.name}
                </Typography>
              }
            />
            <CardActionArea
              onClick={() => {
                navigate(ROUTER.ADMIN_DOUCUMENT_SUBJECT, {
                  state: {
                    id: 1,
                  },
                });
              }}
            >
              <CardMedia
                component='img'
                height='145'
                image='img\portrait-1.jpg'
                alt='green iguana'
              />
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </React.Fragment>
  );
}
