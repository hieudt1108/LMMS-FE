import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../core/components/ConfirmDialog';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import ProgramTable from '../components/ProgramTable';
import { Program } from '../types/program';
import HeaderProgram from '../components/HeaderProgram';
import { getAllProgram, deleteProgram } from '../../dataProvider/agent';
import ProgramAddEditDialog from '../components/ProgramCreate';
import { id } from 'date-fns/locale';

const ProgramManagement = () => {
  const [program, setPrograms] = React.useState([]);

  //console.log(program);

  React.useEffect(() => {
    fetchPrograms();
  }, []);
  async function fetchPrograms() {
    const res = await getAllProgram();
    //console.log(res.data.data[0].id);
    if (res.status < 400) {
      setPrograms(res.data.data);
    } else {
      console.log('error');
    }
  }

  // async function fetchProgramdele(id: any) {
  //   const res = await deleteProgram(id);
  // }

  const { t } = useTranslation();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openProgramDialog, setOpenProgramDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [programDeleted, setProgramDeleted] = useState<string[]>([]);
  const [programUpdated, setProgramUpdated] = useState<Program | undefined>(
    undefined
  );

  // @ts-ignore
  const { addProgram, isAdding } = useState('');
  // @ts-ignore
  const { deletePrograms, isDeleting } = useState('');
  // @ts-ignore
  const { isUpdating, updateProgram } = useState('');
  // @ts-ignore
  const { data } = useState('');
  const processing = isAdding || isDeleting || isUpdating;

  // const handleDeletePrograms = async (pId: any) => {
  //   const res = await deleteProgram(pId);
  //   if (res.status < 400) {
  //     console.log('delete success');
  //   } else {
  //     console.log('delete fail');
  //   }
  //   setOpenConfirmDeleteDialog(false);
  // };

  // const handleCloseConfirmDeleteDialog = () => {
  //   setOpenConfirmDeleteDialog(false);
  // };

  const handleOpenConfirmDeleteDialog = (id: string[]) => {
    setProgramDeleted(id);
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
      <HeaderProgram title={''} description={'Danh sách chương trình học'} />
      <ProgramTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenUserDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        programs={program}
      />
      {/* <ConfirmDialog
        description={t('Bạn có chắc muốn xóa chương trình này không ?')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={() => handleDeletePrograms(id)}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
      /> */}
    </React.Fragment>
  );
};

export default ProgramManagement;
