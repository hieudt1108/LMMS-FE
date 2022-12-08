import PropTypes from 'prop-types';
import {useCallback, useRef, useState} from 'react';
// @mui
import {useTheme} from '@mui/material/styles';
import {
    Box,
    Stack,
    Paper,
    Avatar,
    Typography,
    CardHeader,
    Checkbox,
    IconButton,
    AvatarGroup,
    MenuItem, Divider, Button
} from '@mui/material';
// utils
import {fDateTime} from '../../../../utils/formatTime';
// components
import {useRouter} from 'next/router';
import {PATH_DASHBOARD} from '../../../../routes/paths';
import SubjectImage from "../../../../utils/SubjectImage";
import MenuPopover from "../../../../components/menu-popover";
import Iconify from "../../../../components/iconify";
import useResponsive from "../../../../hooks/useResponsive";
import FileThumbnail, {fileFormat} from "../../../../components/file-thumbnail";
import {FileDetailsDrawer, FileShareDialog} from "../../file";
import ConfirmDialog from "../../../../components/confirm-dialog";
import Image from '../../../../components/image';
import Carousel, {CarouselArrows} from "../../../../components/carousel";
// ----------------------------------------------------------------------

ClassNewestBooking.propTypes = {
    sx: PropTypes.object,
    list: PropTypes.array,
    title: PropTypes.string,
    subheader: PropTypes.number,
};

export default function ClassNewestBooking({myClass, title, subheader, sx, ...other}) {
    console.log('myClass',myClass)
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
                subheader={`${subheader} môn học`}
                action={<CarouselArrows onNext={handleNext} onPrevious={handlePrev} />}
                sx={{
                    p: 0,
                    mb: 3,
                    '& .MuiCardHeader-action': { alignSelf: 'center' },
                }}
            />
            <Carousel ref={carouselRef} {...carouselSettings}>
                {myClass?.subjects?.map((item) => (
                    <BookingItem key={item.subjectId} item={item} />
                ))}
            </Carousel>
        </Box>
    );
}

// ----------------------------------------------------------------------

function BookingItem({item}) {
    const {code, name, subjectId, teacherFirstName, teacherLastName, totalDocs} = item;

    const {
        query: {class_id},
    } = useRouter();

    const {push} = useRouter();
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
            <Stack spacing={2.5} sx={{ p: 3, pb: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <div>
                        <Typography variant="subtitle2">{name}</Typography>
                    </div>
                </Stack>
                {teacherFirstName && teacherLastName && (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography  variant="subtitle2">{`Giáo viên dạy:  ${teacherFirstName} ${teacherLastName}`}</Typography>
                    </Stack>
                )}
                {!teacherFirstName && !teacherLastName && (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography  variant="subtitle2">{`Giáo viên dạy: Chưa có`}</Typography>
                    </Stack>
                )}
                <Stack direction="row" alignItems="center" spacing={3} sx={{ color: 'text.secondary' }}>
                    {/*<Stack direction="row" alignItems="center" spacing={1}>*/}
                    {/*    <Typography  variant="subtitle2">{`Giáo viên dạy:  ${teacherFirstName} ${teacherLastName}`}</Typography>*/}
                    {/*</Stack>*/}

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="ic:round-vpn-key" width={16} />
                        <Typography variant="caption">Số tiết học:  {50}</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="eva:people-fill" width={16} />
                        <Typography variant="caption">Số tài liệu: {totalDocs}</Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Box onClick={handleOnClickSubject} sx={{ p: 1, position: 'relative',cursor : 'pointer' }}>
                <Image alt="cover" src={'http://lmms.site:7070/assets/images/subjects/history.png'}  sx={{ borderRadius: 1.5 }} />
            </Box>
        </Paper>
    );
}
