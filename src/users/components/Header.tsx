import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@material-ui/core";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React, { Fragment } from "react";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";

type HeaderProps = {
  title: string;
  description: string;
};

const Header = ({ title, description }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
                {t(title)}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {t(description)}
              </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box sx={{ maxWidth: 400 }} mt={1}>
                    <TextField
                      size="small"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="medium">
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                      }}
                      placeholder={t("userManagement.listScreen.search")}
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="flex-end">
                <Button
                  className="button"
                  startIcon={<FileUploadIcon fontSize="small" />}
                >
                  {t("userManagement.listScreen.exportFile")}
                </Button>
                <Button startIcon={<FileDownloadIcon fontSize="small" />}>
                  {t("userManagement.listScreen.importFile")}
                </Button>
                <Button startIcon={<AddIcon fontSize="small" />}>
                  {t("userManagement.listScreen.addUser")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Header;
