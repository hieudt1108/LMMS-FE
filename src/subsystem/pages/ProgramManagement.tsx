import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../core/components/ConfirmDialog';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import ProgramTable from '../components/ProgramTable';
import { Program } from '../types/program';
import HeaderProgram from '../components/HeaderProgram';
import { getAllProgram, deleteProgram } from '../../dataProvider/agent';
import { toast } from 'react-toastify';
import ProgramUpdate from "../components/ProgramUpdate";

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
      toast.error('Error : ' + res.response.status);
    }
  }

  // async function fetchProgramdele(id: any) {
  //   const res = await deleteProgram(id);
  // }
  const snackbar = useSnackbar();
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

  const handleOpenConfirmDeleteDialog = (id: string[]) => {
    setProgramDeleted(id);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenProgramDialog = (user?: Program) => {
    setProgramUpdated(user);
    setOpenProgramDialog(true);
  };

  const handleCloseProgramDialog = () => {
    setProgramUpdated(undefined);
    setOpenProgramDialog(false);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelected(newSelected);
  };

  const handleAddProgram = async (program: Partial<Program>) => {
    addProgram(program as Program)
        .then(() => {
          snackbar.success(
              t('userManagement.notifications.addSuccess', {
                program: `${program.name}`,
              })
          );
          setOpenProgramDialog(false);
        })
        .catch(() => {
          snackbar.error(t('common.errors.unexpected.subTitle'));
        });
  };

  const handleUpdateProgram = async (program: Program) => {
    updateProgram(program)
        .then(() => {
          snackbar.success(
              t('userManagement.notifications.updateSuccess', {
                program: `${program.name}`,
              })
          );
          setOpenProgramDialog(false);
        })
        .catch(() => {
          snackbar.error(t('common.errors.unexpected.subTitle'));
        });
  };

  return (
    <React.Fragment>
      <HeaderProgram title={''} description={'Danh sách chương trình học'} />
      <ProgramTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenProgramDialog}
        onSelectedChange={handleSelectedChange}
        selected={selected}
        programs={program}
      />
      {openProgramDialog && (
          <ProgramUpdate
              onAdd={handleAddProgram}
              onClose={handleCloseProgramDialog}
              onUpdate={handleUpdateProgram}
              open={openProgramDialog}
              processing={processing}
              program={programUpdated}
          />
      )}
    </React.Fragment>
  );
};

export default ProgramManagement;
