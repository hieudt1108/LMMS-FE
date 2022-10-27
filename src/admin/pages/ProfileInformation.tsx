import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";


const genders = [
  { label: "profile.info.form.gender.options.f", value: "F" },
  { label: "profile.info.form.gender.options.m", value: "M" },
  { label: "profile.info.form.gender.options.n", value: "NC" },
];

const ProfileInformation = () => {
  const snackbar = useSnackbar();
  const { t } = useTranslation();



  return (
    <form noValidate>
      <Card>
        <CardHeader title={t("profile.info.title")} />
        <CardContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label={t("profile.info.form.lastName.label")}
            name="lastName"
            autoComplete="family-name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label={t("profile.info.form.firstName.label")}
            name="firstName"
            autoComplete="given-name"
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              {t("profile.info.form.gender.label")}
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
            >
              {genders.map((gender) => (
                <FormControlLabel
                  key={gender.value}
                  value={gender.value}
                  control={<Radio />}
                  label={t(gender.label)}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("profile.info.form.email.label")}
            name="email"
            autoComplete="email"
          />
        </CardContent>
        <CardActions>
          <Button>
            {t("common.reset")}
          </Button>
          <LoadingButton  type="submit" variant="contained">
            {t("common.update")}
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProfileInformation;
