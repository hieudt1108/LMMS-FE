import PropTypes from 'prop-types';
import { useCallback, useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Paper, Avatar, Typography, CardHeader } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import Carousel, { CarouselArrows } from '../../../../components/carousel';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from '../../../../routes/paths';
// ----------------------------------------------------------------------

ClassNewestBooking.propTypes = {
  sx: PropTypes.object,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function ClassNewestBooking({ title, subheader, list, sx, ...other }) {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const carouselSettings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2, ...sx }} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={<CarouselArrows onNext={handleNext} onPrevious={handlePrev} />}
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' },
        }}
      />

      {/* {list.map((item) => (
          <BookingItem key={item.id} item={item} />
        ))} */}
      <Carousel ref={carouselRef} {...carouselSettings}>
        {list.map((item) => (
          <BookingItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

// ----------------------------------------------------------------------

BookingItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    cover: PropTypes.string,
    avatar: PropTypes.string,
    person: PropTypes.string,
    roomType: PropTypes.string,
    roomNumber: PropTypes.string,
    bookdAt: PropTypes.instanceOf(Date),
  }),
};

function BookingItem({ item }) {
  const { id, avatar, name, roomNumber, bookdAt, person, cover, roomType } = item;

  const {
    query: { class_id },
  } = useRouter();
  const { push } = useRouter();
  const handleOnClickSubject = () => {
    push(PATH_DASHBOARD.class.subject(class_id, id));
  };

  return (
    <Paper onClick={handleOnClickSubject} sx={{ mx: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatar} />

          <div>
            <Typography variant="subtitle2">{name}</Typography>

            <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
              {fDateTime(bookdAt)}
            </Typography>
          </div>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="fluent:text-number-list-ltr-24-filled" width={16} />
            <Typography variant="caption">Slot {30}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="carbon:document-attachment" width={16} />
            <Typography variant="caption">{50} Document</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ p: 1, cursor: 'pointer' }}>
        <Image alt="cover" src={cover} sx={{ borderRadius: 1 }} />
      </Box>
    </Paper>
  );
}
