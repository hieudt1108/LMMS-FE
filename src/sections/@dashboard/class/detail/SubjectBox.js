import PropTypes from 'prop-types';
import { useCallback, useRef, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Paper, Avatar, Typography, CardHeader, Grid } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// components
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import SubjectImage from '../../../../utils/SubjectImage';
import biology from '../../../../../public/assets/images/subjectlist/Biology.png';
import MenuPopover from '../../../../components/menu-popover';
import Iconify from '../../../../components/iconify';
import useResponsive from '../../../../hooks/useResponsive';
import FileThumbnail, { fileFormat } from '../../../../components/file-thumbnail';
import { FileDetailsDrawer, FileShareDialog } from '../../file';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Image from '../../../../components/image';
import Carousel, { CarouselArrows } from '../../../../components/carousel';
// ----------------------------------------------------------------------

ClassNewestBooking.propTypes = {
  sx: PropTypes.object,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.number,
};

export default function ClassNewestBooking({ myClass, title, subheader, sx, ...other }) {
  console.log('myClass', myClass);
  const theme = useTheme();

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
        {myClass?.subjects?.map((item) => (
          <Grid item xs={2} sm={12} md={12} key={item.id}>
            {/* <Item>xs=2</Item> */}

            <BookingItem key={item.subjectId} item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

function BookingItem({ item }) {
  const { code, name, subjectId, teacherFirstName, teacherLastName, totalDocs } = item;

  const {
    query: { class_id },
  } = useRouter();

  const { push } = useRouter();
  const isDesktop = useResponsive('up', 'sm');
  const [openPopover, setOpenPopover] = useState(null);

  const handleOnClickSubject = () => {
    push(PATH_DASHBOARD.class.subject(class_id, subjectId));
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <Paper sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack onClick={handleOnClickSubject} spacing={2.5} sx={{ p: 3, pb: 2.5, display: 'flex', cursor: 'pointer' }}>
        <Box sx={{ p: 1 }}>
          {/* <SubjectImage subject="Toán học" width={30} height={30} /> */}
          <img src="public/assets/images/subjectlist/Biology.png" sx={{ width: 30 }} />
          {/* <ing src={Biology} width={30} /> */}
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={2}>
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
    </Paper>
  );
}
