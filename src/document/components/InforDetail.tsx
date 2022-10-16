import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { Link as RouterLink } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function InforDetail() {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={8} md={9} lg={9}>
          <Item>View document</Item>
        </Grid>
        <Grid item xs={4} md={3} lg={3}>
          <Item>
            {' '}
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                // alignItems: "center",
              }}
            >
              <Typography variant='h4' margin={4} marginTop={2}>
                Lecture_7_p2.ppt
              </Typography>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Author</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>Filesize</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Downloads:
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Uploaded:{' '}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Permissions:{' '}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>Sharing: </Typography>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'left',
                  }}
                >
                  <Typography>Minh Quang</Typography>
                  <Typography>968.00kb</Typography>
                  <Typography>9</Typography>
                  <Typography>22/09/2022 16:42:09 </Typography>
                  <Typography>View & Dowload</Typography>
                  <Typography>Public File - Can be Shared</Typography>
                </Box>
              </Box>

              <CardActions
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <Button
                  size='large'
                  component={RouterLink}
                  to={`/${process.env.PUBLIC_URL}/admin/document/math/1`}
                >
                  Edit
                </Button>
                <Button size='large'>Download</Button>
              </CardActions>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
