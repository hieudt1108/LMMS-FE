import React from 'react';

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

const levels = [
  { title: 'lớp 1', september: 'Kỳ 1', year: '2021-2022' },
  { title: 'lớp 2', september: 'Kỳ 1', year: '2021-2022' },
  { title: 'lớp 3', september: 'Kỳ 1', year: '2021-2022' },
  { title: 'lớp 4', september: 'Kỳ 1', year: '2021-2022' },
  { title: 'lớp 5', september: 'Kỳ 1', year: '2021-2022' },
];

export default function PrimarySchool() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  return (
    <React.Fragment>
      {levels?.map((level) => (
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
                >
                  {level.title}
                </Typography>
              }
              subheader={
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  align='center'
                >
                  {level.year}
                </Typography>
              }
            />
            <CardActionArea
              onClick={() => {
                navigate(ROUTER.ADMIN_CLASS_DETAIL, {
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
