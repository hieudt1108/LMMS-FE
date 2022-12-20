import PropTypes from 'prop-types';
// import { paramCase } from 'change-case';
// // next
// import NextLink from 'next/link';
// // @mui
// import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Stack, Avatar, Box, Alert } from '@mui/material';
import { FileGeneralRecentCard } from '../general/file';
import React from 'react';
import EmptyContent from '../../../components/empty-content';
// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// // hooks
// import useResponsive from '../../../hooks/useResponsive';
// // utils
// import { fData } from '../../../utils/formatNumber';
// import { fShortenNumber } from '../../../utils/formatNumber';
// // components
// import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

DocumentPostCard.propTypes = {
  index: PropTypes.number,
  document: PropTypes.object,
};

export default function DocumentPostCard({ documents }) {
  // const isDesktop = useResponsive('up', 'md');

  // const { code, name, typeFile, id } = document;
  return (
    <Card sx={{ p: 3, cursor: 'pointer' }}>
      <Stack spacing={3}>
        {documents && documents?.length ? (
          documents?.map((category) => (
            <Stack spacing={2}>
              <FileGeneralRecentCard
                data={{
                  menuDocument: ['preview', 'download'],
                  types: ['folder'],
                }}
                fileShare={category}
                key={category.id}
                file={category}
                onDelete={() => console.log('DELETE', category.id)}
              />
            </Stack>
          ))
        ) : (
          <EmptyContent
            title="Không có dữ liệu"
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        )}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
