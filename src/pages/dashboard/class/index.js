// next
import React, { useCallback, useEffect } from 'react';
import { useSettingsContext } from '../../../components/settings';
import { alpha } from '@mui/material/styles';
import {
  Alert,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import { ClassBanner } from '../../../sections/@dashboard/class';
import DashboardLayout from '../../../layouts/dashboard';
import { getAllClass } from 'src/dataProvider/agent';
import { AppFeatured, AppWelcome } from 'src/sections/@dashboard/general/app';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appFeatured } from 'src/_mock/arrays';
import Iconify from 'src/components/iconify';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { getClassesRedux } from 'src/redux/slices/class';
import { getProgramsRedux } from 'src/redux/slices/program';
import { getGradesRedux } from 'src/redux/slices/grade';

Classes.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function Classes() {
  const dispatch = useDispatch();

  const { classes } = useSelector((state) => state.class);
  const { programs } = useSelector((state) => state.program);
  const { grades } = useSelector((state) => state.grade);
  console.log('Classes', classes);

  const [pagingClass, setPagingClass] = React.useState({
    pageIndex: 1,
    pageSize: 8,
    searchByName: '',
    gradeId: '',
    programId: '',
  });

  const [grade, setGrade] = React.useState('');
  const [program, setProgram] = React.useState('');

  useEffect(() => {
    dispatch(getClassesRedux(pagingClass));
    dispatch(getProgramsRedux({ pageIndex: 1, pageSize: 15 }));
    dispatch(getGradesRedux({ pageIndex: 1, pageSize: 15 }));
  }, [dispatch]);

  const renderMenuItem = useCallback((item) => {
    if (item && item.length) {
      return item.map((obj, index) => (
        <MenuItem value={obj} key={index}>
          {obj.name}
        </MenuItem>
      ));
    }
    return (
      <MenuItem>
        <Alert severity="error">This is an error !</Alert>
      </MenuItem>
    );
  });

  const handleGradeChange = useCallback(
    async (event, value) => {
      setPagingClass({ ...pagingClass, gradeId: value.props.value.id });
      setGrade(value.props.value);
      dispatch(getClassesRedux({ ...pagingClass, gradeId: value.props.value.id }));
    },
    [pagingClass]
  );
  const handleProgramChange = useCallback(
    (event, value) => {
      setPagingClass({ ...pagingClass, programId: value.props.value.id });
      setProgram(value.props.value);
      dispatch(getClassesRedux({ ...pagingClass, programId: value.props.value.id }));
    },
    [pagingClass]
  );

  const handleSearchChange = useCallback(
    (event, value) => {
      setPagingClass({ ...pagingClass, searchByName: event.target.value });
      dispatch(
        getClassesRedux({
          ...pagingClass,
          searchByName: event.target.value,
        })
      );
    },
    [pagingClass]
  );

  const handlePageChange = useCallback(async (event, pageIndex) => {
    let response = await getAllClass({
      ...pagingClass,
      pageIndex: pageIndex,
    });
    setPagingClass({ ...pagingClass, pageIndex: pageIndex });
    dispatch(
      getClassesRedux({
        ...pagingClass,
        pageIndex: pageIndex,
      })
    );
  }, []);

  const { themeStretch } = useSettingsContext();
  return (
    <React.Fragment>
      <Head>
        <title> Class: List ALl Class</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={`Lớp học của bạn!`}
              description="Tiên học lễ, hậu học văn"
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">Thêm lớp</Button>}
            />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid> */}

          <Grid item xs={12}>
            <Stack direction="row">
              <TextField
                size="small"
                sx={{ mr: 1 }}
                autoHighlight
                onChange={handleSearchChange}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-helper-label">Khối</InputLabel>
                <Select id="demo-simple-select-helper" value={grade} label="Khối" onChange={handleGradeChange}>
                  {renderMenuItem(grades)}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 175, ml: 1 }} size="small">
                <InputLabel id="demo-simple-select-helper-label">Chương trình Học</InputLabel>
                <Select
                  id="demo-simple-select-helper"
                  value={program}
                  label="Chương trình Học"
                  onChange={handleProgramChange}
                >
                  {renderMenuItem(programs)}
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          {classes && classes.length ? (
            classes.map((obj, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ClassBanner data={obj} title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
              </Grid>
            ))
          ) : (
            <Alert severity="error">This is an error !</Alert>
          )}
        </Grid>
        <Grid item xs={12} justifyContent="flex-end">
          <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="center" mt={2}>
            <Pagination
              size="large"
              count={100}
              rowsperpage={pagingClass.pageSize}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

// Classes.getInitialProps = async (ctx) => {
//   let response = await Promise.all([
//     getAllClass({
//       pageIndex: 1,
//       pageSize: 8,
//       searchByName: '',
//       gradeId: '',
//       programId: '',
//     }),
//     getAllGrade({ pageIndex: 1, pageSize: 15 }),
//     getAllProgram({ pageIndex: 1, pageSize: 15 }),
//   ]);
//   console.log('Classes.getInitialProps', ctx, response);
//   return { data: response };
// };

// let Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: 'none',
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(1),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: 0,
//     width: 'auto',
//   },
// }));

// let SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// let StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   border: '1px solid #3F435C',
//   borderRadius: '12px',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 0.6, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '30ch',
//     },
//   },
// }));
