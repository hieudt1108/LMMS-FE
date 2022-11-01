import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HeaderSubsystem from '../components/HeaderSubsystem';
import Classes from '../../admin/pages/Classes';
import { getAllClass } from '../../dataProvider/agent';
export default function SubSystem() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <HeaderSubsystem />
    </React.Fragment>
  );
}
