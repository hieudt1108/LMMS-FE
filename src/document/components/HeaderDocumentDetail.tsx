import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

//Subject img
import Math from "../../Assets/Subjects/mathLogo.png";
import ClassHeader from "../../admin/components/ClassHeader";

type HeaderProps = {
  title: string;
};

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const HeaderDocumentDetail = ({title}: HeaderProps) => {
  return (
      <React.Fragment>
        <Card sx={{boxShadow: '-8px 0 0 -4px #747af2', mb: 2}}>
          <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
          >
            <Box>
              <Typography component="div" variant="h4">
                {title}
              </Typography>
            </Box>

          </CardContent>
        </Card>
      </React.Fragment>
  );
}

export default HeaderDocumentDetail;
