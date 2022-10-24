import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React, { Fragment } from 'react';

import { useTranslation } from 'react-i18next';

type HeaderProps = {
  title: string;
  description: string;
};

const AdminHeader = ({ title, description }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
                {t(title)}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {t(description)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default AdminHeader;
