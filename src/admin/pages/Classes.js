import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Grid } from '@mui/material';
import ClassCart from '../components/ClassCart';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
  getAllClass,
  getAllGrade,
  getAllProgram,
} from '../../dataProvider/agent';

import ClassHeader from '../components/ClassHeader';

const Classes = () => {
  const { t } = useTranslation();
  const [pagingClass, setPagingClass] = React.useState({
    pageIndex: 1,
    pageSize: 6,
    searchByName: '',
    gradeId: '',
    programId: '',
  });
  const [createClass, setCreateClass] = React.useState({
    code: '',
    name: '',
    gradeId: '',
    programId: '',
    size: '',
    schoolYear: '',
    userClass: [],
    grade: {},
    program: {},
    teacher: [],
  });
  const [classObj, setClassObj] = React.useState([]);
  const [grades, setGrades] = React.useState([]);
  const [programs, setPrograms] = React.useState([]);
  const [grade, setGrade] = React.useState('');
  const [program, setProgram] = React.useState('');

  const handleGradeChange = useCallback(
    async (event, value) => {
      let response = await getAllClass({
        ...pagingClass,
        gradeId: value.props.value.id,
      });
      setClassObj(response.data.data);
      setPagingClass({ ...pagingClass, gradeId: value.props.value.id });
      setGrade(value.props.value);
    },
    [pagingClass]
  );

  const handleProgramChange = useCallback(
    async (event, value) => {
      console.log('handleProgramChange', value, pagingClass);
      let response = await getAllClass({
        ...pagingClass,
        programId: value.props.value.id,
      });
      setClassObj(response.data.data);
      setPagingClass({ ...pagingClass, programId: value.props.value.id });
      setProgram(value.props.value);
    },
    [pagingClass]
  );

  const handleSearchChange = useCallback(
    async (event, value) => {
      let response = await getAllClass({
        ...pagingClass,
        searchByName: event.target.value,
      });
      setClassObj(response.data.data);
      setPagingClass({ ...pagingClass, searchByName: event.target.value });
    },
    [pagingClass]
  );

  const handlePageChange = useCallback(
    async (event, pageIndex) => {
      let response = await getAllClass({
        ...pagingClass,
        pageIndex: pageIndex,
      });
      setClassObj(response.data.data);
      setPagingClass({ ...pagingClass, pageIndex: pageIndex });
    },
    [createClass]
  );

  const handleCreateClassChange = useCallback(
    (event) => {
      setCreateClass({
        ...createClass,
        [event.target.name]: event.target.value,
      });
    },
    [createClass]
  );
  const handleSubmitCreateClass = useCallback(
    (event, value) => {
      console.log('handleSubmitCreateClass :', createClass);
    },
    [createClass]
  );

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await Promise.all([
        getAllClass(pagingClass),
        getAllGrade({ pageIndex: 1, pageSize: 15 }),
        getAllProgram({ pageIndex: 1, pageSize: 15 }),
      ]);
      setClassObj(response[0].data.data);
      setGrades(response[1].data.data);
      setPrograms(response[2].data.data);
    }

    fetchMyAPI();
  }, []);

  return (
    <React.Fragment>
      <ClassHeader
        createClass={createClass}
        grades={grades}
        programs={programs}
        grade={grade}
        program={program}
        handleGradeChange={handleGradeChange}
        handleProgramChange={handleProgramChange}
        handleSearchChange={handleSearchChange}
        handleCreateClassChange={handleCreateClassChange}
        handleSubmitCreateClass={handleSubmitCreateClass}
      />
      <Grid mt={2.5} container spacing={2}>
        {classObj && classObj.length ? (
          classObj.map((obj, index) => (
            <ClassCart key={index} data={obj}></ClassCart>
          ))
        ) : (
          <Alert severity='error'>This is an error !</Alert>
        )}
      </Grid>

      <Stack
        spacing={2}
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        mt={2}
      >
        <Pagination
          size='large'
          count={100}
          rowsperpage={pagingClass.pageSize}
          onChange={handlePageChange}
          color='primary'
        />
      </Stack>
    </React.Fragment>
  );
};

export default Classes;
