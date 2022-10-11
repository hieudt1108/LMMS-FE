import { Box, Button, Card, CardContent, Grid, Typography, InputBase } from '@material-ui/core';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React, { Fragment } from 'react';

import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';

type HeaderProps = {
  title: string;
  description: string;
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 'none',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  border: '1px solid #3F435C',
  borderRadius: '12px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const Header = ({ title, description }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box marginBottom={2}>
                <Typography variant="h2" color="GrayText">
                  {t(description)}
                </Typography>
              </Box>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Tìm kiếm người dùng"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <Grid style={{ placeSelf: 'flex-end' }} item xs={12} md={6}>
              <Grid container justifyContent="flex-end">
                <Button className="button" startIcon={<FileUploadIcon fontSize="small" />}>
                  {t('userManagement.listScreen.exportFile')}
                </Button>
                <Button startIcon={<FileDownloadIcon fontSize="small" />}>
                  {t('userManagement.listScreen.importFile')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Header;
