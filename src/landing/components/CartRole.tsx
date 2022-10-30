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
      <Card sx={{ maxWidth: 400,':hover': {boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',transition:'transform 150ms', transform: 'translateY(-10px)'}}} >
        <CardActionArea
          onClick={() => {
            navigate("/admin");
          }}
        >
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
