import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import { _storeFolders } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Scrollbar from '../../../../components/scrollbar';
import { useSettingsContext } from '../../../../components/settings';
// sections
import { FileGeneralRecentCard } from '../../../../sections/@dashboard/general/file';
import { FileFolderCard, FileNewFolderDialog, FilePanel } from '../../../../sections/@dashboard/file';
import { useRouter } from 'next/router';
import { dispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import {
  createStoreFolderRedux,
  getFolderRedux,
  getFolderUploadDocRedux,
  getStoreFolderRedux,
} from '../../../../redux/slices/folder';
import Iconify from '../../../../components/iconify';
import UploadMyDocumentDialog from '../../../../sections/@dashboard/storeFolder/UploadMyDocumentDialog';
import PopupGetFolder from 'src/sections/@dashboard/general/getFiletoDocPrivate/PopupGetFolder';
// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

StoreFilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function StoreFilePage() {
  const {
    query: { storeFolder_id: storeFolderID },
    push,
  } = useRouter();
  const { folder, history } = useSelector((state) => state.folder);
  const { id, listFolders, listDocuments } = folder;

  console.log('StoreFilePage', history, storeFolderID);

  useEffect(() => {
    console.log('useEffect StoreFilePage', storeFolderID);
    dispatch(getFolderRedux(storeFolderID));
  }, [storeFolderID]);

  const { themeStretch } = useSettingsContext();

  const [storeFolderName, setStoreFolderName] = useState('');

  const [documentHandle, setDocumentHandle] = useState({});

  const [openNewStoreFolder, setOpenNewStoreFolder] = useState(false);

  const [openFormUploadDocument, setOpenFormUploadDocument] = useState(false);

  const [openPopupSaveInMyFolder, setOpenPopupSaveInMyFolder] = useState(false);

  const handleOpenPopupSaveInMyFolder = (data) => {
    const { document } = data;
    setDocumentHandle(document);
    setOpenPopupSaveInMyFolder(true);
  };

  const handleClosePopupSaveInMyFolder = () => {
    setOpenPopupSaveInMyFolder(false);
  };

  const handleOpenFrom = async () => {
    await dispatch(getFolderUploadDocRedux(0));
    setOpenFormUploadDocument(true);
  };

  const handleCloseFrom = () => {
    setOpenFormUploadDocument(false);
  };

  const handleOpenNewStoreFolder = () => {
    setOpenNewStoreFolder(true);
  };

  const handleCloseNewStoreFolder = () => {
    setOpenNewStoreFolder(false);
  };

  const handleChangeStoreFolderName = useCallback((event) => {
    setStoreFolderName(event.target.value);
  }, []);

  const handleCreateNewStoreFolder = () => {
    console.log('CREATE NEW FOLDER', storeFolderName);
    setStoreFolderName('');
    dispatch(
      createStoreFolderRedux({
        name: storeFolderName,
        parentId: Number.parseInt(id),
      })
    );
    handleCloseNewStoreFolder();
  };

  const handleBackPage = () => {
    console.log('handleBackPage folder', history.folder);
    if (history.folder.id !== '') dispatch(getFolderRedux(history.folder.id));
  };

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ mb: 5 }}>
          <Stack flexGrow={1}>
            <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
              <IconButton
                size="small"
                color="success"
                disabled={history.folder.id === ''}
                onClick={handleBackPage}
                sx={{
                  p: 0,
                  width: 24,
                  height: 24,
                  color: 'common.white',
                  bgcolor: 'success.main',
                  '&:hover': {
                    bgcolor: 'success.main',
                  },
                }}
              >
                <Iconify icon="eva:arrow-back-outline" />
              </IconButton>
              <Typography variant="h4"> Kho tài liệu </Typography>
            </Stack>
          </Stack>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <FilePanel
                title="Folders"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenNewStoreFolder}
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {listFolders && listFolders.length
                    ? listFolders.map((folder, index) => (
                        <FileFolderCard
                          key={index}
                          folder={folder}
                          // onClick={() => handleOnClickFileFolderCard(folder.id)}
                          onDelete={() => console.log('DELETE', folder.id)}
                          dataStoreFolder={storeFolderID}
                          sx={{
                            ...(_storeFolders.length > 3 && {
                              minWidth: 222,
                            }),
                          }}
                        />
                      ))
                    : ''}
                </Stack>
              </Scrollbar>

              <Stack direction="row" alignItems="center" sx={{ mb: 3, mt: 2 }}>
                <Stack flexGrow={1}>
                  <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
                    <Typography variant="h6"> Tài liệu gần đây </Typography>

                    <IconButton
                      size="small"
                      color="success"
                      onClick={handleOpenFrom}
                      sx={{
                        p: 0,
                        width: 24,
                        height: 24,
                        color: 'common.white',
                        bgcolor: 'success.main',
                        '&:hover': {
                          bgcolor: 'success.main',
                        },
                      }}
                    >
                      <Iconify icon="eva:plus-fill" />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
              <UploadMyDocumentDialog open={openFormUploadDocument} onClose={handleCloseFrom} />

              <Stack spacing={2}>
                {listDocuments && listDocuments.length
                  ? listDocuments.map((file) => (
                      <FileGeneralRecentCard
                        dataStoreFolder={{
                          storeFolderID,
                          disableButtonShare: true,
                          isDownloadDocumentGeneral: true,
                        }}
                        handleOpenPopupSaveInMyFolder={handleOpenPopupSaveInMyFolder}
                        key={file.id}
                        file={file}
                        onDelete={() => console.log('DELETE', file.id)}
                      />
                    ))
                  : ''}
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Container>

      {openPopupSaveInMyFolder && (
        <PopupGetFolder open={openPopupSaveInMyFolder} onClose={handleClosePopupSaveInMyFolder} data={documentHandle} />
      )}

      {openNewStoreFolder && (
        <FileNewFolderDialog
          open={openNewStoreFolder}
          onClose={handleCloseNewStoreFolder}
          title="New Folder"
          folderName={storeFolderName}
          onChangeFolderName={handleChangeStoreFolderName}
          onCreate={handleCreateNewStoreFolder}
        />
      )}
    </>
  );
}
