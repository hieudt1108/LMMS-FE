import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { useTranslation } from 'react-i18next';

import HeaderListDocument from '../components/Headersubjetc';
import ListDocument from '../components/ListDocument';
//component api mui
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DocumentbySyllabus() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {/*<AdminAppBar>*/}
      {/*  <AdminToolbar title={t('document.title')} />*/}
      {/*</AdminAppBar>*/}

      <Grid>
        <Grid item xs={12} md={12} lg={12}>
          <HeaderListDocument />
        </Grid>
        <Box>
          <Grid container spacing={2}>
            {Array.from(Array(10)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                <Item>
                  <ListDocument />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </React.Fragment>
  );
}
