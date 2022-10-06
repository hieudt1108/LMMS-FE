import Button from '@mui/material/Button';
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {User} from "../types/user";
import Grid from "@material-ui/core/Grid";
import DialogContentText from "@material-ui/core/DialogContentText";
import Box from "@material-ui/core/Box";
import Stack from '@mui/material/Stack';


const roles = ["Teacher", "Student", "Parent"];

type UserDialogProps = {
  onAdd: (user: Partial<User>) => void;
  onClose: () => void;
  onUpdate: (user: User) => void;
  open: boolean;
  processing: boolean;
  user?: User;
};

const UserDialog = ({
                      onAdd,
                      onClose,
                      onUpdate,
                      open,
                      processing,
                      user,
                    }: UserDialogProps) => {
  const {t} = useTranslation();

  const genders = [
    {label: "userManagement.form.gender.options.f", value: "F"},
    {label: "userManagement.form.gender.options.m", value: "M"},
  ];
  const editMode = Boolean(user && user.id);

  const handleSubmit = (values: Partial<User>) => {
    if (user && user.id) {
      onUpdate({...values, id: user.id} as User);
    } else {
      onAdd(values);
    }
  };

  const formik = useFormik({
    initialValues: {
      disabled: user ? user.disabled : false,
      email: user ? user.email : "",
      firstName: user ? user.firstName : "",
      gender: user ? user.gender : 0,
      lastName: user ? user.lastName : "",
      role: user ? user.role : "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .email(t("common.validations.email"))
      .required(t("common.validations.required")),
      firstName: Yup.string()
      .max(20, t("common.validations.max", {size: 20}))
      .required(t("common.validations.required")),
      lastName: Yup.string()
      .max(30, t("common.validations.max", {size: 30}))
      .required(t("common.validations.required")),
      role: Yup.string().required(t("common.validations.required")),
    }),
    onSubmit: handleSubmit,
  });

  return (
      <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth={"lg"}
          fullWidth={true}
      >
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogTitle id="user-dialog-title">
            {editMode
                ? t("userManagement.modal.edit.title")
                : t("userManagement.modal.add.title")}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label={t("userManagement.form.lastName.label")}
                    name="lastName"
                    autoComplete="family-name"
                    autoFocus
                    disabled={processing}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label={t("userManagement.form.firstName.label")}
                    name="firstName"
                    autoComplete="given-name"
                    disabled={processing}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="birthDate"
                    label={t("userManagement.form.lastName.label")}
                    name="lastName"
                    autoComplete="family-name"
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                />
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={2}>
                  <Grid item xs={9}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t("userManagement.form.email.label")}
                        name="email"
                        autoComplete="given-name"
                        disabled={processing}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl component="fieldset" margin="normal">
                      <Box mt={1}>
                        <RadioGroup
                            row
                            aria-label="gender"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                          {genders.map((gender) => (
                              <FormControlLabel
                                  key={gender.value}
                                  disabled={processing}
                                  value={gender.value}
                                  control={<Radio/>}
                                  label={t(gender.label)}
                              />
                          ))}
                        </RadioGroup>
                      </Box>
                    </FormControl>
                  </Grid>
                </Grid>

              </Grid>
              <Grid item xs={9}>
                <TextField
                    margin="normal"
                    required
                    id="address"
                    fullWidth
                    label={t("userManagement.form.address.label")}
                    name="address"
                >
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                    margin="normal"
                    required
                    id="phone"
                    fullWidth
                    label={t("userManagement.form.phone.label")}
                    name="phone"
                >
                </TextField>
              </Grid>
            </Grid>


            <TextField
                margin="normal"
                required
                id="role"
                disabled={processing}
                fullWidth
                select
                label={t("userManagement.form.role.label")}
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
            >
              {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
              ))}
            </TextField>

          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>{t("userManagement.action.cancel.button")}</Button>
            <Button color="error">
              {t("userManagement.action.disabled.button")}
            </Button>
            <LoadingButton loading={processing} type="submit">
              {t("userManagement.action.save.button")}
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
  );
};

export default UserDialog;
