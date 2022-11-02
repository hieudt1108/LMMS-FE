import * as React from 'react';

import { useTranslation } from 'react-i18next';
import ListDocument from '../components/ListDocument';
//component api mui
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';

export default function DocumentbySyllabus() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid>
        <ListDocument />
      </Grid>
    </React.Fragment>
  );
}
