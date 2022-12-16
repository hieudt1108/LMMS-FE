import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Card, Typography, Stack, Avatar, Box, Button } from '@mui/material';

import useResponsive from '../../../../hooks/useResponsive';
// components
import Iconify from '../../../../components/iconify';

// utils
import { fData } from '../../../../utils/formatNumber';
import UploadDocToSlot from '../../myclass/popupdiaglog/UploadDocToSlot';
import { FileGeneralRecentCard } from '../../general/file';

const GB = 1000000000 * 24;

const data = [
  {
    name: 'Images',
    usedStorage: GB / 2,
    filesCount: 223,
    icon: <Box component="img" src="/assets/icons/files/ic_img.svg" />,
  },
  {
    name: 'Media',
    usedStorage: GB / 5,
    filesCount: 223,
    icon: <Box component="img" src="/assets/icons/files/ic_video.svg" />,
  },
  {
    name: 'Documents',
    usedStorage: GB / 5,
    filesCount: 223,
    icon: <Box component="img" src="/assets/icons/files/ic_document.svg" />,
  },
  {
    name: 'Other',
    usedStorage: GB / 10,
    filesCount: 223,
    icon: <Iconify icon="eva:file-fill" width={24} sx={{ color: 'text.disabled' }} />,
  },
];

export default function DocumentLocal({ docs, handleOpenFormUploadDocToSlot }) {
  return (
    <>
      <Card sx={{ p: 3, cursor: 'pointer' }}>
        <Stack direction="row" alignItems="center" display="flex" justifyContent="flex-end">
          <Button
            size="small"
            onClick={() => handleOpenFormUploadDocToSlot(0)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm tài liệu chung
          </Button>
        </Stack>
        <Stack spacing={2}>
          {docs?.map(
            (doc) =>
              doc.slotId === null && (
                <Stack spacing={2}>
                  <FileGeneralRecentCard
                    key={doc.id}
                    file={doc}
                    onDelete={() => console.log('DELETE', doc.id)}
                    data={{ menuDocument: ['preview', 'download', 'share', 'delete'] }}
                  />
                </Stack>
              )
          )}
        </Stack>
      </Card>
    </>
  );
}
