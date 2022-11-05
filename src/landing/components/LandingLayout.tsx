import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import Footer from '../../core/components/Footer';
import Logo from '../../core/components/Logo';
import SettingsDrawer from '../../core/components/SettingsDrawer';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import { ROUTER } from '../../Router';
type LandingLayoutProps = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: LandingLayoutProps) => {


  return (
    <Paper
      style={{
        backgroundImage: 'url(./img/header-product-indie.svg)',
        backgroundPosition: 'top left',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingBottom: 38,
      }}
      square
    >
      <AppBar color='transparent' position='relative'>
        <Toolbar>
          <Logo size={36} sx={{ mt: 4, ml: -2 }} />
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            style={{ color: 'white' }}
            sx={{ flexGrow: 2, mt: 3 }}
            alignSelf='center'
          >
            TRƯỜNG TIỂU HỌC VÀ TRUNG HỌC CƠ SỞ
            <Typography
              variant='h5'
              color='inherit'
              noWrap
              style={{ color: 'white' }}
              sx={{ flexGrow: 1, ml: 7 }}
            >
              VICTORIA THĂNG LONG
            </Typography>
          </Typography>

        </Toolbar>
      </AppBar>
      <main>{children}</main>
      <Footer />
    </Paper>
  );
};

export default LandingLayout;
