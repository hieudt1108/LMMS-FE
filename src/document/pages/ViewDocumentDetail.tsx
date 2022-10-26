import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import InforDetail from '../components/InforDetail';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ViewDocumentDetail() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title={t('document.title')} />
      </AdminAppBar>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Item style={{ height: '900px' }}>View file word ở đây</Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item>
              <InforDetail />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
