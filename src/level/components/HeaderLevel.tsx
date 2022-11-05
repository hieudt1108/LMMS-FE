import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  InputBase,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Level } from '../types/level';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '../../Router';
import LevelAddDialog from './LevelCreate';
import {toast, ToastContainer} from "react-toastify";

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

const HeaderLevel = ({ title, description }: HeaderProps) => {
  const { t } = useTranslation();
  const [openLevelDialog, setOpenLevelDialog] = useState(false);
  const snackbar = useSnackbar();
  // @ts-ignore
  const { addLevel, isAdding } = useState('');
  // @ts-ignore
  const { isUpdating, updateLevel } = useState('');
  const [levelUpdated, setLevelUpdated] = useState<Level | undefined>(
    undefined
  );
  const processing = isAdding || isUpdating;

  const handleAddLevel = async (level: Partial<Level>) => {
    addLevel(level as Level)
      .then(() => {
        snackbar.success(
          t('userManagement.notifications.addSuccess', {
            user: `${level.name}`,
          })
        );
        setOpenLevelDialog(false);
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'));
      });
  };
  const handleUpdateLevel = async (level: Level) => {
    updateLevel(level)
      .then(() => {
        snackbar.success(
          t('userManagement.notifications.updateSuccess', {
            level: `${level.name}`,
          })
        );
        setOpenLevelDialog(false);
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'));
      });
  };

  const handleCloseLevelDialog = () => {
    setLevelUpdated(undefined);
    setOpenLevelDialog(false);
  };

  const handleOpenLevelDialog = (level?: Level) => {
    setLevelUpdated(level);
    setOpenLevelDialog(true);
  };

  return (
    <Fragment>
      <Card sx={{boxShadow: '-8px 0 0 -4px #747af2'}}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box marginBottom={2}>
                <Typography variant='h2' color='GrayText'>
                  {t(description)}
                </Typography>
              </Box>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder='Tìm kiếm cấp học'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <Grid style={{ placeSelf: 'flex-end' }} item xs={12} md={6}>
              <Grid container justifyContent='flex-end'>
                <Box sx={{ mt: 5 }}>
                  <Button
                    startIcon={<PersonAddAltIcon fontSize='small' />}
                    onClick={() => handleOpenLevelDialog()}
                  >
                    Thêm cấp học
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {openLevelDialog && (
        <LevelAddDialog
          onAdd={handleAddLevel}
          onClose={handleCloseLevelDialog}
          onUpdate={handleUpdateLevel}
          open={openLevelDialog}
          processing={processing}
          level={levelUpdated}
        />
      )}
    </Fragment>


  );
};

export default HeaderLevel;
