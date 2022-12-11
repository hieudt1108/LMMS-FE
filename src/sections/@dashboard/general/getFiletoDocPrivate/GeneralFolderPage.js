import React from 'react';
import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Container, Grid, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useResponsive from 'src/hooks/useResponsive';
// _mock
import { _folders } from 'src/_mock/arrays';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
// sections
import { FileFolderCard, FileNewFolderDialog, FilePanel, FolderGeneralData } from 'src/sections/@dashboard/file';
import { useRouter } from 'next/router';
import { dispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { createFolderRedux, getFolderRedux } from 'src/redux/slices/folder';
import { useSnackbar } from 'notistack';
import ConfirmDialog from 'src/components/confirm-dialog/ConfirmDialog';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

GeneralFolderPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function GeneralFolderPage({ dataGeneralFolder }) {
  const { enqueueSnackbar } = useSnackbar();

  const { error, folder } = useSelector((state) => state.folder);
  const { id, listFolders, listDocuments } = folder;
  console.log('GeneralFolderPage', listFolders, listDocuments, dataGeneralFolder);

  useEffect(() => {
    if (dataGeneralFolder) {
      dispatch(getFolderRedux(dataGeneralFolder.myFolderId));
    }
  }, [dataGeneralFolder]);

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

  const handleCreateNewFolder = () => {
    console.log('CREATE NEW FOLDER', folderName);
    setFolderName('');
    dispatch(
      createFolderRedux({
        name: folderName,
        parentId: Number.parseInt(id),
      })
    );
    handleCloseNewFolder();
    enqueueSnackbar(error ? error : 'Tạo thư mục thành công', { variant: 'error' });
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleOnClickFileFolderCard = (folder_id) => {
    console.log('handleOnClickFileFolderCard', folder_id, dataGeneralFolder);
    if (dataGeneralFolder) {
      return dataGeneralFolder.setMyFolderId(folder_id);
    }
    push(PATH_DASHBOARD.folder.link(folder_id));
  };

  return (
    <>
      <Head>
        <title> Hệ thống quản lý Học liệu</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <div>
              <FilePanel
                title={folder.name ? folder.name : 'Thư mục gốc'}
                link={PATH_DASHBOARD.fileManager}
                onOpen={!dataGeneralFolder ? handleOpenNewFolder : ''}
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="column" spacing={3} sx={{ pb: 3 }}>
                  {listFolders && listFolders.length
                    ? listFolders.map((folder, index) => (
                        <FolderGeneralData
                          dataGeneralFolder={dataGeneralFolder}
                          key={index}
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
            </div>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                if (dataGeneralFolder) {
                  dataGeneralFolder.handleUploadDocumentToMyFolder(folder);
                }
              }}
            >
              {`Lưu tài liệu về ${folder.name ? folder.name : 'Thư mục gốc'}`}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
