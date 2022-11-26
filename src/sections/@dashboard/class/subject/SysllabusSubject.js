import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Card, Button, Typography, Stack, Divider } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

export default function SysllabusSubject() {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Week 1 Info
        </Typography>

        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Billing Address
        </Button>
      </Stack>

      <Stack spacing={3}>
        <Stack key={''} spacing={1}>
          <Typography variant="body2">
            <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
              Date:
            </Box>
            5 September - 11 September
          </Typography>

          <Box variant="body2" sx={{ display: 'flex' }}>
            <Box component="img" src="/assets/icons/files/ic_document.svg" sx={{ ml: 1 }} />
            <Button variant="text">Silde Chapter 4</Button>
          </Box>

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
  );
}
