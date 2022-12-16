import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Button,
  Typography,
  Stack,
  Divider,
  MenuItem,
  AvatarGroup,
  Checkbox,
  IconButton,
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import DocumentPreview from '../../documents/DocumentPreview';
// DATE
import { format } from 'date-fns';
import UploadDocToSlot from '../../myclass/popupdiaglog/UploadDocToSlot';
import FileThumbnail, { fileFormat } from '../../../../components/file-thumbnail';
import { URL_GLOBAL } from '../../../../config';
import { FileDetailsDrawer } from '../../file';
import useResponsive from '../../../../hooks/useResponsive';
import { dispatch } from '../../../../redux/store';
import { startDownloadFileRedux } from '../../../../redux/slices/document';
import { FileGeneralRecentCard } from '../../general/file';
import { useSelector } from 'react-redux';

export default function SysllabusSubject({
  data,
  document,
  classId,
  subjectId,
  documentInClass,
  handleOpenFormUploadDocToSlot,
}) {
  const isDesktop = useResponsive('up', 'sm');
  const { createBy, createDate, id, isDeleted, name, updateBy, updateDate } = document;
  const [openPreview, setOpenPreview] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            {name}
          </Typography>

          <Button
            size="small"
            onClick={() => handleOpenFormUploadDocToSlot(id)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm tài liệu
          </Button>
        </Stack>

        <Stack spacing={3}>
          <Stack key={''} spacing={1}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Ngày tạo:
              </Box>
              {format(new Date(createDate), 'dd/MM/yyyy')}
            </Typography>

            {documentInClass?.map((doc) =>
              doc?.slotId === id ? (
                <Stack key={doc.id} spacing={2}>
                  <FileGeneralRecentCard data={data} file={doc} onDelete={() => console.log('DELETE', doc.id)} />
                </Stack>
              ) : (
                ''
              )
            )}
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
