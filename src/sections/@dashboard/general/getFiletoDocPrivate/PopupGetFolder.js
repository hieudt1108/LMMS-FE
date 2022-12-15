import React, { useState } from 'react';
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
import GeneralFolderPage from './GeneralFolderPage';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { copyDocsToFolderRedux } from 'src/redux/slices/storeFolder';

import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

// PopupGetFolder.propTypes = {
//   open: PropTypes.bool,
//   onClose: PropTypes.func,
// };

export default function PopupGetFolder({ open, onClose, data }) {
  const { historySavetoDocToMyFolder, folderSaveDocToMyFolder } = useSelector((state) => state.folder);

  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState(0);
  console.log('PopupGetFolder', folderSaveDocToMyFolder, historySavetoDocToMyFolder);
  const handleUploadDocumentToMyFolder = async (folder) => {
    console.log('handleUploadDocumentToMyFolder', folder, data);
    const message = await dispatch(copyDocsToFolderRedux(folder.id, data.id));
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
  };
  const tabs = [
    {
      id: 0,
      value: 'myDocument',
      label: `Thư mục của tôi`,
      component: (
        <GeneralFolderPage
          dataSaveDocToMyFolder={{
            handleUploadDocumentToMyFolder,
            ...folderSaveDocToMyFolder,
          }}
        />
      ),
    },
  ];
  return (
    <div>
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Kho tài liệu của tôi
          </Typography>

          <Button variant="outlined" color="inherit" onClick={onClose}>
            Quay lại
          </Button>
        </DialogActions>

        <Divider />
        <Container maxWidth={'xl'}>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => {
              console.log('onChange', newValue);
              setCurrentTab(newValue);
              //   setComponentTab(tabs[newValue].component);
            }}
            sx={{ px: 3, bgcolor: 'background.neutral' }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.id} value={tab.id} label={tab.label} />
            ))}
          </Tabs>

          <Divider />

          {tabs.map(
            (tab) =>
              tab.id === currentTab && (
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
          <Divider />
        </Container>
      </Dialog>
    </div>
  );
}
