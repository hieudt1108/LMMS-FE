import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../auth/contexts/AuthProvider";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import { experimentalStyled as styled } from "@mui/material/styles";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
interface ToolbarProps {
  toggleDrawer: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#263238" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  position: "static",
  borderRadius : "0%"
}));

export default function ToolBar({ toggleDrawer }: ToolbarProps) {
  const { userInfo } = useAuth();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleChooseOption = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    let path = `/${process.env.PUBLIC_URL}/admin/profile`;
    navigate(path);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleChooseOption}>Profile</MenuItem>
      <MenuItem onClick={handleChooseOption}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (

    <Box sx={{ flexGrow: 1 }}>
      <Item>
        {/* <AppBar position="static"> */}

        <Toolbar
        >
          {/*menu */}
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{
              display: { lg: "none" },
              marginRight: 2,
              color: "grey[900]",
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <div role="presentation" >
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                  href="/"
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Trang chủ
                </Link>
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                  href="/"
                >
                  <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Tài liệu
                </Link>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="text.primary"
                >
                  <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Tạo tài liệu
                </Typography>
              </Breadcrumbs>
            </div>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: "grey[900]" }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: "grey[900]" }}
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{ color: "grey[900]" }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{
                color: "grey[900]",
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {/* </AppBar> */}
      </Item>
      {renderMobileMenu}
      {renderMenu}
    </Box>

  );
}
