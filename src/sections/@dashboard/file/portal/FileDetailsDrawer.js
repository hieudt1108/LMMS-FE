import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Chip,
  List,
  Stack,
  Drawer,
  Button,
  Divider,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  MenuItem,
} from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
import { fDateTime } from '../../../../utils/formatTime';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import FileThumbnail, { fileFormat } from '../../../../components/file-thumbnail';
//
import FileShareDialog from './FileShareDialog';
import FileInvitedItem from '../FileInvitedItem';
import { getAllLevel, getDocumentById, getProgramById, getSubjectById } from '../../../../dataProvider/agent';
import { RHFSelect } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

FileDetailsDrawer.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  favorited: PropTypes.bool,
  onFavorite: PropTypes.func,
};

export default function FileDetailsDrawer({
  item,
  open,
  favorited,
  //
  onFavorite,
  onClose,
  onDelete,
  ...other
}) {
  const { shared } = item;

  const hasShared = shared && !!shared.length;

  const [openShare, setOpenShare] = useState(false);

  const [toggleTags, setToggleTags] = useState(true);

  const [inviteEmail, setInviteEmail] = useState('');

  const [tags, setTags] = useState('');

  const [toggleProperties, setToggleProperties] = useState(true);

  const [toggleCategories, setToggleCategories] = useState(true);

  const [documentData, setDocumentData] = useState([]);

  const [subjectData, setSubjectData] = useState([]);

  const [programData, setProgramData] = useState([]);
  useEffect(() => {
    fetchDocumentProgramSubject();
  }, []);

  async function fetchDocumentProgramSubject() {
    try {
      const resDocument = await getDocumentById(item.id);
      const resSubject = await getSubjectById(resDocument.data.data.subjectId);
      const resProgram = await getProgramById(resDocument.data.data.programId);
      setDocumentData(resDocument.data.data);
      setSubjectData(resSubject.data.data);
      setProgramData(resProgram.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleToggleProperties = () => {
    setToggleProperties(!toggleProperties);
  };

  const handleToggleCategories = () => {
    setToggleCategories(!toggleCategories);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleChangeInvite = (event) => {
    setInviteEmail(event.target.value);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: 370 },
        }}
        {...other}
      >
        <Scrollbar sx={{ height: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="h6"> Thông tin chi tiết </Typography>

            <Checkbox
              color="warning"
              icon={<Iconify icon="eva:star-outline" />}
              checkedIcon={<Iconify icon="eva:star-fill" />}
              checked={favorited}
              onChange={onFavorite}
              sx={{ p: 0.75 }}
            />
          </Stack>

          <Stack spacing={2.5} justifyContent="center" sx={{ p: 2.5, bgcolor: 'background.neutral' }}>
            <FileThumbnail file={documentData.urlDocument} sx={{ width: 64, height: 64 }} imgSx={{ borderRadius: 1 }} />

            <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
              {`Tài liệu: ${documentData.name}`}
            </Typography>

            <Typography variant="h7" sx={{ wordBreak: 'break-all' }}>
              {`Tệp đính kèm: ${documentData.urlDocument}`}
            </Typography>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack spacing={1.5}>
              <Panel label="Danh mục" toggle={toggleCategories} onToggle={handleToggleCategories} />

              {toggleCategories && (
                <>
                  <Stack spacing={1.5}>
                    <Row label="Chương trình học" value={programData.name} />

                    <Row label="Môn học" value={subjectData.name} />
                  </Stack>
                </>
              )}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack spacing={1.5}>
              <Panel label="Thuộc tính" toggle={toggleProperties} onToggle={handleToggleProperties} />

              {toggleProperties && (
                <>
                  <Stack spacing={1.5}>
                    <Row label="Kích thước" value={fData(documentData.size)} />

                    <Row label="Ngày tạo" value={fDateTime(documentData.createDate)} />

                    <Row label="Loại" value={fileFormat(documentData.typeFile)} />
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="subtitle2"> Được chia sẻ với </Typography>
          </Stack>

          {hasShared && (
            <List disablePadding sx={{ pl: 2.5, pr: 1 }}>
              {shared.map((person) => (
                <FileInvitedItem key={person.id} person={person} />
              ))}
            </List>
          )}
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Button
            fullWidth
            variant="soft"
            color="error"
            size="large"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={onDelete}
          >
            Thoát
          </Button>
        </Box>
      </Drawer>

      <FileShareDialog
        open={openShare}
        shared={shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onClose={() => {
          handleCloseShare();
          setInviteEmail('');
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

Panel.propTypes = {
  toggle: PropTypes.bool,
  label: PropTypes.string,
  onToggle: PropTypes.func,
};

function Panel({ label, toggle, onToggle, ...other }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...other}>
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify icon={toggle ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

Row.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

function Row({ label, value = '' }) {
  return (
    <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
      <Box component="span" sx={{ width: 120, color: 'text.secondary', mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
