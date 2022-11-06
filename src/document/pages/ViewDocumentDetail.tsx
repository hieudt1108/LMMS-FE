import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import InforDetail from '../components/InforDetail';
import HeaderDocumentDetail from '../components/HeaderDocumentDetail';

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
      <HeaderDocumentDetail title={'Thêm tài liệu'} />
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12}>
            <Item>
              <InforDetail />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
