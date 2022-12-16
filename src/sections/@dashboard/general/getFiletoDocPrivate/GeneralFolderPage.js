import React from 'react';
import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
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
import Iconify from 'src/components/iconify/Iconify';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

// ----------------------------------------------------------------------

GeneralFolderPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function GeneralFolderPage({ data }) {
  const { enqueueSnackbar } = useSnackbar();

  const { id, name, parentId, listFolders, listDocuments } = data;

  const { themeStretch } = useSettingsContext();

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
                // onder ? handleOpenNewFolder : ''}
                sx={{ mt: 5 }}
              />
              <Scrollbar>
                <Stack direction="column" spacing={3} sx={{ pb: 3 }}>
                  {listFolders && listFolders.length
                    ? listFolders.map((folder, index) => (
                        <FolderGeneralData
                          data={data}
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
                if (data) {
                  data.handleUploadDocumentToMyFolder(data);
                }
              }}
            >
              {`Lưu tài liệu về đây`}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
