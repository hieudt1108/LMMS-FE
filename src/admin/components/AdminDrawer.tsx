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
import SettingsIcon from '@material-ui/icons/Settings';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/AuthProvider';
import Logo from '../../core/components/Logo';
import { drawerCollapsedWidth, drawerWidth } from '../../core/config/layout';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';

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

export const levelSyllabus = [
  {
    icon: MenuBookIcon,
    key: 'admin.drawer.grade-teach.normal',
    path: '/admin/program/:id',
  },
  {
    icon: MenuBookIcon,
    key: 'admin.drawer.grade-teach.standar',
    path: '/admin/program/:id',
  },
  {
    icon: MenuBookIcon,
    key: 'admin.drawer.grade-teach.profesinal',
    path: '/admin/program/:id',
  },
];
const AdminDrawer = ({
  collapsed,
  mobileOpen,
  onDrawerToggle,
  onSettingsToggle,
}: AdminDrawerProps) => {
  const { userInfo } = useAuth();
  const { t } = useTranslation();

  const width = collapsed ? drawerCollapsedWidth : drawerWidth;
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Logo style={{ marginLeft: 60 }} sx={{ display: 'flex', p: 4 }} />
      <List component='nav' sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            component={NavLink}
            key={item.path}
            activeClassName='Mui-selected'
            end={true}
            to={`/${process.env.PUBLIC_URL}${item.path}`}
          >
            <ListItemAvatar>
              <Avatar sx={{ color: 'inherit', bgcolor: 'transparent' }}>
                <item.icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t(item.key)}
              sx={{
                display: collapsed ? 'none' : 'block',
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List component='nav' sx={{ p: 2 }}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary='Chương trình học' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {levelSyllabus.map((item) => (
              <ListItemButton
                component={NavLink}
                key={item.path}
                activeClassName='Mui-selected'
                end={true}
                to={`/${process.env.PUBLIC_URL}${item.path}`}
                sx={{ pl: 4 }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ color: 'inherit', bgcolor: 'transparent' }}>
                    <item.icon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={t(item.key)}
                  sx={{
                    display: collapsed ? 'none' : 'block',
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={onSettingsToggle}>
          <ListItemAvatar>
            <Avatar>
              <SettingsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={t('admin.drawer.menu.settings')}
            sx={{
              display: collapsed ? 'none' : 'block',
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
        width: { lg: width },
        flexShrink: { lg: 0 },
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
          display: { xs: 'block', lg: 'none' },
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
          display: { xs: 'none', lg: 'block' },
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
