import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";

const ProfilePassword = () => {
  const snackbar = useSnackbar();
  const { t } = useTranslation();


  return (
    <form noValidate>
      <Card>
        <CardHeader title={t("profile.password.title")} />
        <CardContent>
          <TextField
            margin="normal"
            required
            fullWidth
            name="oldPassword"
            label={t("profile.password.form.current.label")}
            type="password"
            id="oldPassword"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label={t("profile.password.form.new.label")}
            type="password"
            id="newPassword"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t("profile.password.form.confirm.label")}
            type="password"
            id="confirmPassword"
          />
        </CardContent>
        <CardActions>
          <LoadingButton type="submit" variant="contained">
            {t("common.update")}
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProfilePassword;
