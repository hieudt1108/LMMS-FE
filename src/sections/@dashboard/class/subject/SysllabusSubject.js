import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Button, Typography, Stack, Divider, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import FilePreview from '../../documents/DocumentPreview';
// DATE
import { format } from 'date-fns';

export default function SysllabusSubject({ data, docs }) {
  const { createBy, createDate, id, isDeleted, name, updateBy, updateDate } = data;
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

          <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />}>
            Thêm tài liệu
          </Button>
        </Stack>

        <Stack spacing={3}>
          <Stack key={''} spacing={1}>
            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Date:
              </Box>
              {format(new Date(createDate), 'dd MMM yyyy')}
            </Typography>

            {docs?.map((doc) =>
              doc?.slotId === id ? (
                <Box variant="body2" sx={{ display: 'flex' }}>
                  <Box component="img" src="/assets/icons/files/ic_document.svg" sx={{ ml: 1 }} />
                  <Button
                    variant="text"
                    onClick={() => {
                      handleClosePopover();
                      handleOpenPreview();
                    }}
                  >
                    {doc.name}
                  </Button>
                </Box>
              ) : (
                ''
              )
            )}

            {/* <Stack direction="row" spacing={1}>
              <Button color="error" size="small" startIcon={<Iconify icon="eva:trash-2-outline" />}>
                Delete
              </Button>

              <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />}>
                Edit
              </Button>
            </Stack> */}
          </Stack>
        </Stack>
      </Card>
      <FilePreview open={openPreview} onClose={handleClosePreview} />
    </>
  );
}
