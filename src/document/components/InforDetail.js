import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@material-ui/core';
import {
  getALlSlot,
  getAllTypeDocument,
  postFile,
  postDocument,
} from '../../dataProvider/agent';
export default function InforDetail() {
  const [value, setValue] = React.useState('');
  const [slot, setSlot] = React.useState([]);
  const [typedocs, settypedocs] = React.useState([]);
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
      console.log('data: ', res);
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
      console.log('ok');
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

  return (
    <>
      <form onSubmit={handleSubmitDocument}>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id='demo-simple-select-helper-label'>SlotId</InputLabel>
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

          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id='demo-simple-select-helper-label'>
              TypeDoc
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
          <FormControl sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id='demo-simple-select-helper-label'>
              Subject Id
            </InputLabel>
            <Select
              labelId='demo-simple-select-helper-label'
              id='demo-simple-select-helper'
              value={value}
              label='Cấp học'
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

          <TextField fullWidth label='code' id='fullWidth' mt={2} />
          <TextField fullWidth label='name' id='fullWidth' mt={2} />
          <TextField fullWidth label='link' id='fullWidth' mt={2} />
          <TextField fullWidth label='description' id='fullWidth' mt={2} />
          <TextField fullWidth label='typeFile' id='fullWidth' mt={2} />
          <div>
            <form onSubmit={handleSubmit}>
              <input type='file' onChange={handleOnChange} />

              <Button type='submit'>Upload File</Button>
            </form>
          </div>
        </Box>
      </form>
    </>
  );
}
