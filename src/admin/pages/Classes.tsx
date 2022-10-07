import React from "react";
import { useTranslation } from "react-i18next";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import { Grid } from "@mui/material";
import ClassCart from "../components/ClassCart";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { ClassSelect } from "../components/ClassSelect";



const Classes = () => {

  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState<number | string>('');

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };


  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title={t("classes.title")} />
      </AdminAppBar>

      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Button variant="outlined" onClick={handleClickOpen}>{t("classes.create")}</Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                <Select
                  native
                  value={age}
                  onChange={handleChange}
                  input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={age}
                  onChange={handleChange}
                  input={<OutlinedInput label="Age" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          mt={2}
        >
          <ClassSelect></ClassSelect>
          <ClassSelect></ClassSelect>
          <ClassSelect></ClassSelect>
        </Stack>
      </Stack>

      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        mt={2}
      >
        <Grid container spacing={2}>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
          <ClassCart></ClassCart>
        </Grid>

      </Stack>

      <Stack
        spacing={2}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        mt={2}
      >
        <Pagination count={10} color="secondary" size="large" />
      </Stack>
    </React.Fragment>
  );
};

export default Classes;
