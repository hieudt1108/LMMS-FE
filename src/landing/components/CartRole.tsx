import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ROUTER } from '../../Router';
import { useNavigate } from 'react-router';

interface CartRoleProps {
  item?: {
    img: string;
    title: string;
  };
}

const CartRole = (props: CartRoleProps) => {
  const navigate = useNavigate();
  const { item } = props;
  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 400 }}>
        <CardActionArea
          onClick={() => {
            navigate("/admin");
          }}
        >
          {/* <CardMedia
            component='img'
            height='140'
            image='/static/images/cards/contemplative-reptile.jpg'
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Lizard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent> */}

          <ImageListItem key={item?.img}>
            <img
              src={`${item?.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item?.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item?.title}
              loading='lazy'
            />
            <ImageListItemBar
              title={item?.title}
              subtitle={'Thong Chu ne'}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item?.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </CardActionArea>
      </Card>
    </React.Fragment>
  );
};

export default CartRole;
