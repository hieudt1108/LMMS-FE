import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';

// hooks
// _mock
import { _folders } from 'src/_mock/arrays';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
// sections
import { FileGeneralRecentCard } from 'src/sections/@dashboard/general/file';
import { FileFolderCard, FileNewFolderDialog, FilePanel } from 'src/sections/@dashboard/file';
import { useRouter } from 'next/router';
import { dispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import {
  createFolderRedux,
  getFolderRedux,
  getFolderSaveDocToMyFolderRedux,
  getFolderSavetoDocToMyFolderRedux,
  getFolderUploadDocRedux,
} from 'src/redux/slices/folder';
import { useSnackbar } from 'notistack';
import LinkItem from 'src/components/custom-breadcrumbs/LinkItem';
import Iconify from 'src/components/iconify';
import DataGridBasic from 'src/sections/_examples/mui/data-grid/DataGridBasic';
import UploadMyDocumentDialog from '../storeFolder/UploadMyDocumentDialog';
import PopupGetFolder from '../general/getFiletoDocPrivate/PopupGetFolder';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

GeneralFilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralFilePage({ data }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { id, name, parentId, listFolders, listDocuments } = data;
  console.log('GeneralFilePage', data);

  const { themeStretch } = useSettingsContext();

  const [folderName, setFolderName] = useState('');

  const [documentHandle, setDocumentHandle] = useState({});

  const [openNewFolder, setOpenNewFolder] = useState(false);

  const [openFormUploadDocument, setOpenFormUploadDocument] = useState(false);

  const [openPopupSaveInMyFolder, setOpenPopupSaveInMyFolder] = useState(false);

  const handleClosePopupSaveInMyFolder = () => {
    setOpenPopupSaveInMyFolder(false);
  };

  const handleOpenPopupSaveInMyFolder = async (data) => {
    const { document } = data;
    await dispatch(getFolderSaveDocToMyFolderRedux(0));
    // setDocumentHandle(document);
    setOpenPopupSaveInMyFolder(true);
  };

  const handleOpenFormUploadDocument = async () => {
    await dispatch(getFolderUploadDocRedux(0));
    setOpenFormUploadDocument(true);
  };

  const handleOpenNewFolder = () => {
    setOpenNewFolder(true);
  };

  const handleCloseNewFolder = () => {
    setOpenNewFolder(false);
  };

  const handleOpenUploadFile = () => {
    push(PATH_DASHBOARD.folder.newDocument(Number.parseInt(id)));
    // setOpenUploadFile(true);
  };

  const handleChangeFolderName = useCallback((event) => {
    setFolderName(event.target.value);
  }, []);

  const handleCreateNewFolder = async () => {
    setFolderName('');
    const message = await dispatch(
      createFolderRedux({
        name: folderName,
        parentId: Number.parseInt(id),
      })
    );
    console.log('CREATE NEW FOLDER', message);
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
    handleCloseNewFolder();
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
                disabled={parentId === 0}
                onClick={data.handleBackPage}
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
              <Typography variant="h4"> {data.name} </Typography>
            </Stack>
          </Stack>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <FilePanel
                title="Folders"
                link={PATH_DASHBOARD.fileManager}
                onOpen={
                  // bật lên với folder bình thường
                  data.panel.find((menu) => menu === 'folder' || menu === 'storeFolder') && handleOpenNewFolder
                }
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {listFolders.map((folder, index) => (
                    <FileFolderCard
                      data={data}
                      key={folder.id}
                      folder={folder}
                      sx={{
                        ...(_folders.length > 3 && {
                          minWidth: 222,
                        }),
                      }}
                      onDelete={() => {}}
                    />
                  ))}
                </Stack>
              </Scrollbar>

              <FilePanel
                title="Tài liệu gần đây"
                link={PATH_DASHBOARD.fileManager}
                onOpen={
                  (data.panel.find((panel) => panel === 'folder') && handleOpenUploadFile) ||
                  (data.panel.find((panel) => panel === 'storeFolder') && handleOpenFormUploadDocument)
                }
                sx={{ mt: 2 }}
              />

              <Stack spacing={2}>
                {listDocuments.map((file) => (
                  <FileGeneralRecentCard
                    data={data}
                    key={file.id}
                    file={file}
                    handleOpenPopupSaveInMyFolder={handleOpenPopupSaveInMyFolder}
                  />
                ))}
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Container>

      <FileNewFolderDialog
        open={openNewFolder}
        onClose={handleCloseNewFolder}
        title="New Folder"
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
        onCreate={handleCreateNewFolder}
      />
      {openFormUploadDocument && (
        <UploadMyDocumentDialog open={openFormUploadDocument} onClose={() => setOpenFormUploadDocument(false)} />
      )}

      {openPopupSaveInMyFolder && (
        <PopupGetFolder open={openPopupSaveInMyFolder} onClose={handleClosePopupSaveInMyFolder} data={documentHandle} />
      )}
    </>
  );
}