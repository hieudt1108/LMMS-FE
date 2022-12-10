import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useResponsive from '../../../../../hooks/useResponsive';
// _mock
import { _folders } from '../../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../../layouts/dashboard';
// components
import Scrollbar from '../../../../../components/scrollbar';
import { useSettingsContext } from '../../../../../components/settings';
// sections
import {
  FileFolderCard,
  FileNewFolderDialog,
  FilePanel,
  FolderGeneralData,
} from '../../../../../sections/@dashboard/file';
import { useRouter } from 'next/router';
import { dispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { createFolderRedux, getFolderRedux } from 'src/redux/slices/folder';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

GeneralFileFolder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

import React from 'react';

export default function GeneralFileFolder({ dataGeneralFolder }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const {
    query: { folder_id: folderID },
    push,
  } = useRouter();
  const { error, folder } = useSelector((state) => state.folder);
  const { id, listFolders, listDocuments } = folder;
  console.log('GeneralFilePage', listFolders, listDocuments, dataGeneralFolder);

  useEffect(() => {
    dataGeneralFolder ? dispatch(getFolderRedux(dataGeneralFolder.myFolderId)) : dispatch(getFolderRedux(folderID));
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
                title="Folders"
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
                          onDelete={() => console.log('DELETE', folder.id)}
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
              {/* 
              <FilePanel
                title="Tài liệu gần đây"
                link={PATH_DASHBOARD.fileManager}
                onOpen={!dataGeneralFolder ? handleOpenUploadFile : ''}
                sx={{ mt: 2 }}
              /> */}

              {/* <Stack spacing={2} sx={{ mt: 3 }}>
                {listDocuments && listDocuments.length
                  ? listDocuments.map((file) => (
                      <FolderGeneralData
                        dataGeneralFolder={dataGeneralFolder}
                        key={file.id}
                        file={file}
                        onDelete={() => console.log('DELETE', file.id)}
                      />
                    ))
                  : ''}
              </Stack> */}
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