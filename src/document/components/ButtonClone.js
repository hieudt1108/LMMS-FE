import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { postFile } from '../../dataProvider/agent';
import { Button } from '@material-ui/core';
function ButtonClone() {
  const [files, setFiles] = React.useState([]);

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

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleOnChange} />

        <Button type='submit'>Upload File</Button>
      </form>
    </React.Fragment>
  );
}

export default ButtonClone;
