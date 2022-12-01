import PropTypes from 'prop-types';
// import { paramCase } from 'change-case';
// // next
// import NextLink from 'next/link';
// // @mui
// import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Stack, Avatar, Box, Alert } from '@mui/material';
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
            <Stack
              key={category.id}
              spacing={3}
              direction="row"
              alignItems="center"
              sx={{ border: '1px solid #f3f2f2', borderRadius: '12px' }}
              p={2}
            >
              <Avatar
                variant="rounded"
                sx={{ bgcolor: 'background.neutral', width: 48, height: 48, borderRadius: 1.5 }}
              >
                <Box component="img" src="/assets/icons/files/ic_document.svg" />
              </Avatar>

              <Stack spacing={0.5} flexGrow={1}>
                <Typography variant="subtitle2"> {category.name} </Typography>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.disabled', mr: 3 }}>
                    TypeFile: {category.typeFile}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    dateCreated:
                  </Typography>
                </Box>
              </Stack>

              {/* <Typography variant="subtitle2"> {fData(category.usedStorage)} </Typography> */}
            </Stack>
          ))
        ) : (
          <Alert severity="error">Tài liệu trống!</Alert>
        )}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------
