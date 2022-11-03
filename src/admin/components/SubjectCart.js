import { ImageList, ImageListItem, Typography } from '@material-ui/core';
import { Stack } from '@mui/system';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import SubjectImg from '../../Assets/Subjects/subject1.png';
import { ROUTER } from '../../Router';
const SubjectCart = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const handleOnClickSubject = useCallback((subjectId) => {
    navigate(ROUTER.ADMIN_CLASS_DETAIL, {
      state: {
        class_id: 1,
        subject_id: subjectId,
      },
    });
  }, []);
  return (
    <React.Fragment>
      <Stack
        direction='column'
        spacing={1}
        alignItems='center'
        onClick={() => handleOnClickSubject(5)}
      >
        <ImageListItem sx={{ width: '167px', height: '237px' }}>
          <img src={SubjectImg} alt={'subject Image'} loading='lazy' />
        </ImageListItem>
        <Typography variant='h6' gutterBottom>
          đây là tiếng anh 6
        </Typography>
      </Stack>
    </React.Fragment>
  );
};

export default SubjectCart;
