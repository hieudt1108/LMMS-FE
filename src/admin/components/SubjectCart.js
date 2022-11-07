import { Grid, Stack, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ROUTER } from '../../Router';
import Card from '@mui/material/Card';
import Box from '@material-ui/core/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import biology from '../../Assets/SubjectCLass/biology.svg';
import chemistry from '../../Assets/SubjectCLass/chemistry.svg';
import economicLegal from '../../Assets/SubjectCLass/economic-legal.svg';
import history from '../../Assets/SubjectCLass/history.svg';
import literature from '../../Assets/SubjectCLass/literature.svg';
import math from '../../Assets/SubjectCLass/math.svg';
import physics from '../../Assets/SubjectCLass/physics.svg';
import english from '../../Assets/SubjectCLass/english.svg';

const subjects = {
  literature: {
    backgroundColor: '#e56063',
    backgroundColorRight: '#ce494c',
    sgv: literature,
  },
  biology: {
    backgroundColor: '#e77c3e',
    backgroundColorRight: '#dc570a',
    sgv: biology,
  },
  chemistry: {
    backgroundColor: '#f0ab03',
    backgroundColorRight: '#d79802',
    sgv: chemistry,
  },
  'economic-legal': {
    backgroundColor: '#39a65a',
    backgroundColorRight: '#47bd6b',
    sgv: economicLegal,
  },
  history: {
    backgroundColor: '#8dc63f',
    backgroundColorRight: '#70a922',
    sgv: history,
  },
  literature: {
    backgroundColor: '#b4c937',
    backgroundColorRight: '#99ad21',
    sgv: literature,
  },
  math: {
    backgroundColor: '#00548b',
    backgroundColorRight: '#1c8ad1',
    sgv: math,
  },
  physics: {
    backgroundColor: '#46b1e5',
    backgroundColorRight: '#248fc3',
    sgv: physics,
  },
  english: {
    backgroundColor: '#4acbfc',
    backgroundColorRight: '#26b1e5',
    sgv: english,
  },
};

const FiCard = styled(Card)(({ theme }) => ({
  width: '380px',
  height: '188px',
  position: 'relative',
}));

const SubjectCart = ({ data }) => {
  const navigate = useNavigate();
  let location = useLocation();
  const handleOnClickSubject = useCallback((router, state) => {
    navigate(router, {
      state,
    });
  }, []);
  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <FiCard>
            <CardContent
              sx={{
                color: '#ffffff',
                backgroundColor: subjects[data.code].backgroundColor,
                position: 'relative',
                backgroundImage: `url(${subjects[data.code].sgv})`,
                height: '70%',
                padding: '0px !important',
              }}
            >
              <Box sx={{ height: '50%', p: 3, position: 'relative' }}>
                <Typography variant='h1'>{data.name}</Typography>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '10px',
                    right: 0,
                    backgroundColor: subjects[data.code].backgroundColorRight,
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
            </CardContent>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={2}
            >
              <Button
                size='large'
                color='primary'
                onClick={() =>
                  handleOnClickSubject(ROUTER.ADMIN_CLASS_DETAIL, {
                    class_id: 1,
                    subject_id: 1,
                  })
                }
              >
                Tài liệu
              </Button>
              <Button
                size='large'
                color='primary'
                onClick={() => handleOnClickSubject(ROUTER.ADMIN_DOCUMENT, {})}
              >
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
