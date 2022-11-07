import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {Button, Grid} from '@material-ui/core';
import {
  getALlSlot,
  getAllTypeDocument,
  postFile,
  postDocument, getAllSubjectInClass,
} from '../../dataProvider/agent';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MainCard from "./MainCard";
import LoadingButton from "@material-ui/lab/LoadingButton";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MultiFileUpload from "./MultifileUpload";
export default function InforDetail() {
  const [value, setValue] = React.useState('');
  const [slot, setSlot] = React.useState([]);
  const [typedocs, settypedocs] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [files, setFiles] = React.useState([]);

  const initDocument = {
    slotId: 0,
    typeDocumentId: 0,
    subjectId: 0,
    code: '',
    name: '',
    link: '',
    description: '',
    size: 0,
    typeFile: '',
    urlDocument: '',
    status: '',
  };

  const [documents, setDocuments] = React.useState(initDocument);
  async function handleSubmitDocument(e) {
    e.preventDefault();
    const res = await postDocument(documents);

    if (res.status < 400) {
      setDocuments(res.data.data);
      console.log('add ok');
    } else {
      console.log('fail');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if await is removed, console log will be called before the uploadFile() is executed completely.
    //since the await is added, this will pause here then console log will be called
    let res = await uploadFile(files);
    console.log(res);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await postFile(formData);
    if (res.status < 400) {
      const fileName = res.data.fileName;
      const contentType = res.data.contentType;
      console.log('upload file success', fileName, contentType);
    } else {
      console.log('fail');
    }
  };

  const handleOnChange = (e) => {
    console.log('handleOnChange', e.target.files[0]);
    setFiles(e.target.files[0]);
  };
  React.useEffect(() => {
    fetchLevel();
    fetchTypeDoc();
    fetchSubject();
  }, []);

  async function fetchLevel() {
    const res = await getALlSlot();
    if (res.status < 400) {
      setSlot(res.data.data);
    } else {
      console.log('error fetch api');
    }
  }
  async function fetchTypeDoc() {
    const res = await getAllTypeDocument();
    if (res.status < 400) {
      settypedocs(res.data.data);
    } else {
      console.log('error fetch api');
    }
  }
  async function fetchSubject() {
    const res = await getAllSubjectInClass({pageIndex:1,pageSize:15});
    if (res.status < 400) {
      setSubject(res.data.data);
    } else {
      console.log('error fetch api');
    }
  }

  return (
      <form>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Stack spacing={2}>
              <MainCard title="Thông tin tài liệu">
                <Stack spacing={2}>
                  <Stack direction='row'>
                    <Typography component='div' variant='h6' sx={{ mt: 3 }}>
                      Mãtàiliệu<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        margin='normal'
                        required
                        size='small'
                        fullWidth
                        label={'Mã'}
                        autoComplete='family-name'
                        autoFocus
                        sx={{ ml: 10 }}
                    />
                  </Stack>
                  <Stack direction='row'>
                    <Typography component='div' variant='h6' sx={{ mt: 3 }}>
                      Têntàiliệu
                    </Typography>
                    <TextField
                        margin='normal'
                        size='small'
                        fullWidth
                        label={'Tên'}
                        autoComplete='family-name'
                        autoFocus
                        sx={{ ml: 10.2}}
                    />
                  </Stack>
                  <Stack direction='row'>
                    <Typography component='div' variant='h6' sx={{ mt: 3 }}>
                      URLTàiliệu
                    </Typography>
                    <TextField
                        margin='normal'
                        size='small'
                        fullWidth
                        label={'URL'}
                        autoComplete='family-name'
                        autoFocus
                        sx={{ ml: 9 }}
                    />
                  </Stack>
                  <Stack direction='row'>
                    <Typography component='div' variant='h6' sx={{ mt: 3 }}>
                      Môtảtàiliệu
                    </Typography>
                    <TextField
                        margin='normal'
                        size='small'
                        fullWidth
                        label={'Mô tả'}
                        autoComplete='family-name'
                        autoFocus
                        sx={{ ml: 8.5 }}
                    />
                  </Stack>
                  <Stack direction='row'>
                    <Typography component='div' variant='h6' sx={{ mt: 3 }}>
                      Địnhdạngtậptin
                    </Typography>
                    <TextField
                        margin='normal'
                        size='small'
                        fullWidth
                        label={'Định dạng'}
                        autoComplete='family-name'
                        autoFocus
                        sx={{ ml: 4.4 }}
                    />
                  </Stack>
                </Stack>
              </MainCard>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Stack spacing={2}>
              <MainCard title="Thông tin cần thiết">
                <Stack direction='row'>
                  <Typography variant='h6' sx={{ mt: 1 }}>
                    Slot<span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl sx={{ ml: 10 }} fullWidth size='small'>
                    <InputLabel id='demo-simple-select-helper-label'>
                      Tiết
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={value}
                        label='SlotId'
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                    >
                      <MenuItem value={'Tất Cả'}>Tất Cả</MenuItem>
                      {slot?.map((l) => (
                          <MenuItem value={l.name} key={l.id}>
                            {l.name}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction='row' sx={{mt:2}}>
                  <Typography variant='h6' sx={{ mt: 1 }}>
                    TypeDoc<span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl sx={{ ml: 5.8 }} fullWidth size='small'>
                    <InputLabel id='demo-simple-select-helper-label'>
                      Loại
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={value}
                        label='Documentype'
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                    >
                      <MenuItem value={'Tất Cả'}>Tất Cả</MenuItem>
                      {typedocs?.map((l) => (
                          <MenuItem value={l.name} key={l.id}>
                            {l.name}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
                <Stack direction='row' sx={{mt:2}}>
                  <Typography variant='h6' sx={{ mt: 1 }}>
                    Subject<span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <FormControl sx={{ ml: 6.8 }} fullWidth size='small'>
                    <InputLabel id='demo-simple-select-helper-label'>
                      Môn học
                    </InputLabel>
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={value}
                        label='Môn học'
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                    >
                       <MenuItem value={'Tất Cả'}>Tất Cả</MenuItem>
                      {subject?.map((s) => (
                        <MenuItem value={s.name} key={s.id}>
                          {s.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
        <MultiFileUpload

        />
      </form>

  );
}
