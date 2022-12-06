import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
// @mui
import {AvatarGroup, Box, Checkbox, Divider, IconButton, MenuItem, Stack, Typography} from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
// utils
import {fData} from '../../../../utils/formatNumber';
import {fDateTime} from '../../../../utils/formatTime';
// components
import Iconify from '../../../../components/iconify';
import {useSnackbar} from '../../../../components/snackbar';
import MenuPopover from '../../../../components/menu-popover';
import FileThumbnail, {fileFormat} from '../../../../components/file-thumbnail';
//
import {FileDetailsDrawer, FileShareDialog} from '../../file';
import DocumentPreview from '../../documents/DocumentPreview';
import {
    deleteDocument,
    deleteUser,
    downloadFile,
    getAllLevel,
    getDocumentById,
    getGradeById,
    getLocalStorage
} from '../../../../dataProvider/agent';
import {dispatch} from 'src/redux/store';
import {getOneDocumentRedux} from 'src/redux/slices/document';
import axios from "axios";
import {createFolderRedux} from "../../../../redux/slices/folder";
import {useSelector} from "react-redux";

// ----------------------------------------------------------------------

FileGeneralRecentCard.propTypes = {
    sx: PropTypes.object,
    file: PropTypes.object,
    onDelete: PropTypes.func,
};

export default function FileGeneralRecentCard({file, onDelete, sx, ...other}) {

    const { getOne } = useSelector((state) => state.document);
    console.log('getone',getOne)

    const {enqueueSnackbar} = useSnackbar();

    const {copy} = useCopyToClipboard();

    const isDesktop = useResponsive('up', 'sm');

    const [openPopover, setOpenPopover] = useState(null);

    const [favorited, setFavorited] = useState(file.isFavorited);

    const [openShare, setOpenShare] = useState(false);

    const [openDetails, setOpenDetails] = useState(false);


    const handleFavorite = () => {
        setFavorited(!favorited);
    };

    const handleOpenShare = () => {
        dispatch(getOneDocumentRedux(file.id));
        setOpenShare(true);
    };

    const handleCloseShare = () => {
        setOpenShare(false);
    };

    const handleOpenDetails = () => {
        dispatch(getOneDocumentRedux(file.id));
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const handleOpenPopover = (event) => {
        dispatch(
            getOneDocumentRedux(file.id)
        );
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleDownloadFile = async (url,params) => {
        try {
            const token = getLocalStorage("access_token");
            axios({
                url: `${url}fileName=${params.fileName}&contentType=${params.contentType}`, //your url
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                if(response.status < 400){
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', params.fileName); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                }else{
                    enqueueSnackbar('Thư mục không còn tồn tại', { variant: 'error' });
                }
            });
        } catch (error) {
            enqueueSnackbar('Thư mục không còn tồn tại', { variant: 'error' });
        }
    };

    const handleDeleteDocument = async (id) => {
        const res = await deleteDocument(id);
        if (res.status < 400) {
            enqueueSnackbar('Xóa tài liệu thành công');
        } else {
            enqueueSnackbar('Xóa tài liệu thất bại', { variant: 'error' });
        }
    };


    const handlePreviewFile = (urlDocument) => {
        window.open(`http://lmms.site:8000/${urlDocument}`, '_blank', 'noopener,noreferrer');
    };

    return (
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
                    },
                    ...(isDesktop && {
                        p: 1.5,
                        borderRadius: 1.5,
                    }),
                    ...sx,
                }}
                {...other}
            >
                <FileThumbnail file={file.typeFile} sx={{ width: 50, height: 50 }} imgSx={{ borderRadius: 1 }} />

                <Stack
                    onClick={handleOpenDetails}
                    sx={{
                        width: 1,
                        flexGrow: {sm: 1},
                        minWidth: {sm: '1px'},
                    }}
                >
                    <Typography variant="subtitle2" noWrap>
                        {file.name}
                    </Typography>

                    <Stack
                        spacing={0.75}
                        direction="row"
                        alignItems="center"
                        sx={{typography: 'caption', color: 'text.disabled', mt: 0.5}}
                    >
                        <Box> {fileFormat(file.typeFile)} </Box>

                    </Stack>
                </Stack>

                {isDesktop && (
                    <AvatarGroup
                        max={4}
                        sx={{
                            mx: 1.5,
                            '& .MuiAvatarGroup-avatar': {
                                width: 24,
                                height: 24,
                                '&:first-of-type': {
                                    fontSize: 12,
                                },
                            },
                        }}
                    >
                        {file?.shared?.map((person) => (
                            <Avatar key={person.id} alt={person.name} src={person.avatar}/>
                        ))}
                    </AvatarGroup>
                )}

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
                    <Checkbox
                        color="warning"
                        icon={<Iconify icon="eva:star-outline"/>}
                        checkedIcon={<Iconify icon="eva:star-fill"/>}
                        checked={favorited}
                        onChange={handleFavorite}
                        sx={{p: 0.75}}
                    />

                    <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill"/>
                    </IconButton>
                </Box>
            </Stack>

            <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{width: 160}}>
                {getOne.typeFile == 'image/jpeg'  && (
                    <MenuItem
                        onClick={() => {
                            handlePreviewFile(getOne.urlDocument);
                        }}
                    >
                        <Iconify icon="eva:link-2-fill"/>
                        Xem trước
                    </MenuItem>
                )}
                { getOne.typeFile == 'image/png' && (
                    <MenuItem
                        onClick={() => {
                            handlePreviewFile(getOne.urlDocument);
                        }}
                    >
                        <Iconify icon="eva:link-2-fill"/>
                        Xem trước
                    </MenuItem>
                )}
                { getOne.typeFile == 'application/pdf' && (
                    <MenuItem
                        onClick={() => {
                            handlePreviewFile(getOne.urlDocument);
                        }}
                    >
                        <Iconify icon="eva:link-2-fill"/>
                        Xem trước
                    </MenuItem>
                )}
                { getOne.typeFile == 'video/mp4' && (
                    <MenuItem
                        onClick={() => {
                            handlePreviewFile(getOne.urlDocument);
                        }}
                    >
                        <Iconify icon="eva:link-2-fill"/>
                        Xem trước
                    </MenuItem>
                )}
                { getOne.typeFile == 'audio/mpeg' && (
                    <MenuItem
                        onClick={() => {
                            handlePreviewFile(getOne.urlDocument);
                        }}
                    >
                        <Iconify icon="eva:link-2-fill"/>
                        Xem trước
                    </MenuItem>
                )}


                <MenuItem
                    onClick={() => {
                        handleClosePopover();
                        handleDownloadFile('http://lmms.site:9090/api/File/downloadFile?',{fileName: getOne.urlDocument, contentType: getOne.typeFile})
                    }}
                >
                    <Iconify icon="eva:download-outline"/>
                    Tải xuống
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleClosePopover();
                        handleOpenShare();
                    }}
                >
                    <Iconify icon="eva:share-fill"/>
                    Chia sẻ
                </MenuItem>

                <Divider sx={{borderStyle: 'dashed'}}/>

                <MenuItem
                    onClick={() => {
                        handleClosePopover();
                        handleDeleteDocument(file.id)
                    }}
                    sx={{color: 'error.main'}}
                >
                    <Iconify icon="eva:trash-2-outline"/>
                    Xóa
                </MenuItem>
            </MenuPopover>

            <FileDetailsDrawer
                data={file}
                favorited={false}
                onFavorite={handleFavorite}
                open={openDetails}
                onClose={handleCloseDetails}
                onDelete={() => {
                    handleCloseDetails();
                    onDelete();
                }}
            />
            {openShare && (
                <FileShareDialog
                    open={openShare}
                    data={file}
                    onClose={() => {
                        handleCloseShare();
                    }}
                />
            )}
        </>
    );
}
