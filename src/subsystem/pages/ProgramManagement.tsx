
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../core/components/ConfirmDialog';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import ProgramTable from '../components/ProgramTable';
import { Program } from '../types/program';
import HeaderProgram from '../components/HeaderProgram';
import { getAllProgram } from '../../dataProvider/agent';

const ProgramManagement = () => {
  const [program, setPrograms] = React.useState([]);
  React.useEffect(() => {
    fetchPrograms();
  }, []);
  async function fetchPrograms() {
    const res = await getAllProgram();
    if (res.status < 400) {
      setPrograms(res.data.data);
    } else {
      console.log('error');
    }
  }
  // console.log(user);
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openProgramDialog, setOpenProgramDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [programDeleted, setProgramDeleted] = useState<string[]>([]);
  const [programUpdated, setProgramUpdated] = useState<Program | undefined>(undefined);

  // @ts-ignore
  const { addProgram, isAdding } = useState('');
  // @ts-ignore
  const { deletePrograms, isDeleting } = useState('');
  // @ts-ignore
  const { isUpdating, updateProgram } = useState('');
  // @ts-ignore
  const { data } = useState('');

  const processing = isAdding || isDeleting || isUpdating;


  const handleDeleteUsers = async () => {
    setOpenConfirmDeleteDialog(false);
    // deletePrograms(programDeleted)
    //   .then(() => {
    //     snackbar.success(t('userManagement.notifications.deleteSuccess'));
    //     setSelected([]);
    //     setProgramDeleted([]);
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
    setProgramUpdated(undefined);
    setOpenProgramDialog(false);
  };

  const handleOpenConfirmDeleteDialog = (userIds: string[]) => {
    setProgramDeleted(userIds);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenUserDialog = (user?: Program) => {
    setProgramUpdated(user);
    setOpenProgramDialog(true);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <HeaderProgram
        title={''}
        description={'Danh sách chương trình học'}
      />
      <ProgramTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        programs={program}
      />
      <ConfirmDialog
        description={t('Bạn có chắc muốn xóa chương trình này không ?')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteUsers}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      />
    </React.Fragment>
  );
};

export default ProgramManagement;
