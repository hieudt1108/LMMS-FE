import React, { useState } from 'react';
// COMPONENT
import UploadNewDoc from './UploadNewDoc';
import GeneralFilePage from '../../../../pages/dashboard/folder/[folder_id]';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';

UploadDocToSlot.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
export default function UploadDocToSlot({ open, onClose, slotId }) {
  const [currentTab, setCurrentTab] = useState('uploadDocument');

  const TABS = [
    {
      id: 1,
      value: 'uploadDocument',
      label: 'Đăng tải tài liệu',
      component: <UploadNewDoc slotId={slotId} />,
    },
    {
      id: 2,
      value: 'myDocument',
      label: `Tài liệu của tôi`,
      component: <GeneralFilePage />,
    },
  ];

  return (
    <>
      {' '}
      <Dialog fullWidth maxWidth="xl" open={open} onClose={onClose}>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Đăng tải tài liệu của tôi
          </Typography>

          <Button variant="outlined" color="inherit" onClick={onClose}>
            Quay lại
          </Button>
        </DialogActions>

        <Divider />

        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={{ px: 3, bgcolor: 'background.neutral' }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.id} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        <Divider />

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box
                key={tab.id}
                sx={{
                  ...(currentTab === 'description' && {
                    p: 3,
                  }),
                }}
              >
                {tab.component}
              </Box>
            )
        )}
      </Dialog>
    </>
  );
}
