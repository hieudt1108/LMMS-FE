import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Chip, FormControlLabel, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import FormProvider, { RHFAutocomplete, RHFRadioGroup, RHFTextField } from '../../../../components/hook-form';
// API
import { getALlRoles, getAllSubject } from '../../../../dataProvider/agent';

export default function ClassAddStudentForm({ isEdit = false }) {
  // const {
  //   reset,
  //   watch,
  //   control,
  //   setValue,
  //   getValues,
  //   handleSubmit,
  //   formState: { isSubmitting, errors },
  // } = methods;

  const [userRole, setUserRole] = useState([]);
  const [userSubjects, setUserSubjects] = useState([]);
  const [role, setRole] = useState([]);

  async function fetchRoles() {
    const res = await getALlRoles({ pageIndex: 1, pageSize: 10 });
    if (res.status < 400) {
      const transformData = res.data.data.map((tag) => {
        return {
          label: tag.name,
          id: tag.id,
        };
      });
      setUserRole(transformData);
    } else {
      console.log('error fetch api');
    }
  }
  useEffect(() => {
    fetchRoles();
    fetchSubject();
  }, []);

  async function fetchSubject() {
    const res = await getAllSubject({ pageIndex: 1, pageSize: 100 });
    if (res.status < 400) {
      const transformDataSubject = res.data.data.map((su) => {
        return {
          label: su.name,
          id: su.id,
        };
      });

      setUserSubjects(transformDataSubject);
    } else {
      console.log('error fetch api');
    }
  }
  return (
    <FormProvider>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
              Cài đặt tài khoản
            </Typography>
            {/*             
            <RHFAutocomplete
              name="roleID"
              multiple
              onChange={(event, newValue) => {
                setValue('roleID', newValue);
                const tagsId = newValue.map((tag) => tag.id);
                setValue('tagsId', tagsId);
                setRole(tagsId);
                if (!getValues('tagsId').includes(11)) {
                  setValue('subjectId', []);
                }
              }}
              options={userRole}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
                ))
              }
              renderInput={(params) => <TextField label="Vai trò" {...params} />}
            /> */}

            <RHFAutocomplete
              // name="subjectId"
              multiple
              // onChange={(event, newValue) => {
              //   setValue('subjectId', newValue);
              //   // const suId = newValue.map((su) => su.id);
              //   // setValue('suId', suId);
              // }}
              // disabled={getValues('tagsId').includes(11) ? false : true}
              options={userSubjects}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={index} size="small" label={option.label} />
                ))
              }
              renderInput={(params) => <TextField label="Môn dạy" {...params} />}
            />
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
