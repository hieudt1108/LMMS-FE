
import React, { useState } from 'react';
import {Box, Divider, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {useTranslation} from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Stack from '@mui/material/Stack';
import {styled} from "@mui/material/styles";
import {Switch, useMediaQuery} from "@mui/material";
import Button from "@material-ui/core/Button";
import LoadingButton from "@material-ui/lab/LoadingButton";
import CardActions from "@material-ui/core/CardActions";
import HelpCenterHeader from "../../admin/components/HelpCenterHeader";
import ConfirmDialog from "../../core/components/ConfirmDialog";
import {useSnackbar} from "../../core/contexts/SnackbarProvider";
import {useTheme} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import SvgContainer from "../../core/components/SvgContainer";
import {ReactComponent as ConfirmSvg} from "../../core/assets/confirm.svg";




const genders = [
    { label: 'userManagement.form.gender.options.f', value: 'F' },
    { label: 'userManagement.form.gender.options.m', value: 'M' },
];

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

const AddUser = () => {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <React.Fragment>
        <HelpCenterHeader title={"Sửa thông tin người dùng"}/>
        <Card sx={{ mt: 2 }}>
            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >

                <Grid container spacing={2} marginLeft={3}>
                    <Grid item xs={12} md={8}>
                        <Box marginBottom={2}>
                            <Typography variant="h2" color="GrayText">
                                Name
                            </Typography>
                        </Box>
                        <Stack direction="row">
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Username<span style={{color: "red"}}>*</span>
                            </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    size="small"
                                    fullWidth
                                    id="lastName"
                                    label={t('userManagement.form.lastName.label')}
                                    name="lastName"
                                    autoComplete="family-name"
                                    autoFocus
                                    sx={{ml:5}}
                                />
                        </Stack>
                        <Stack direction="row">
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Password<span style={{color: "red"}}>*</span>
                            </Typography>
                            <TextField
                                margin="normal"
                                required
                                size="small"
                                fullWidth
                                id="lastName"
                                label={t('userManagement.form.lastName.label')}
                                name="lastName"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ml:5}}
                            />
                        </Stack>
                        <Stack direction="row" >
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Firstname
                            </Typography>
                            <TextField
                                margin="normal"

                                size="small"
                                fullWidth
                                id="lastName"
                                label={t('userManagement.form.lastName.label')}
                                name="lastName"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ml:5.7}}
                            />
                        </Stack>
                        <Stack direction="row" >
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Lastname
                            </Typography>
                            <TextField
                                margin="normal"

                                size="small"
                                fullWidth
                                id="lastName"
                                label={t('userManagement.form.lastName.label')}
                                name="lastName"
                                autoComplete="family-name"
                                autoFocus
                                sx={{ml:5.7}}
                            />
                        </Stack>
                        <Stack direction="row" >
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Gender
                            </Typography>
                            <FormControl component="fieldset" margin="normal">
                                <Box ml={8}>
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
                                </Box>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" >
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                {t('userManagement.form.disabled.label')}
                            </Typography>
                            <FormControlLabel
                                control={<Android12Switch defaultChecked />}
                                label=""
                                sx={{ml:3,mt:2}}
                            />
                        </Stack>
                        <Box marginBottom={2} marginTop={3}>
                            <Typography variant="h2" color="GrayText">
                                Contact Info
                            </Typography>
                        </Box>
                        <Stack direction="row" >
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Email
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                margin="normal"

                                id="email"
                                label={t('userManagement.form.email.label')}
                                name="email"
                                autoComplete="email"
                                sx={{ml:9.5}}
                            />
                        </Stack>
                        <Stack direction="row" >
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Address
                            </Typography>
                            <TextField
                                size="small"
                                fullWidth
                                margin="normal"

                                id="address"
                                label={t('userManagement.form.address.label')}
                                name="address"
                                sx={{ml:7}}
                            ></TextField>
                        </Stack>
                        <Stack direction="row" >
                            <Typography component="div" variant="h6" sx={{mt:3}}>
                                Phone
                            </Typography>
                            <TextField
                                size="small"
                                margin="normal"

                                id="phone"
                                fullWidth
                                label={t('userManagement.form.phone.label')}
                                name="phone"
                                sx={{ml:8.5}}
                            ></TextField>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button >{t('common.return')}</Button>
                <LoadingButton type="submit" variant="contained" onClick={handleClickOpen}>
                    {t('userManagement.modal.delete.action')}
                </LoadingButton>
                <LoadingButton type="submit" variant="contained" onClick={handleClickOpen}>
                    {t('userManagement.modal.edit.action')}
                </LoadingButton>
            </CardActions>
        </Card>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent sx={{ textAlign: "center" }}>
                <SvgContainer>
                    <ConfirmSvg style={{ maxWidth: 280, width: "100%" }} />
                </SvgContainer>
                <DialogTitle id="confirm-dialog-title" sx={{ pb: 1, pt: 0 }}>
                    Xác nhận
                </DialogTitle>
                <DialogContentText id="confirm-dialog-description">
                    Bạn chắc chắn muốn sửa người dùng này không?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t("common.cancel")}</Button>
                <LoadingButton
                    autoFocus
                    onClick={handleClose}
                    variant="contained"
                >
                    {t("common.confirm")}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
};

export default AddUser;
