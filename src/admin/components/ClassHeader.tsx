import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  InputBase,
  Stack
} from '@material-ui/core';
import CreateIcon from '@mui/icons-material/Create';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ClassDialog from "./ClassDialog";
import {useNavigate} from "react-router-dom";
import {ROUTER} from "../../Router";


type HeaderProps = {
  title: string;
  description: string;
};


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 'none',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  border: '1px solid #3F435C',
  borderRadius: '12px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 0.6, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const ClassHeader = ({ title, description }: HeaderProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [schoolYear, setSchoolYear] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleChangeSchoolYear = (event: SelectChangeEvent) => {
    setSchoolYear(event.target.value);
  };

  const navigate = useNavigate();

  async function handleAddClass(e: { preventDefault: () => void }) {
    e.preventDefault();
    navigate(ROUTER.ADMIN_ADD_CLASS, { replace: true });
  }

  return (
      <Fragment>
        <Card sx={{boxShadow: '-8px 0 0 -4px lightblue'}}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box marginBottom={2}>
                  <Typography variant="h2" color="GrayText">
                    Danh sách lớp học
                  </Typography>
                </Box>
                <Stack direction="row">
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Tìm kiếm người dùng"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>

                  <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">Khối</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        label="Khối"
                        onChange={handleChange}
                    >
                      <MenuItem value={10}>Khối 1</MenuItem>
                      <MenuItem value={20}>Khối 2</MenuItem>
                      <MenuItem value={30}>Khối 3</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ minWidth: 150, ml:1 }} size="small">
                    <InputLabel id="demo-simple-select-helper-label">Niên khóa</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={schoolYear}
                        label="Niên khóa"
                        onChange={handleChangeSchoolYear}
                    >
                      <MenuItem value={10}>2021 - 2022</MenuItem>
                      <MenuItem value={20}>2022 - 2023</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
              <Grid style={{ placeSelf: 'flex-end' }} sx={{mt:5}} item xs={12} md={6}>
                <Grid container justifyContent="flex-end">
                  <Button className="button" startIcon={<CreateIcon fontSize="small" />} onClick={() => handleClickOpen()}>
                    Tạo lớp học
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {open && (
            <ClassDialog
                onClose={handleClose}
                open={open}
            />
        )}
      </Fragment>

  );
};

export default ClassHeader;
