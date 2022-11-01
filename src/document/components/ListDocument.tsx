import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTER } from '../../Router';
import { Box, Grid } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import { getAllDocument } from '../../dataProvider/agent';
import { toast } from 'react-toastify';
import HeaderListDocument from './HeaderSysllabusDetail';
import { experimentalStyled as styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ListDocument() {
  const [documents, setDocuments] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchAllDocument();
  }, []);
  console.log('data: ', documents);
  async function fetchAllDocument() {
    const res = await getAllDocument();
    // console.log(res.data.data[0].name);
    if (res.status < 400) {
      setDocuments(res.data.data);
    } else {
      toast.error('Error : ' + res.response.status);
    }
  }
  return (
    <>
      <Grid item xs={12} md={12} lg={12} mb={1}>
        <HeaderListDocument />
      </Grid>
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' component='label' size='small'>
          Upload
          <input hidden accept='image/*' multiple type='file' />
        </Button>
      </Box>

      <Grid container spacing={2}>
        {documents?.map((d) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Item>
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                sx={{ maxWidth: 345 }}
              >
                <PictureAsPdfIcon
                  sx={{ fontSize: 50, color: '#00a4fd', marginTop: '20px' }}
                />
                <Typography gutterBottom variant='h5' component='div'>
                  {d.name}.{d.type}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {d.size}
                </Typography>
                <CardActions
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <Button
                    size='large'
                    component={RouterLink}
                    to={ROUTER.ADMIN_DOUCUMENT_SUBJECT_DETAIL}
                  >
                    View
                  </Button>
                  <Button size='large'>Share</Button>
                </CardActions>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
