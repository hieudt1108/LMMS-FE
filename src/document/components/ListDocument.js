import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTER } from '../../Router';

export default function ListDocument(document) {
  const { name, type, size } = document;
  return (
    <>
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
          {name}.{type}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {size}
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
    </>
  );
}
