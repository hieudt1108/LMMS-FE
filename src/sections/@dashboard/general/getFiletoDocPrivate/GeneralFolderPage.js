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

export default function GeneralFolderPage({ dataSaveDocToMyFolder }) {
  const { enqueueSnackbar } = useSnackbar();

  const { id, name, listFolders, listDocuments } = dataSaveDocToMyFolder;

  const { themeStretch } = useSettingsContext();

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
                title={name ? name : 'Thư mục gốc'}
                link={PATH_DASHBOARD.fileManager}
                // onOpen={!dataGeneralFolder ? handleOpenNewFolder : ''}
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="column" spacing={3} sx={{ pb: 3 }}>
                  {listFolders && listFolders.length
                    ? listFolders.map((folder, index) => (
                        <FolderGeneralData
                          dataSaveDocToMyFolder={dataSaveDocToMyFolder}
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
                if (dataSaveDocToMyFolder) {
                  dataSaveDocToMyFolder.handleUploadDocumentToMyFolder(dataSaveDocToMyFolder);
                }
              }}
            >
              {`Lưu tài liệu về ${name ? name : 'Thư mục gốc'}`}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
