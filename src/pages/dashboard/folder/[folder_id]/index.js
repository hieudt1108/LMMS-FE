import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import {Box, Breadcrumbs, Button, Container, Grid, IconButton, Link, Stack, Typography} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import { _folders } from '../../../../_mock/arrays';
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
import { createFolderRedux, getFolderRedux } from 'src/redux/slices/folder';
import { useSnackbar } from 'notistack';
import LinkItem from "../../../../components/custom-breadcrumbs/LinkItem";
import Iconify from "../../../../components/iconify";

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

GeneralFilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralFilePage({ dataGeneralFolder, dataUploadDocsToSlot }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const {
    query: { folder_id: folderID },
    push,
  } = useRouter();
  const router = useRouter()
  const { error, folder } = useSelector((state) => state.folder);
  const { getOne } = useSelector((state) => state.document);
  const { id, listFolders, listDocuments } = folder;
  console.log('GeneralFilePage', listFolders, listDocuments, dataGeneralFolder);

  useEffect(() => {
    console.log('GeneralFilePage useEffect ', dataGeneralFolder, folderID);
    if (dataGeneralFolder) {
      dispatch(getFolderRedux(dataGeneralFolder.myFolderId));
    } else if (folderID || folderID === 0) {
      dispatch(getFolderRedux(folderID));
    }
  }, [folderID, dataGeneralFolder]);

  const smDown = useResponsive('down', 'sm');

  const { themeStretch } = useSettingsContext();

  const [folderName, setFolderName] = useState('');

  const [files, setFiles] = useState([]);

  const [openNewFolder, setOpenNewFolder] = useState(false);

  const [openUploadFile, setOpenUploadFile] = useState(false);

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

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
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
        <Box sx={{ mb: 5}}>
          <Stack flexGrow={1}>
            <Stack direction="row" alignItems="center" spacing={1} flexGrow={1}>
                <IconButton
                    size="small"
                    color="success"
                    onClick={()=> router.back()}
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
              <Typography variant="h4"> Tài liệu của tôi </Typography>
            </Stack>
          </Stack>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <FilePanel
                title="Folders"
                link={PATH_DASHBOARD.fileManager}
                onOpen={!dataGeneralFolder ? handleOpenNewFolder : ''}
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {listFolders && listFolders.length
                    ? listFolders.map((folder, index) => (
                        <FileFolderCard
                          dataGeneralFolder={dataGeneralFolder}
                          key={folder.id}
                          folder={folder}
                          sx={{
                            ...(_folders.length > 3 && {
                              minWidth: 222,
                            }),
                          }}
                        />
                      ))
                    : ''}
                </Stack>
              </Scrollbar>

              <FilePanel
                title="Tài liệu gần đây"
                link={PATH_DASHBOARD.fileManager}
                onOpen={!dataGeneralFolder ? handleOpenUploadFile : ''}
                sx={{ mt: 2 }}
              />

              <Stack spacing={2}>
                {listDocuments && listDocuments.length
                  ? listDocuments.map((file) => (
                      <FileGeneralRecentCard
                        dataGeneralFolder={dataGeneralFolder}
                        dataUploadDocsToSlot={dataUploadDocsToSlot}
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

      <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />

      <FileNewFolderDialog
        open={openNewFolder}
        onClose={handleCloseNewFolder}
        title="New Folder"
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
        onCreate={handleCreateNewFolder}
      />
    </>
  );
}
