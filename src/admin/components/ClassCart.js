import React, { useCallback } from 'react';
import Card from '@mui/material/Card';
import {
  Typography,
  IconButton,
  Divider,
  Paper,
  Avatar,
  Alert,
  CardActionArea,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@material-ui/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { ROUTER } from '../../Router';
import Empty from '../../core/components/Empty';
import undraw_teaching_re_g7e3 from '../../Assets/Class/undraw_teaching_re_g7e3.svg';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const ClassCart = ({ data }) => {
  const navigate = useNavigate();
  const handleClassDetails = useCallback((classId) => {
    navigate(ROUTER.ADMIN_CLASS_SUBJECT, {
      state: {
        class_id: classId,
      },
    });
  }, []);
  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='center'
        >
          <Card
            elevation={8}
            sx={{
              cursor: 'pointer',
              width: '362px',
              ':hover': { boxShadow: '0 0 0 1px #03a5fc' },
              backgroundColor: '#99C276',
              // backgroundImage: `url(${undraw_teaching_re_g7e3})`,
              // backgroundSize: '100%',
            }}
            onClick={() => handleClassDetails(data.id)}
          >
            <Stack
              direction='row'
              alignItems='flex-start'
              justifyContent='space-between'
              spacing={2}
              sx={{ margin: 3 }}
            >
              <Avatar
                {...stringAvatar('Tim Neutkens')}
                sx={{ width: 65, height: 65, bgcolor: '#FED98E' }}
              />
              <Stack
                direction='column'
                alignItems='flex-start'
                justifyContent='flex-start'
                spacing={2}
              >
                <Typography variant='h3'>{data.code}</Typography>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  sx={{ marginTop: '0px !important' }}
                >
                  <Typography variant='subtitle1'>Sỹ số:</Typography>
                  <Typography variant='subtitle2' sx={{ marginTop: '1.2px' }}>
                    {data.size}
                  </Typography>
                </Stack>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  sx={{ marginTop: '0px !important' }}
                >
                  <Typography variant='subtitle1'>Chủ nhiệm:</Typography>
                  <Typography variant='subtitle2' sx={{ marginTop: '1px' }}>
                    ThongCT
                  </Typography>
                </Stack>
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                  sx={{ marginTop: '0px !important' }}
                >
                  <Typography variant='subtitle1'>Niên khóa:</Typography>
                  <Typography variant='subtitle2' sx={{ marginTop: '1px' }}>
                    2022 - 2023
                  </Typography>
                </Stack>
              </Stack>

              <PopupState variant='popover' popupId='demo-popup-menu'>
                {(popupState) => (
                  <React.Fragment>
                    <IconButton
                      aria-label='settings'
                      {...bindTrigger(popupState)}
                      sx={{
                        padding: '0px !important',
                        margin: '0px !important',
                      }}
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
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </React.Fragment>
  );
};

export default ClassCart;
