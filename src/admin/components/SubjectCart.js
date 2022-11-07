import { Grid, Stack, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ROUTER } from '../../Router';
import Card from '@mui/material/Card';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Literature from '../../Assets/SubjectCLass/literature.svg';

const FiCard = styled(Card)(({ theme }) => ({
  width: '380px',
  height: '188px',
  position: 'relative',
}));
const url = '../../Assets/SubjectCLass/literature.svg';

const FiCardContent = styled(CardContent)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'transparent',
  backgroundImage: `url(${
    process.env.PUBLIC_URL + 'src/Assets/SubjectCLass/literature.svg'
  })`,
  height: '70%',
  padding: '0px !important',
}));

const SubjectCart = ({ data }) => {
  console.log(Literature);
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
      <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <FiCard>
            <FiCardContent
              sx={{ color: '#ffffff', backgroundColor: 'rgb(229, 96, 99)' }}
            >
              <Box sx={{ height: '50%', p: 3, position: 'relative' }}>
                <Typography variant='h1'>Ngữ văn</Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: 0,
                    backgroundColor: 'rgba(206,73,76,255)',
                    borderRadius: '5px 0 0 5px',
                    padding: '2px 10px',
                    width: '98px',
                    height: '45px',
                  }}
                >
                  <Stack
                    direction='column'
                    justifyContent='center'
                    alignItems='center'
                    spacing={2}
                    sx={{ width: '100%', height: '100%' }}
                  >
                    <Typography variant='h4'>12</Typography>
                  </Stack>
                </Box>
              </Box>
            </FiCardContent>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={2}
            >
              <Button
                size='large'
                color='primary'
                onClick={() => handleOnClickSubject(1)}
              >
                Tài liệu
              </Button>
              <Button size='large' color='primary'>
                Syllabus
              </Button>
            </Stack>
          </FiCard>
        </Stack>
      </Grid>
    </React.Fragment>
  );
};

export default SubjectCart;
