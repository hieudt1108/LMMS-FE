import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import HeaderDocumentDetail from '../components/HeaderDocumentDetail';
import DetailDoc from '../components/DetailDoc';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ViewDocumentDetail() {
  const { t } = useTranslation();
  const [selectedDocs, setSelectedDocs] = React.useState<File[]>([]);

  const docs = [
    { uri: require('./Lab-1_OPD_Fall2022.pdf') },
    // { uri: require('../../../public/test.pdf') },
  ];

  return (
    <React.Fragment>
      <HeaderDocumentDetail title={'Tài liệu Tiếng Anh Nâng Cao 1'} />
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Item style={{ height: '900px' }}>
              <input
                type='file'
                accept='.pdf'
                multiple
                onChange={(el) =>
                  el.target.files?.length &&
                  setSelectedDocs(Array.from(el.target.files))
                }
              />
              <DocViewer
                documents={selectedDocs.map((file) => ({
                  uri: window.URL.createObjectURL(file),
                  fileName: file.name,
                }))}
                pluginRenderers={DocViewerRenderers}
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item>
              <DetailDoc />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
