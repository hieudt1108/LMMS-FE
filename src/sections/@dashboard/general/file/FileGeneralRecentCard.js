import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { AvatarGroup, Box, Button, Checkbox, Divider, IconButton, MenuItem, Stack, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard';
// utils
import { fData } from '../../../../utils/formatNumber';
import { fDateTime } from '../../../../utils/formatTime';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
import MenuPopover from '../../../../components/menu-popover';
import FileThumbnail, { fileFormat } from '../../../../components/file-thumbnail';
// POPup
import PopupGetFolder from '../getFiletoDocPrivate/PopupGetFolder';
import { FileDetailsDrawer, FileShareDialog } from '../../file';
import DocumentPreview from '../../documents/DocumentPreview';
import {
  deleteDocument,
  deleteUser,
  downloadFile,
  getAllLevel,
  getDocumentById,
  getGradeById,
  getLocalStorage,
} from '../../../../dataProvider/agent';
import { dispatch } from 'src/redux/store';
import { getOneDocumentRedux } from 'src/redux/slices/document';
import axios from 'axios';
import { createFolderRedux } from '../../../../redux/slices/folder';
import { useSelector } from 'react-redux';
import ConfirmDialog from 'src/components/confirm-dialog';

// ----------------------------------------------------------------------

// FileGeneralRecentCard.propTypes = {
//   sx: PropTypes.object,
//   file: PropTypes.object,
//   onDelete: PropTypes.func,
// };

export default function FileGeneralRecentCard({ dataGeneralFolder, file, onDelete, sx, ...other }) {
  const { enqueueSnackbar } = useSnackbar();
  const { getOne } = useSelector((state) => state.document);

  const { copy } = useCopyToClipboard();

  const isDesktop = useResponsive('up', 'sm');

  const [openPopover, setOpenPopover] = useState(null);

  const [favorite, setFavorite] = useState(file.isFavorite);

  const [openShare, setOpenShare] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [documentData, setDocumentData] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openFrom, setOpenFrom] = useState(false);

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };

  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

  useEffect(() => {
    fetchDocument();
  }, []);

  async function fetchDocument() {
    const res = await getDocumentById(file.id);
    if (res.status < 400) {
      //   console.log('download', res);
      setDocumentData(res.data.data);
    } else {
      console.log('error');
    }
  }

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleOpenShare = () => {
    dispatch(getOneDocumentRedux(file.id));
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleOpenDetails = () => {
    if (dataGeneralFolder) {
      setOpenConfirm(true);
      return;
    }
    dispatch(getOneDocumentRedux(file.id));
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDownloadFile = async (url, params) => {
    try {
      const token = getLocalStorage('access_token');
      axios({
        url: `${url}fileName=${params.fileName}&contentType=${params.contentType}`, //your url
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        if (response.status < 400) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', params.fileName); //or any other extension
          document.body.appendChild(link);
          link.click();
        } else {
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
      window.location.reload();
    } else {
      enqueueSnackbar('Xóa tài liệu thất bại', { variant: 'error' });
    }
  };

  const handlePreviewFile = (urlDocument) => {
    window.open(`http://lmms.site:8000/${urlDocument}`, '_blank', 'noopener,noreferrer');
  };

  const [openPreview, setOpenPreview] = useState(false);

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
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
            cursor: 'pointer',
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
            flexGrow: { sm: 1 },
            minWidth: { sm: '1px' },
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {file.name}
          </Typography>

          <Stack
            spacing={0.75}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled', mt: 0.5 }}
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
              <Avatar key={person.id} alt={person.name} src={person.avatar} />
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
            icon={<Iconify icon="eva:star-outline" />}
            checkedIcon={<Iconify icon="eva:star-fill" />}
            checked={favorite}
            onChange={handleFavorite}
            sx={{ p: 0.75 }}
          />

          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Stack>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 220 }}>
        {documentData.typeFile == 'image/jpeg' && (
          <MenuItem
            onClick={() => {
              handlePreviewFile(documentData.urlDocument);
            }}
          >
            <Iconify icon="eva:link-2-fill" />
            Xem trước
          </MenuItem>
        )}
        {documentData.typeFile == 'image/png' && (
          <MenuItem
            onClick={() => {
              handlePreviewFile(documentData.urlDocument);
            }}
          >
            <Iconify icon="eva:link-2-fill" />
            Xem trước
          </MenuItem>
        )}
        {documentData.typeFile == 'application/pdf' && (
          <MenuItem
            onClick={() => {
              handlePreviewFile(documentData.urlDocument);
            }}
          >
            <Iconify icon="eva:link-2-fill" />
            Xem trước
          </MenuItem>
        )}
        {documentData.typeFile == 'video/mp4' && (
          <MenuItem
            onClick={() => {
              handlePreviewFile(documentData.urlDocument);
            }}
          >
            <Iconify icon="eva:link-2-fill" />
            Xem trước
          </MenuItem>
        )}
        {documentData.typeFile == 'audio/mpeg' && (
          <MenuItem
            onClick={() => {
              handlePreviewFile(documentData.urlDocument);
            }}
          >
            <Iconify icon="eva:link-2-fill" />
            Xem trước
          </MenuItem>
        )}

        <MenuItem onClick={handleOpenFrom}>
          <Iconify icon="eva:link-2-fill" />
          Thêm vào tài liệu của tôi
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleDownloadFile('http://lmms.site:9090/api/File/downloadFile?', {
              fileName: documentData.urlDocument,
              contentType: documentData.typeFile,
            });
          }}
        >
          <Iconify icon="eva:download-outline" />
          Tải xuống
        </MenuItem>

        {!dataGeneralFolder && (
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleOpenShare();
            }}
          >
            <Iconify icon="eva:share-fill" />
            Chia sẻ
          </MenuItem>
        )}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleClosePopover();
            handleDeleteDocument(file.id);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Xóa
        </MenuItem>
      </MenuPopover>

      <PopupGetFolder open={openFrom} onClose={handleCloseFrom} />

      <FileDetailsDrawer
        data={file}
        favorite={false}
        onFavorite={handleFavorite}
        open={openDetails}
        onClose={handleCloseDetails}
      />
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Xóa"
        content={<>Bạn có chắc chắn muốn thêm tài liệu ?</>}
        action={
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dataGeneralFolder.handleUploadDocumentToStoreFolder(file.id);
              handleCloseConfirm();
            }}
          >
            Thêm tài liệu
          </Button>
        }
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
