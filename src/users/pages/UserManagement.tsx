import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import ConfirmDialog from '../../core/components/ConfirmDialog';
import SelectToolbar from '../../core/components/SelectToolbar';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import UserTable from '../components/UserTable';
import { User } from '../types/user';
import Header from '../components/Header';
import { getAllUsers } from '../../dataProvider/agent';
import ProgramAddEditDialog from '../../subsystem/components/ProgramCreate';

const UserManagement = () => {
  const [user, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetchUsers();
  }, []);
  async function fetchUsers() {
    const res = await getAllUsers();
    if (res.status < 400) {
      setUsers(res.data.data);
    } else {
      console.log('error');
    }
  }
  // console.log(user);
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [userDeleted, setUserDeleted] = useState<string[]>([]);
  const [userUpdated, setUserUpdated] = useState<User | undefined>(undefined);

  // @ts-ignore
  const { addUser, isAdding } = useState('');
  // @ts-ignore
  const { deleteUsers, isDeleting } = useState('');
  // @ts-ignore
  const { isUpdating, updateUser } = useState('');
  // @ts-ignore
  const { data } = useState('');

  const processing = isAdding || isDeleting || isUpdating;

  const handleDeleteUsers = async () => {
    setOpenConfirmDeleteDialog(false);
    // deleteUsers(userDeleted)
    //   .then(() => {
    //     snackbar.success(t('userManagement.notifications.deleteSuccess'));
    //     setSelected([]);
    //     setUserDeleted([]);
    //     setOpenConfirmDeleteDialog(false);
    //   })
    //   .catch(() => {
    //     snackbar.error(t('common.errors.unexpected.subTitle'));
    //   });
  };

  // const handleCancelSelected = () => {
  //   setSelected([]);
  // };

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

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <Header
        title={'userManagement.listScreen.title'}
        description={'userManagement.listScreen.description'}
      />
      <UserTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        users={user}
      />
      <ConfirmDialog
        description={t('userManagement.confirmations.delete')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteUsers}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      />
    </React.Fragment>
  );
};

export default UserManagement;
