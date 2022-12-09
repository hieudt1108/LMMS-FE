import React, {useState} from 'react';
import PropTypes from 'prop-types';
// @mui
import {
    Box, Card, Button, Typography, Stack, Divider, MenuItem, AvatarGroup, Checkbox, IconButton
} from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import DocumentPreview from '../../documents/DocumentPreview';
// DATE
import {format} from 'date-fns';
import UploadDocToSlot from "../../myclass/popupdiaglog/UploadDocToSlot";
import FileThumbnail, {fileFormat} from "../../../../components/file-thumbnail";
import {URL_GLOBAL} from "../../../../config";
import {FileDetailsDrawer} from "../../file";
import useResponsive from "../../../../hooks/useResponsive";

export default function SysllabusSubject({data, classId, subjectId, docs}) {
    const {createBy, createDate, id, isDeleted, name, updateBy, updateDate} = data;
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

    const [openFrom, setOpenFrom] = useState(false);

    const handleOpenFrom = () => {
        setOpenFrom(true);
    };

    const handleCloseFrom = () => {
        setOpenFrom(false);
    };
    const isDesktop = useResponsive('up', 'sm');
    return (<>
            <Card sx={{p: 3}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{mb: 3}}>
                    <Typography variant="overline" sx={{color: 'text.secondary'}}>
                        {name}
                    </Typography>

                    <Button size="small" onClick={handleOpenFrom} startIcon={<Iconify icon="eva:plus-fill"/>}>
                        Thêm tài liệu
                    </Button>
                </Stack>
                <UploadDocToSlot classId={classId} subjectId={subjectId} slotId={id} open={openFrom}
                                 onClose={handleCloseFrom}/>
                <Stack spacing={3}>
                    <Stack key={''} spacing={1}>
                        <Typography variant="body2">
                            <Box component="span" sx={{color: 'text.secondary', mr: 0.5}}>
                                Date:
                            </Box>
                            {format(new Date(createDate), 'dd MMM yyyy')}
                        </Typography>

                        {docs?.map((doc) => doc?.slotId === id ? (
                                <>
                                    <Stack
                                        spacing={isDesktop ? 1.5 : 2}
                                        direction={isDesktop ? 'row' : 'column'}
                                        alignItems={isDesktop ? 'center' : 'flex-start'}
                                        sx={{
                                            p: 2.5,
                                            borderRadius: 2,
                                            position: 'relative',
                                            border: (theme) => `solid 1px ${theme.palette.divider}`,
                                            '&:hover': {
                                                bgcolor: 'background.paper',
                                                boxShadow: (theme) => theme.customShadows.z20,
                                                cursor: 'pointer',
                                            },
                                            ...(isDesktop && {
                                                p: 1.5,
                                                borderRadius: 1.5,
                                            }),

                                        }}

                                    >
                                        <FileThumbnail file={doc.typeFile} sx={{ width: 50, height: 50 }} imgSx={{ borderRadius: 1 }} />

                                        <Stack

                                            sx={{
                                                width: 1,
                                                flexGrow: { sm: 1 },
                                                minWidth: { sm: '1px' },
                                            }}
                                        >
                                            <Typography variant="subtitle2" noWrap>
                                                {doc.name}
                                            </Typography>

                                            <Stack
                                                spacing={0.75}
                                                direction="row"
                                                alignItems="center"
                                                sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
                                            >
                                                <Box> {fileFormat(doc.typeFile)} </Box>
                                            </Stack>
                                        </Stack>


                                        <Box
                                            sx={{
                                                top: 8,
                                                right: 8,
                                                flexShrink: 0,
                                                position: 'absolute',
                                                ...(isDesktop && {
                                                    position: 'unset',
                                                }),
                                            }}
                                        >


                                            <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                                                <Iconify icon="eva:more-vertical-fill" />
                                            </IconButton>
                                        </Box>
                                    </Stack>

                                    <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
                                        {(doc.typeFile === 'audio/mpeg' ||
                                            doc.typeFile === 'video/mp4' ||
                                            doc.typeFile === 'image/jpeg' ||
                                            doc.typeFile === 'image/png' ||
                                            doc.typeFile === 'application/pdf') && (
                                            <MenuItem >
                                                <Iconify icon="eva:link-2-fill" />
                                                Xem trước
                                            </MenuItem>
                                        )}

                                        <MenuItem
                                            onClick={() => {
                                                handleClosePopover();

                                            }}
                                        >
                                            <Iconify icon="eva:download-outline" />
                                            Tải xuống
                                        </MenuItem>


                                        <Divider sx={{ borderStyle: 'dashed' }} />

                                        <MenuItem
                                            onClick={() => {
                                                handleClosePopover();

                                            }}
                                            sx={{ color: 'error.main' }}
                                        >
                                            <Iconify icon="eva:trash-2-outline" />
                                            Xóa
                                        </MenuItem>
                                    </MenuPopover>
                                </>
                        ) : (
                            ''
                            )
                            )}

                    </Stack>
                </Stack>
            </Card>
            <DocumentPreview open={openPreview} onClose={handleClosePreview}/>
        </>);
}
