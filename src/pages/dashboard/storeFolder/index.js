import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// _mock
import { _storeFolders } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Scrollbar from '../../../components/scrollbar';
import { useSettingsContext } from '../../../components/settings';
// sections
import { FileGeneralRecentCard } from '../../../sections/@dashboard/general/file';
import { FileFolderCard, FileNewFolderDialog, FilePanel } from '../../../sections/@dashboard/file';
import { useRouter } from 'next/router';
import { dispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { createStoreFolderRedux, getStoreFolderRootRedux } from '../../../redux/slices/storeFolder';
import Iconify from '../../../components/iconify';
import UploadMyDocumentDialog from '../../../sections/@dashboard/storeFolder/UploadMyDocumentDialog';
import { useSnackbar } from 'notistack';
import PopupGetFolder from 'src/sections/@dashboard/general/getFiletoDocPrivate/PopupGetFolder';

// ----------------------------------------------------------------------

StoreFileRootPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function StoreFileRootPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const { error, storeFolder } = useSelector((state) => state.storeFolder);
  const { id, listFolders, listDocuments } = storeFolder;

  useEffect(() => {
    console.log('useEffect StoreFileRootPage', storeFolder);
    if (!storeFolder.id) {
      dispatch(getStoreFolderRootRedux());
    }
  }, []);

  const smDown = useResponsive('down', 'sm');

  const router = useRouter();

  const { themeStretch } = useSettingsContext();

  const [storeFolderName, setStoreFolderName] = useState('');

  const [documentHandle, setDocumentHandle] = useState({});

  const [openNewStoreFolder, setOpenNewStoreFolder] = useState(false);

  const [openFrom, setOpenFrom] = useState(false);

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };

  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

  const handleOpenNewStoreFolder = () => {
    setOpenNewStoreFolder(true);
  };

  const handleCloseNewStoreFolder = () => {
    setOpenNewStoreFolder(false);
  };

  const [openPopupSaveInMyFolder, setOpenPopupSaveInMyFolder] = useState(false);

  const handleOpenPopupSaveInMyFolder = (data) => {
    const { document } = data;
    setDocumentHandle(document);
    setOpenPopupSaveInMyFolder(true);
  };

  const handleClosePopupSaveInMyFolder = () => {
    setOpenPopupSaveInMyFolder(false);
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
    console.log('parentid', Number.parseInt(id));
    handleCloseNewStoreFolder();
    console.log('hellooasd', error);
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    } else {
      enqueueSnackbar('Tạo thư mục thành công');
      dispatch(removeError('Tạo thư mục thành công'));
    }
  };

  const handleOnClickFileFolderCard = useCallback((storeFolder_id) => {
    console.log('handleOnClickFileFolderCard', storeFolder_id);
    push(PATH_DASHBOARD.storeFolder.link(storeFolder_id));
  }, []);

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
                onClick={() => router.back()}
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
                title="Thư mục"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenNewStoreFolder}
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {listFolders && listFolders.length
                    ? listFolders.map((storeFolder, index) => (
                        <FileFolderCard
                          key={index}
                          folder={storeFolder}
                          onClick={() => handleOnClickFileFolderCard(storeFolder.id)}
                          onDelete={() => console.log('DELETE', storeFolder.id)}
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
              <UploadMyDocumentDialog open={openFrom} onClose={handleCloseFrom} />

              <Stack spacing={2}>
                {listDocuments && listDocuments.length
                  ? listDocuments.map((file) => (
                      <FileGeneralRecentCard
                        dataStoreFolder={{
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

      {/* <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile}/> */}

      <PopupGetFolder open={openPopupSaveInMyFolder} onClose={handleClosePopupSaveInMyFolder} data={documentHandle} />

      <FileNewFolderDialog
        open={openNewStoreFolder}
        onClose={handleCloseNewStoreFolder}
        title="New Folder"
        folderName={storeFolderName}
        onChangeFolderName={handleChangeStoreFolderName}
        onCreate={handleCreateNewStoreFolder}
      />
    </>
  );
}
