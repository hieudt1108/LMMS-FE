import * as React from 'react';
import Box from '@mui/material/Box';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FolderIcon from '@mui/icons-material/Folder';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { getAllDocument } from '../../dataProvider/agent';
import { toast } from 'react-toastify';

export default function Document() {
  const [documents, setDocuments] = React.useState([]);

  //const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    fetchAllDocument();
  }, []);
  console.log('data: ', documents);
  async function fetchAllDocument() {
    const res = await getAllDocument();
    console.log(documents);
    if (res.status < 400) {
      setDocuments(res.data.data);
    } else {
      toast.error('Error : ' + res.response.status);
    }
  }
  const [value, setValue] = React.useState('');
  return (
    <React.Fragment>
      <Box sx={{ background: '#fff', borderRadius: '12px' }}>
        <Box
          sx={{
            borderBottom: '1px solid #EEEEEE',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
          p={2}
        >
          <FilterAltOutlinedIcon color='primary' />
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id='demo-simple-select-helper-label'>Lớp</InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={value}
              label='class'
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <MenuItem value={'Tất Cả'}>Tất cả</MenuItem>
              <MenuItem value={value}>Lớp 1</MenuItem>
              <MenuItem value={value}>Lớp 2</MenuItem>
              <MenuItem value={value}>Lớp 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id='demo-simple-select-helper-label'>
              Chương trình học
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={value}
              label='class'
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <MenuItem value={'Tất Cả'}>Tất cả</MenuItem>
              <MenuItem value={value}>Hệ thường</MenuItem>
              <MenuItem value={value}>Song ngữ</MenuItem>
              <MenuItem value={value}>Chất lượng cao</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id='demo-simple-select-helper-label'>
              Môn học
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={value}
              label='class'
              onChange={(e) => {
                setValue(e.target.value);
              }}
            >
              <MenuItem value={'Tất Cả'}>Tất cả</MenuItem>
              <MenuItem value={value}>Toán</MenuItem>
              <MenuItem value={value}>Lý</MenuItem>
              <MenuItem value={value}>Hoá</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box p={2}>
          <Typography variant='h4' gutterBottom>
            Tài liệu tổng hợp
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }} p={3}>
          <Grid container spacing={3}>
            {documents.length === 0 ? (
              <Grid item xs={12} md={12}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert onClose={() => {}} severity='warning'>
                    Tài liệu trống
                  </Alert>
                </Stack>
              </Grid>
            ) : (
              <>
                {' '}
                {documents?.map((document) => (
                  <Grid item xs={6} md={3}>
                    <Card sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box ml={2}>
                        <FolderIcon
                          fontSize='large'
                          style={{ color: '#E6CB1C' }}
                        />
                      </Box>

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                          <Typography component='div' variant='h6'>
                            {document.name}.{document.type}
                          </Typography>
                          <Typography
                            variant='subtitle1'
                            color='text.secondary'
                            component='div'
                          >
                            Author: Tien Manh
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}