import { Box, Button, Card, CardContent, Grid, Typography, InputBase } from '@material-ui/core';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React, {Fragment, useState} from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';

import { styled, alpha } from '@mui/material/styles';
import {User} from "../types/user";
import {useSnackbar} from "../../core/contexts/SnackbarProvider";
import {useNavigate} from "react-router-dom";
import {ROUTER} from "../../Router";

type HeaderProps = {
  title: string;
  description: string;
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: 'none',
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
  borderRadius: '5px',
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
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const snackbar = useSnackbar();
  // @ts-ignore
  const { addUser, isAdding } = useState('');
  // @ts-ignore
  const { isUpdating, updateUser } = useState('');
  const [userDeleted, setUserDeleted] = useState<string[]>([]);
  const [userUpdated, setUserUpdated] = useState<User | undefined>(undefined);
  const processing = isAdding || isUpdating;

  const handleUpdateUser = async (user: User) => {
    updateUser(user)
        .then(() => {
          snackbar.success(
              t('userManagement.notifications.updateSuccess', {
                user: `${user.firstName} ${user.lastName}`,
              })
          );
          setOpenUserDialog(false);
        })
        .catch(() => {
          snackbar.error(t('common.errors.unexpected.subTitle'));
        });
  };


  const handleCloseUserDialog = () => {
    setUserUpdated(undefined);
    setOpenUserDialog(false);
  };

  const navigate = useNavigate();

  async function handleAddUser(e: { preventDefault: () => void }) {
    e.preventDefault();
    navigate(ROUTER.ADMIN_ADD_USER, { replace: true });
  }

  return (
    <Fragment>
      <Card sx={{boxShadow: '-8px 0 0 -4px #747af2'}}>
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
            <Grid style={{ placeSelf: 'flex-end' }} item xs={12} md={6} >
              <Grid container justifyContent="flex-end" >
                <Box sx={{mt:5}}>
                  <Button className="button" startIcon={<FileUploadIcon fontSize="small" />}>
                    {t('userManagement.listScreen.exportFile')}
                  </Button>
                  <Button startIcon={<FileDownloadIcon fontSize="small" />}>
                    {t('userManagement.listScreen.importFile')}
                  </Button>
                  <Button startIcon={<PersonAddAltIcon fontSize="small" />} onClick={handleAddUser} >
                    Thêm người dùng
                  </Button>
                </Box>

              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

    </Fragment>
  );
};

export default Header;
