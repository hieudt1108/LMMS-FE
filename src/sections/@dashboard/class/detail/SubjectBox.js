import PropTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Paper, MenuItem, Typography, CardHeader, Grid, Button } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// components
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../../routes/paths';

import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import useResponsive from '../../../../hooks/useResponsive';

import { deleteSubjectInClass } from '../../../../dataProvider/agent';
// import Image from '../../../../components/image';

// ----------------------------------------------------------------------

ClassNewestBooking.propTypes = {
  sx: PropTypes.object,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.number,
};

export default function ClassNewestBooking({ myClass, title, user, subheader, sx, ...other }) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handlerDelete = async (id) => {
    const res = await deleteSubjectInClass(id);
    if (res.status < 400) {
      enqueueSnackbar('Xoá lớp thành công');
    } else {
      enqueueSnackbar('Xoá thất bại');
    }
  };
  return (
    <Box sx={{ py: 2, ...sx }} {...other}>
      <CardHeader
        title={title}
        subheader={`${subheader} môn học`}
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
        {myClass?.subjects?.map((item, index) => (
          <Grid item xs={2} sm={12} md={12} key={index}>
            <BookingItem
              handlerDelete={() => handlerDelete(item.subjectId)}
              user={user}
              key={item.subjectId}
              item={item}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

function BookingItem({ item, user, handlerDelete }) {
  const { code, name, subjectId, teacherFirstName, teacherLastName, totalDocs } = item;

  const {
    query: { class_id },
  } = useRouter();

  const { push } = useRouter();
  const isDesktop = useResponsive('up', 'sm');

  const handleOnClickSubject = () => {
    push(PATH_DASHBOARD.class.subject(class_id, subjectId));
  };

  return (
    <Paper
      sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral', display: 'flex', justifyContent: 'space-between' }}
    >
      <Stack
        onClick={handleOnClickSubject}
        spacing={2.5}
        sx={{ p: 1, display: 'flex', cursor: 'pointer', flexDirection: 'row' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <img src="/assets/images/subjectlist/Biology.png" width={120} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" alignItems="center">
            <div>
              <Typography variant="subtitle2">{name}</Typography>
            </div>
          </Stack>
          {teacherFirstName && teacherLastName && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle2">{`Giáo viên dạy:  ${teacherFirstName} ${teacherLastName}`}</Typography>
            </Stack>
          )}
          {!teacherFirstName && !teacherLastName && (
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle2">{`Giáo viên dạy: Chưa có`}</Typography>
            </Stack>
          )}
          <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="ic:round-vpn-key" width={16} />
              <Typography variant="caption">Số tiết học: {50}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="eva:people-fill" width={16} />
              <Typography variant="caption">Số tài liệu: {totalDocs}</Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {user?.roles.find((role) => role.name === 'ADMIN' || role.name === 'GVCHUNHIEM') ? (
        <Button onClick={handlerDelete}>
          <Iconify icon="eva:trash-2-outline" width={28} />
        </Button>
      ) : (
        ''
      )}
    </Paper>
  );
}
