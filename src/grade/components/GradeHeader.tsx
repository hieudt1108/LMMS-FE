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
import { Grade } from '../types/grade';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import GradeAddDialog from './GradeCreate';

type HeaderProps = {
  title: string;
  description: string;
};

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
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

const HeaderGrade = ({ title, description }: HeaderProps) => {
  const { t } = useTranslation();
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const snackbar = useSnackbar();
  // @ts-ignore
  const { addGrade, isAdding } = useState('');
  // @ts-ignore
  const { isUpdating, updateGrade } = useState('');
  const [gradeUpdated, setGradeUpdated] = useState<Grade | undefined>(
    undefined
  );
  const processing = isAdding || isUpdating;

  const handleAddGrade = async (grade: Partial<Grade>) => {
    addGrade(grade as Grade)
      .then(() => {
        snackbar.success(
          t('grade.notifications.addSuccess', {
            user: `${grade.name}`,
          })
        );
        setOpenGradeDialog(false);
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'));
      });
  };
  const handleUpdateGrade = async (grade: Grade) => {
    updateGrade(grade)
      .then(() => {
        snackbar.success(
          t('grade.notifications.updateSuccess', {
            grade: `${grade.name}`,
          })
        );
        setOpenGradeDialog(false);
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'));
      });
  };

  const handleCloseGradeDialog = () => {
    setGradeUpdated(undefined);
    setOpenGradeDialog(false);
  };

  const handleOpenGradeDialog = (grade?: Grade) => {
    setGradeUpdated(grade);
    setOpenGradeDialog(true);
  };

  return (
    <Fragment>
      <Card sx={{ boxShadow: '-8px 0 0 -4px #747af2' }}>
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
                  placeholder='Tìm kiếm khối học'
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <Grid style={{ placeSelf: 'flex-end' }} item xs={12} md={6}>
              <Grid container justifyContent='flex-end'>
                <Box sx={{ mt: 5 }}>
                  <Button
                    startIcon={<PersonAddAltIcon fontSize='small' />}
                    onClick={() => handleOpenGradeDialog()}
                  >
                    Thêm khối học
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {openGradeDialog && (
        <GradeAddDialog
          onAdd={handleAddGrade}
          onClose={handleCloseGradeDialog}
          onUpdate={handleUpdateGrade}
          open={openGradeDialog}
          processing={processing}
          grade={gradeUpdated}
        />
      )}
    </Fragment>
  );
};

export default HeaderGrade;
