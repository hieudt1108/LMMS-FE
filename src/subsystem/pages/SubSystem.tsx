import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { useTranslation } from 'react-i18next';

import HeaderSubsystem from '../components/HeaderSubsystem';

export default function SubSystem() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <HeaderSubsystem />
    </React.Fragment>
  );
}
