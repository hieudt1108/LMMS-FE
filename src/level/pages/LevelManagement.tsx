import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../core/components/ConfirmDialog';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import LevelTable from '../components/LevelTable';
import {Level} from '../types/level';
import HeaderProgram from '../components/HeaderLevel';
import {getAllLevel, updateLevel, deleteLevel} from '../../dataProvider/agent';
import { toast } from 'react-toastify';
import ProgramUpdate from "../components/LevelUpdate";
import {useMutation, useQueryClient} from "react-query";
import {removeMany} from "../../core/utils/crudUtils";
import HeaderLevel from "../components/HeaderLevel";
import LevelUpdate from "../components/LevelUpdate";
import LevelAddDialog from "../components/LevelCreate";

const LevelManagement = () => {
  const [level, setLevels] = React.useState([]);
  const snackbar = useSnackbar();
  const { t } = useTranslation();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openLevelDialog, setOpenLevelDialog] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [levelDeleted, setLevelDeleted] = useState<string[]>([]);
  const [levelUpdated, setLevelUpdated] = useState<Level | undefined>(
      undefined

  );
    // @ts-ignore
    const { addLevel, isAdding } = useState('');
    // @ts-ignore
    const { deleteLevels, isDeleting } = useState('');
    // @ts-ignore
    const { isUpdating, updateLevels } = useState('');
    // @ts-ignore
    const processing = isAdding || isDeleting || isUpdating;

  React.useEffect(() => {
      fetchLevels();
  }, []);

    React.useEffect(() => {
    },  );

  async function fetchLevels() {
    const res = await getAllLevel({ pageIndex: 1, pageSize: 10 });
    if (res.status < 400) {
      setLevels(res.data.data);
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
    setLevelDeleted(id);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenLevelDialog = (level?: Level) => {
    setLevelUpdated(level);
    setOpenLevelDialog(true);
  };

  const handleCloseLevelDialog = () => {
    setLevelUpdated(undefined);
    setOpenLevelDialog(false);
  };

    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(false);
    };

  const handleSelectedChange = (newSelected: string[]) => {
      setSelectedLevel(newSelected);
  };

  const handleUpdateLevel = async (level: Level) => {
      updateLevel(level)
          .then(() => {
              notify('success','Cập nhật cấp học thành công')
              fetchLevels()
              setSelectedLevel([]);
              setLevelUpdated(level);
          })
          .catch(() => {
              notify('error',t('common.errors.unexpected.subTitle'))
          });
  };

  const handleDeleteLevel = async () => {
      deleteLevel(levelDeleted)
          .then(() => {
              notify('success','Xóa cấp học thành công')
              fetchLevels()
              setSelectedLevel([]);
              setLevelDeleted([]);
              setOpenConfirmDeleteDialog(false);
          })
          .catch(() => {
              notify('error',t('common.errors.unexpected.subTitle'))
          });
  };

  return (
    <React.Fragment>
      <HeaderLevel title={''}  description={'Danh sách cấp học'}/>
      <LevelTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenLevelDialog}
        onSelectedChange={handleSelectedChange}
        selected={selectedLevel}
        levels={level}


      />
        <ConfirmDialog
            description={'Bạn có chắc chắn muốn xóa cấp học này không ?'}
            pending={processing}
            onClose={handleCloseConfirmDeleteDialog}
            onConfirm={handleDeleteLevel}
            open={openConfirmDeleteDialog}
            title={t('common.confirmation')}
        />
      {openLevelDialog && (
          <LevelUpdate
              onClose={handleCloseLevelDialog}
              onUpdate={handleUpdateLevel}
              open={openLevelDialog}
              processing={processing}
              level={levelUpdated}
          />
      )}

    </React.Fragment>
  );
};

export default LevelManagement;
