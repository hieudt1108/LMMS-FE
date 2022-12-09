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
import {dispatch} from "../../../../redux/store";
import {startDownloadFileRedux} from "../../../../redux/slices/document";
import {FileGeneralRecentCard} from "../../general/file";

export default function SysllabusSubject({data, classId, subjectId, docs}) {
    const isDesktop = useResponsive('up', 'sm');
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
                        <Typography variant="body2" sx={{mb:2}}>
                            <Box component="span" sx={{color: 'text.secondary', mr: 0.5}}>
                                Ngày tạo:
                            </Box>
                            {format(new Date(createDate), 'dd/MM/yyyy')}
                        </Typography>

                        {docs?.map((doc) => doc?.slotId === id ? (
                                <Stack spacing={2}>

                                    <FileGeneralRecentCard
                                        key={doc.id}
                                        file={doc}
                                        onDelete={() => console.log('DELETE', doc.id)}
                                    />
                                </Stack>
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
