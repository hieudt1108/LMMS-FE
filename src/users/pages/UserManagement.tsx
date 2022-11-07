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
import {deleteUser, getAllUsers} from '../../dataProvider/agent';
import ProgramAddEditDialog from '../../subsystem/components/ProgramCreate';
import {toast} from "react-toastify";

const UserManagement = () => {

  const [user, setUsers] = React.useState([]);
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

  function notify(type: string, text: string) {
    if (type === 'success') {
      toast.success(text, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(text, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  React.useEffect(() => {
    fetchUsers();
  }, []);
  async function fetchUsers() {
    const res = await getAllUsers({pageIndex : 1,pageSize:100});
    if (res.status < 400) {
      setUsers(res.data.data);
    } else {
      console.log('error');
    }
  }

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
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

  const handleDeleteUser = async () => {
    deleteUser(userDeleted)
        .then(() => {
          notify('success','Xóa người dùng thành công')
          fetchUsers()
          setSelected([]);
          setUserDeleted([]);
          setOpenConfirmDeleteDialog(false);
        })
        .catch(() => {
          notify('error',t('common.errors.unexpected.subTitle'))
        });
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
        onConfirm={handleDeleteUser}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      />
    </React.Fragment>
  );
};

export default UserManagement;
