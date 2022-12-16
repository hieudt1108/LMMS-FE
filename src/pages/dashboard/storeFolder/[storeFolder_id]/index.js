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
  createFolderRedux,
  createStoreFolderRedux,
  getFolderRedux,
  getFolderSavetoDocToMyFolderRedux,
  getFolderUploadDocRedux,
  getStoreFolderRedux,
} from '../../../../redux/slices/folder';
import Iconify from '../../../../components/iconify';
import UploadMyDocumentDialog from '../../../../sections/@dashboard/storeFolder/UploadMyDocumentDialog';
import PopupGetFolder from 'src/sections/@dashboard/general/getFiletoDocPrivate/PopupGetFolder';
import { useSnackbar } from 'notistack';
import { GeneralFilePage } from 'src/sections/@dashboard/folder';
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

  const { enqueueSnackbar } = useSnackbar();

  const { folder } = useSelector((state) => state.folder);

  useEffect(() => {
    dispatch(getFolderRedux(storeFolderID));
  }, [storeFolderID]);

  const { themeStretch } = useSettingsContext();

  const [storeFolderName, setStoreFolderName] = useState('');

  const [documentHandle, setDocumentHandle] = useState({});

  const [openNewStoreFolder, setOpenNewStoreFolder] = useState(false);

  const handleOpenFrom = async () => {
    await dispatch(getFolderUploadDocRedux(0));
    setOpenFormUploadDocument(true);
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

  const handleCreateNewStoreFolder = async () => {
    console.log('CREATE NEW FOLDER', storeFolderName);
    const message = await dispatch(
      createFolderRedux({
        name: storeFolderName,
        parentId: Number.parseInt(id),
      })
    );
    console.log('CREATE NEW FOLDER', message);
    if (message) {
      enqueueSnackbar(message.title, { variant: message.variant });
    }
    setStoreFolderName('');
    handleCloseNewStoreFolder();
  };

  return (
    <>
      <GeneralFilePage
        data={{
          ...folder,
          handleBackPage: () => {
            dispatch(getFolderRedux(folder.parentId));
          },
          types: ['folder'],
          menuSubFolder: ['edit', 'delete'],
          menuDocument: ['preview', 'download', 'saveInMyFolder', 'delete'],
          panel: ['storeFolder'],
        }}
      ></GeneralFilePage>
    </>
  );
}
