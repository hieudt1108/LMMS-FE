import PropTypes from 'prop-types';
// @mui
import { LoadingButton } from '@mui/lab';
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
// components
import Scrollbar from '../../../components/scrollbar';
import React, { useCallback, useEffect, useState } from 'react';
import { getDocumentById, getGradeById } from '../../../dataProvider/agent';
import ManageSubject from '../class/manage/ManageSubject';
import ManageUser from '../class/manage/ManageUser';
import StoreFolderNewPostForm from './StoreFolderNewPostForm';
import GeneralFilePage from '../../../pages/dashboard/folder/[folder_id]';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { copyDocsToFolderRedux } from 'src/redux/slices/storeFolder';
import { BlogNewPostForm } from '../folder';

// ----------------------------------------------------------------------

// UploadMyDocumentDialog.propTypes = {
//   open: PropTypes.bool,
//   onClose: PropTypes.func,
// };

export default function UploadMyDocumentDialog({ open, onClose }) {
  const { storeFolder } = useSelector((state) => state.storeFolder);
  const { id } = storeFolder;
  console.log('UploadMyDocumentDialog', id);
  const [currentTab, setCurrentTab] = useState(0);
  const [myFolderId, setMyFolderId] = useState(0);
  const handleUploadDocumentToStoreFolder = (myDocumentId) => {
    console.log('handleUploadDocumentToStoreFolder', myDocumentId, id);
    dispatch(copyDocsToFolderRedux(id, myDocumentId));
  };
  const tabs = [
    {
      id: 0,
      value: 'myDocument',
      label: `Tài liệu của tôi`,
      component: (
        <GeneralFilePage
          dataGeneralFolder={{
            myFolderId: myFolderId,
            setMyFolderId: setMyFolderId,
            handleUploadDocumentToStoreFolder,
          }}
        />
      ),
    },
    {
      id: 1,
      value: 'uploadDocument',
      label: 'Đăng tải tài liệu',
      component: (
        <BlogNewPostForm
          dataGeneralFolder={{
            generalFolderId: id,
          }}
        />
      ),
    },
  ];

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={open}
      onClose={() => {
        setMyFolderId(0), onClose();
      }}
    >
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Đăng tải tài liệu của tôi
        </Typography>

        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            setMyFolderId(0), onClose();
          }}
        >
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
  );
}
