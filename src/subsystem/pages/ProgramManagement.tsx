import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../core/components/ConfirmDialog';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import ProgramTable from '../components/ProgramTable';
import { Program } from '../types/program';
import HeaderProgram from '../components/HeaderProgram';
import { getAllProgram, deleteProgram } from '../../dataProvider/agent';
import { toast } from 'react-toastify';
import ProgramUpdate from '../components/ProgramUpdate';

const ProgramManagement = () => {
  const [program, setPrograms] = React.useState([]);
  const snackbar = useSnackbar();
  const { t } = useTranslation();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openProgramDialog, setOpenProgramDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string[]>([]);
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
  const processing = isAdding || isDeleting || isUpdating;

  React.useEffect(() => {
    fetchPrograms();
  }, []);

  async function fetchPrograms() {
    const res = await getAllProgram({ pageIndex: 1, pageSize: 10 });
    if (res.status < 400) {
      setPrograms(res.data.data);
    } else {
      toast.error('Error : ' + res.response.status);
    }
  }

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

  const handleOpenConfirmDeleteDialog = (id: string[]) => {
    setProgramDeleted(id);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenProgramDialog = (program?: Program) => {
    setProgramUpdated(program);
    setOpenProgramDialog(true);
  };

  const handleCloseProgramDialog = () => {
    setProgramUpdated(undefined);
    setOpenProgramDialog(false);
  };

  const handleCloseConfirmDeleteDialog = () => {
    setOpenConfirmDeleteDialog(false);
  };

  const handleSelectedChange = (newSelected: string[]) => {
    setSelectedProgram(newSelected);
  };

  const handleAddProgram = async (program: Partial<Program>) => {
    addProgram(program as Program)
      .then(() => {
        snackbar.success(
          t('programManagement.notifications.addSuccess', {
            program: `${program.name}`,
          })
        );
        fetchPrograms();
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
          t('programManagement.notifications.updateSuccess', {
            program: `${program.name}`,
          })
        );
        setOpenProgramDialog(false);
      })
      .catch(() => {
        snackbar.error(t('common.errors.unexpected.subTitle'));
      });
  };

  const handleDeleteProgram = async () => {
    deleteProgram(programDeleted)
      .then(() => {
        notify('success', 'Xóa chương trình học thành công');
        fetchPrograms();
        setSelectedProgram([]);
        setProgramDeleted([]);
        setOpenConfirmDeleteDialog(false);
      })
      .catch(() => {
        notify('error', t('common.errors.unexpected.subTitle'));
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
        selected={selectedProgram}
        programs={program}
      />
      <ConfirmDialog
        description={t('programManagement.confirmations.delete')}
        pending={processing}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleDeleteProgram}
        open={openConfirmDeleteDialog}
        title={t('common.confirmation')}
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
