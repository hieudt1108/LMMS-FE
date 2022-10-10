import React from "react";
import Card from "@mui/material/Card";
import {
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
} from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardHeader, Grid } from "@material-ui/core";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';
import { parseWithOptions } from "date-fns/fp";
import { ROUTER } from '../../Router'
import DownloadIcon from '@mui/icons-material/Download';
import Person4Icon from '@mui/icons-material/Person4';
import PeopleIcon from '@mui/icons-material/People';

const ClassCart = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    return (
        <React.Fragment>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        action={
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <IconButton aria-label="settings"  {...bindTrigger(popupState)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu {...bindMenu(popupState)}>
                                            <MenuItem onClick={popupState.close}>Delte</MenuItem>
                                            <MenuItem onClick={popupState.close}>Update</MenuItem>
                                            <MenuItem onClick={popupState.close} disabled>Logout</MenuItem>
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        }
                        title={<Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            align="center"
                        >
                            CLass 1A

                        </Typography>}
                        subheader={<Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="center"
                        >
                            Year(2022-2023)
                        </Typography>}
                    />
                    <CardActionArea
                        onClick={() => {
                            navigate(ROUTER.ADMIN_CLASS_DETAIL, {
                                state: {
                                    id: 1,
                                }
                            })
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="145"
                            image="img\portrait-1.jpg"
                            alt="green iguana"

                        />
                        <CardContent>

                            <BottomNavigation
                                showLabels
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            >
                                <BottomNavigationAction label="Student" icon={<PeopleIcon />} />
                                <BottomNavigationAction
                                    label="Teacher"
                                    icon={<Person4Icon />}
                                >
                                </BottomNavigationAction>
                                <BottomNavigationAction
                                    label="Download"
                                    icon={<DownloadIcon />}
                                />
                            </BottomNavigation>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

        </React.Fragment>
    );
};

export default ClassCart;
