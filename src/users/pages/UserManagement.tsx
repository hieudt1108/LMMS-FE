import {Box, Button, Grid, InputAdornment, SvgIcon, Tab, Tabs, TextField} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import AdminAppBar from "../../admin/components/AdminAppBar";
import AdminToolbar from "../../admin/components/AdminToolbar";
import ConfirmDialog from "../../core/components/ConfirmDialog";
import SelectToolbar from "../../core/components/SelectToolbar";
import {useSnackbar} from "../../core/contexts/SnackbarProvider";
import UserDialog from "../components/UserDialog";
import UserTable from "../components/UserTable";
import {useAddUser} from "../hooks/useAddUser";
import {useDeleteUsers} from "../hooks/useDeleteUsers";
import {useUpdateUser} from "../hooks/useUpdateUser";
import {useUsers} from "../hooks/useUsers";
import {User} from "../types/user";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const UserManagement = () => {
  const snackbar = useSnackbar();
  const {t} = useTranslation();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [userDeleted, setUserDeleted] = useState<string[]>([]);
  const [userUpdated, setUserUpdated] = useState<User | undefined>(undefined);

  const {addUser, isAdding} = useAddUser();
  const {deleteUsers, isDeleting} = useDeleteUsers();
  const {isUpdating, updateUser} = useUpdateUser();
  // const {data} = useUsers();

  const [data, setData] = useState<any[]>(
      [
        {
          "id": "10",
          "avatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.w3schools.com%2Fhowto%2Fhowto_css_image_avatar.asp&psig=AOvVaw02CyoJ1oYKoAtBluFogPND&ust=1665138811707000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKi3ssyzy_oCFQAAAAAdAAAAABAE",
          "disabled": false,
          "email": "abc@gmail.com",
          "firstName": "Doan",
          "gender": "F",
          "lastName": "Doan Hieu",
          "role": "Teacher",
        },
        {
          "id": "10",
          "avatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.w3schools.com%2Fhowto%2Fhowto_css_image_avatar.asp&psig=AOvVaw02CyoJ1oYKoAtBluFogPND&ust=1665138811707000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKi3ssyzy_oCFQAAAAAdAAAAABAE",
          "disabled": true,
          "email": "abc@gmail.com",
          "firstName": "Doan",
          "gender": "F",
          "lastName": "Doan Hieu",
          "role": "Teacher",
        },
        {
          "id": "10",
          "avatar": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.w3schools.com%2Fhowto%2Fhowto_css_image_avatar.asp&psig=AOvVaw02CyoJ1oYKoAtBluFogPND&ust=1665138811707000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKi3ssyzy_oCFQAAAAAdAAAAABAE",
          "disabled": false,
          "email": "abc@gmail.com",
          "firstName": "Doan",
          "gender": "F",
          "lastName": "Doan Hieu",
          "role": "Teacher",
        },
      ]
  );

  const processing = isAdding || isDeleting || isUpdating;

  const handleAddUser = async (user: Partial<User>) => {
    addUser(user as User)
    .then(() => {
      snackbar.success(
          t("userManagement.notifications.addSuccess", {
            user: `${user.firstName} ${user.lastName}`,
          })
      );
      setOpenUserDialog(false);
    })
    .catch(() => {
      snackbar.error(t("common.errors.unexpected.subTitle"));
    });
  };


  const handleUpdateUser = async (user: User) => {
    updateUser(user)
    .then(() => {
      snackbar.success(
          t("userManagement.notifications.updateSuccess", {
            user: `${user.firstName} ${user.lastName}`,
          })
      );
      setOpenUserDialog(false);
    })
    .catch(() => {
      snackbar.error(t("common.errors.unexpected.subTitle"));
    });
  };


  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleCloseUserDialog = () => {
    setUserUpdated(undefined);
    setOpenUserDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (userIds: string[]) => {
    setUserDeleted(userIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenUserDialog = (user?: User) => {
    setUserUpdated(user);
    setOpenUserDialog(true);
  };


  return (
      <React.Fragment>
        <AdminAppBar>
          <AdminToolbar title={t("userManagement.toolbar.title")}>
            <Button
                startIcon={(<FileUploadIcon fontSize="small"/>)}
            >
              {t("userManagement.listScreen.exportFile")}
            </Button>
            <Button
                startIcon={(<FileDownloadIcon fontSize="small"/>)}
            >
              {t("userManagement.listScreen.importFile")}
            </Button>
            <Button
                startIcon={(<AddIcon fontSize="small"/>)}
            >
              {t("userManagement.listScreen.addUser")}
            </Button>
            <Button
                startIcon={(<FilterListIcon fontSize="small"/>)}
            >
              {t("userManagement.listScreen.filter")}
            </Button>

          </AdminToolbar>
        </AdminAppBar>
        {/*ô search*/}
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={{maxWidth: 400}}>
              <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                              color="action"
                              fontSize="medium"
                          >
                            <SearchIcon/>
                          </SvgIcon>
                        </InputAdornment>
                    )
                  }}
                  placeholder={t("userManagement.listScreen.search")}
                  variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
        <UserTable
            processing={processing}
            onDelete={handleOpenConfirmDeleteDialog}
            onEdit={handleOpenUserDialog}
            users={data}
        />

        {openUserDialog && (
            <UserDialog
                onAdd={handleAddUser}
                onClose={handleCloseUserDialog}
                onUpdate={handleUpdateUser}
                open={openUserDialog}
                processing={processing}
                user={userUpdated}
            />
        )}
      </React.Fragment>
  );
};

export default UserManagement;
