import { useState, useCallback, useEffect } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Box, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import { _folders, _files } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { UploadBox } from '../../../../components/upload';
import { useSettingsContext } from '../../../../components/settings';
// sections
import { FileGeneralRecentCard, FileGeneralStorageOverview } from '../../../../sections/@dashboard/general/file';
import { FilePanel, FileFolderCard, FileNewFolderDialog } from '../../../../sections/@dashboard/file';
import { useRouter } from 'next/router';
import { dispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { createFolderRedux, getFolderRedux } from 'src/redux/slices/folder';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

GeneralFilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralFilePage() {
  const theme = useTheme();

  const {
    query: { folder_id: folderID },
    push,
  } = useRouter();
  const { folder } = useSelector((state) => state.folder);
  const { id, listFolders, listDocuments } = folder;
  console.log('GeneralFilePage', listFolders, listDocuments);

  useEffect(() => {
    dispatch(getFolderRedux(folderID));
  }, [dispatch, folderID]);

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
    window.location.reload();
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

  const handleOnClickFileFolderCard = useCallback((folder_id) => {
    console.log('handleOnClickFileFolderCard', folder_id);
    push(PATH_DASHBOARD.folder.link(folder_id));
  }, []);

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
                onOpen={handleOpenNewFolder}
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="row" spacing={3} sx={{ pb: 3 }}>
                  {listFolders && listFolders.length
                    ? listFolders.map((folder, index) => (
                        <FileFolderCard
                          key={index}
                          folder={folder}
                          onClick={() => handleOnClickFileFolderCard(folder.id)}
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

              <FilePanel
                title="Tài liệu gần đây"
                link={PATH_DASHBOARD.fileManager}
                onOpen={handleOpenUploadFile}
                sx={{ mt: 2 }}
              />

              <Stack spacing={2}>
                {listDocuments && listDocuments.length
                  ? listDocuments.map((file) => (
                      <FileGeneralRecentCard
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
