import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {Card, Typography, Stack, Avatar, Box, Button, Alert} from '@mui/material';

import useResponsive from '../../../../hooks/useResponsive';
// components
import Iconify from '../../../../components/iconify';

// utils
import { fData } from '../../../../utils/formatNumber';
import UploadDocToSlot from '../../myclass/popupdiaglog/UploadDocToSlot';
import { FileGeneralRecentCard } from '../../general/file';
import {useAuthContext} from "../../../../auth/useAuthContext";

const GB = 1000000000 * 24;

export default function DocumentLocal({ data, documentInClass, handleOpenFormUploadDocToSlot }) {
  const { user } = useAuthContext();
  return (
    <>
      <Card sx={{ p: 3, cursor: 'pointer' }}>
        <Stack direction="row" alignItems="center" display="flex" justifyContent="flex-end">
          {user?.roles.find((role) => role.name !== 'HOCSINH') ? (
          <Button
            size="small"
            onClick={() => handleOpenFormUploadDocToSlot(0)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm tài liệu chung
          </Button>
          ) : (
              <></>
          )}
        </Stack>
        <Stack spacing={2}>
            {documentInClass && documentInClass?.length ? (
              documentInClass?.map(
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
              )
            ) : (
            <Stack alignItems="center"
                   justifyContent="center"
            >
                <Alert severity="info">
                    Chưa có tài liệu chung cho môn học này
                </Alert>
            </Stack>
            )}
        </Stack>
      </Card>
    </>
  );
}
