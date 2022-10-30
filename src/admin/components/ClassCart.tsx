import React from 'react';
import Card from '@mui/material/Card';
import {
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardHeader, Grid } from '@material-ui/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import {getAllClass} from "../../dataProvider/agent";

function stringToColor(string: string) {
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

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const ClassCart = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [classes, setClasses] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchClass();
  }, []);


  async function fetchClass() {
    const res = await getAllClass();
    if (res.status < 400) {
      setClasses(res.data.data);
    } else {
      console.log('error fetch api');
    }
    console.log('data: ', res.data.data);
  }

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
        {classes?.map((c) => (
        <Card
          elevation={8}
          sx={{
            cursor: 'pointer',
            ':hover': { boxShadow: '0 0 0 1px #03a5fc' },
          }}
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
              sx={{ width: 65, height: 65, bgcolor: deepOrange[500] }}
            />
            <Stack
              direction='column'
              alignItems='flex-start'
              justifyContent='flex-start'
              spacing={2}
            >
              <Typography variant='h3'>{c.name}</Typography>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                sx={{ marginTop: '0px !important' }}
              >
                <Typography variant='subtitle1'>Sỹ số:</Typography>
                <Typography variant='subtitle2' sx={{ marginTop: '1.2px' }}>
                  {c.size}
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
                  Chu Tuấn Thông
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
                  {c.schoolYear}
                </Typography>
              </Stack>
            </Stack>

            <PopupState variant='popover' popupId='demo-popup-menu'>
              {(popupState) => (
                <React.Fragment>
                  <IconButton
                    aria-label='settings'
                    {...bindTrigger(popupState)}
                    sx={{ padding: '0px !important', margin: '0px !important' }}
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
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default ClassCart;
