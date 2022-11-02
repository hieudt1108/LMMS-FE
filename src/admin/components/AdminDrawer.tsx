import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import HelpCenterIcon from '@material-ui/icons/HelpCenter';
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PeopleIcon from '@material-ui/icons/People';
import ClassIcon from '@material-ui/icons/Class';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import {useTranslation} from 'react-i18next';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../../auth/contexts/AuthProvider';
import Logo from '../../core/components/Logo';
import {drawerCollapsedWidth, drawerWidth} from '../../core/config/layout';
import {ROUTER} from '../../Router';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {getAllProgram} from '../../dataProvider/agent';

type AdminDrawerProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  onSettingsToggle: () => void;
};

export const menuItems = [
  {
    icon: HomeIcon,
    key: 'admin.drawer.menu.home',
    path: '/admin',
  },
  {
    icon: ClassIcon,
    key: 'admin.drawer.menu.classes',
    path: '/admin/classes',
  },
  {
    icon: FileCopyIcon,
    key: 'admin.drawer.menu.document',
    path: '/admin/document',
  },
  {
    icon: BarChartIcon,
    key: 'admin.drawer.menu.dashboard',
    path: '/admin/dashboard',
  },
  {
    icon: PeopleIcon,
    key: 'admin.drawer.menu.userManagement',
    path: '/admin/user-management',
  },
  {
    icon: HelpCenterIcon,
    key: 'admin.drawer.menu.help',
    path: '/admin/help',
  },
];

const AdminDrawer = ({
                       collapsed,
                       mobileOpen,
                       onDrawerToggle,
                       onSettingsToggle,
                     }: AdminDrawerProps) => {
  // const { userInfo } = useAuth();
  const {t} = useTranslation();

  const width = collapsed ? drawerCollapsedWidth : drawerWidth;

  const [programs, setProgram] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetchProgram();
  }, []);

  async function fetchProgram() {
    const res = await getAllProgram();
    //console.log('data: ', programs);
    if (res.status < 400) {
      setProgram(res.data.data);
    } else {
      console.log('error fetch api');
    }
  }

  const navigate = useNavigate();

  async function handleListProgram(e: { preventDefault: () => void }) {
    e.preventDefault();
    navigate(ROUTER.ADMIN_PROGRAM, {replace: true});
  }

  const drawer = (
      <Box className="navbar" sx={{
        display: 'flex', flexDirection: 'column', minHeight: '100%'
      }}>
        <Logo style={{marginLeft: 60}} sx={{display: 'flex', p: 4}}/>
        <List component='nav' sx={{px: 2}}>
          <ListItem
              button
              component={NavLink}
              key={'/admin'}
              activeClassName='selectItemMenuBar'
              end={true}
              to={`/${process.env.PUBLIC_URL}${'/admin'}`}
          >
            <ListItemAvatar>
              <Avatar

                  sx={{color: 'white', bgcolor: 'transparent'}}>
                <HomeIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={t('admin.drawer.menu.home')}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
          </ListItem>

          <ListItem
              button
              component={NavLink}
              key={'/admin/classes'}
              activeClassName='selectItemMenuBar'
              end={true}
              to={`/${process.env.PUBLIC_URL}${'/admin/classes'}`}
          >
            <ListItemAvatar>
              <Avatar sx={{color: 'white', bgcolor: 'transparent'}}>
                <ClassIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={t('admin.drawer.menu.classes')}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
          </ListItem>
          <ListItem
              button
              component={NavLink}
              key={'/admin/document'}
              activeClassName='selectItemMenuBar'
              end={true}
              to={`/${process.env.PUBLIC_URL}${'/admin/document'}`}
          >
            <ListItemAvatar>
              <Avatar sx={{color: 'white', bgcolor: 'transparent'}}>
                <FileCopyIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={t('admin.drawer.menu.document')}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
          </ListItem>

          <ListItem onClick={handleClick}>
            <ListItemAvatar>
              <Avatar sx={{color: 'white', bgcolor: 'transparent'}}>
                <AutoStoriesIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                onClick={handleListProgram}
                primary={t('admin.drawer.menu.sub-program')}
                sx={{
                  cursor: 'pointer',
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
            {open ? <ExpandLess/> : <ExpandMore/>}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='nav' sx={{px: 2}}>
              {programs?.map((program) => (
                  <ListItem
                      button
                      component={NavLink}
                      key={'/admin/document'}
                      end={true}
                      to={ROUTER.ADMIN_SUBSYSTEM}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{color: 'white', bgcolor: 'transparent'}}>
                        <FileCopyIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={program.name}
                        sx={{
                          display: collapsed ? 'none' : 'block',
                          color: 'white'
                        }}
                    />
                  </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem
              button
              component={NavLink}
              key={'/admin/dashboard'}
              activeClassName='selectItemMenuBar'
              end={true}
              to={`/${process.env.PUBLIC_URL}${'/admin/dashboard'}`}
          >
            <ListItemAvatar>
              <Avatar sx={{color: 'white', bgcolor: 'transparent'}}>
                <BarChartIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={t('admin.drawer.menu.dashboard')}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
          </ListItem>
          <ListItem
              button
              component={NavLink}
              key={'/admin/user-management'}
              activeClassName='selectItemMenuBar'
              end={true}
              to={`/${process.env.PUBLIC_URL}${'/admin/user-management'}`}
          >
            <ListItemAvatar>
              <Avatar sx={{color: 'white', bgcolor: 'transparent'}}>
                <PeopleIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={t('admin.drawer.menu.userManagement')}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
          </ListItem>
          <ListItem
              button
              component={NavLink}
              key={'/admin/help'}
              activeClassName='selectItemMenuBar'
              end={true}
              to={`/${process.env.PUBLIC_URL}${'/admin/help'}`}
          >
            <ListItemAvatar>
              <Avatar sx={{color: 'white', bgcolor: 'transparent'}}>
                <HelpCenterIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={t('admin.drawer.menu.help')}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
          </ListItem>
        </List>
        <Box sx={{flexGrow: 1}}/>
        <List component='nav' sx={{p: 2}}>
          <ListItem button onClick={onSettingsToggle}>
            <ListItemAvatar>
              <Avatar>
                <SettingsIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={t('admin.drawer.menu.settings')}
                sx={{
                  display: collapsed ? 'none' : 'block',
                  color: 'white'
                }}
            />
          </ListItem>
        </List>
      </Box>
  );

  return (
      <Box
          aria-label='Admin drawer'
          component='nav'
          sx={{
            width: {lg: width},
            flexShrink: {lg: 0},
          }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={onDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: {xs: 'block', lg: 'none'},
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: width,
              },
            }}
        >
          {drawer}
        </Drawer>
        <Drawer
            variant='permanent'
            open
            sx={{
              display: {xs: 'none', lg: 'block'},
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: width,
              },
            }}
        >
          {drawer}
        </Drawer>
      </Box>
  );
};

export default AdminDrawer;
