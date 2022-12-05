import {useCallback, useEffect, useState} from 'react';
// next
import Head from 'next/head';
// @mui
import {useTheme} from '@mui/material/styles';
import {Container, Grid, Stack} from '@mui/material';
// routes
import {PATH_DASHBOARD} from '../../../../routes/paths';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import {_storeFolders} from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Scrollbar from '../../../../components/scrollbar';
import {useSettingsContext} from '../../../../components/settings';
// sections
import {FileGeneralRecentCard} from '../../../../sections/@dashboard/general/file';
import {FileFolderCard, FileNewFolderDialog, FilePanel} from '../../../../sections/@dashboard/file';
import {useRouter} from 'next/router';
import {dispatch} from 'src/redux/store';
import {useSelector} from 'react-redux';
import {createStoreFolderRedux, getStoreFolderRedux} from "../../../../redux/slices/storeFolder";

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

StoreFilePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function StoreFilePage() {
  const theme = useTheme();

  const {
    query: { storeFolder_id: storeFolderID },
    push,
  } = useRouter();
  const { storeFolder } = useSelector((state) => state.storeFolder);
  const { id, listFolders, listDocuments } = storeFolder;


  console.log('GeneralFilePage2', listFolders, listDocuments);

  useEffect(() => {
    dispatch(getStoreFolderRedux(storeFolderID));
  }, [dispatch, storeFolderID]);

  const smDown = useResponsive('down', 'sm');

  const { themeStretch } = useSettingsContext();

  const [storeFolderName, setStoreFolderName] = useState('');

  const [files, setFiles] = useState([]);

  const [openNewStoreFolder, setOpenNewStoreFolder] = useState(false);

  const [openUploadFile, setOpenUploadFile] = useState(false);

  const handleOpenNewStoreFolder = () => {
    setOpenNewStoreFolder(true);
  };

  const handleCloseNewStoreFolder = () => {
    setOpenNewStoreFolder(false);
  };

  const handleOpenUploadFile = () => {
    push(PATH_DASHBOARD.storeFolder.newDocument(Number.parseInt(id)));
    // setOpenUploadFile(true);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
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
