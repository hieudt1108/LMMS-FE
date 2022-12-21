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

export default function DocumentLocal({ data, documentInClass, handleOpenFormUploadDocToSlot }) {
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
          {documentInClass?.map(
            (doc, index) =>
              doc.slotId === null && (
                <Stack spacing={2}>
                  <FileGeneralRecentCard
                    key={index}
                    file={doc}
                    onDelete={() => console.log('DELETE', doc.id)}
                    data={{ ...data, index }}
                  />
                </Stack>
              )
          )}
        </Stack>
      </Card>
    </>
  );
}
