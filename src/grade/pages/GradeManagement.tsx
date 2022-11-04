import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../core/components/ConfirmDialog';
import { useSnackbar } from '../../core/contexts/SnackbarProvider';
import GradeTable from '../components/GradeTable';
import {Grade} from '../types/grade';
import HeaderProgram from '../components/GradeHeader';
import {updateGrade, deleteGrade, getAllGrade} from '../../dataProvider/agent';
import { toast } from 'react-toastify';
import ProgramUpdate from "../components/GradeUpdate";
import {useMutation, useQueryClient} from "react-query";
import {removeMany} from "../../core/utils/crudUtils";
import HeaderGrade from "../components/GradeHeader";
import GradeUpdate from "../components/GradeUpdate";
import GradeAddDialog from "../components/GradeCreate";

const GradeManagement = () => {
  const [grade, setGrades] = React.useState([]);
  const snackbar = useSnackbar();
  const { t } = useTranslation();
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [openGradeDialog, setOpenGradeDialog] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<string[]>([]);
  const [gradeDeleted, setGradeDeleted] = useState<string[]>([]);
  const [gradeUpdated, setGradeUpdated] = useState<Grade | undefined>(
      undefined

  );
    // @ts-ignore
    const { addGrade, isAdding } = useState('');
    // @ts-ignore
    const { deleteGrades, isDeleting } = useState('');
    // @ts-ignore
    const { isUpdating, updateGrades } = useState('');
    // @ts-ignore
    const processing = isAdding || isDeleting || isUpdating;

  React.useEffect(() => {
      fetchGrades();
  }, []);

    React.useEffect(() => {
    },  );

  async function fetchGrades() {
    const res = await getAllGrade({ pageIndex: 1, pageSize: 10 });
    if (res.status < 400) {
      setGrades(res.data.data);
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
    setGradeDeleted(id);
    setOpenConfirmDeleteDialog(true);
  };

  const handleOpenGradeDialog = (grade?: Grade) => {
    setGradeUpdated(grade);
    setOpenGradeDialog(true);
  };

  const handleCloseGradeDialog = () => {
    setGradeUpdated(undefined);
    setOpenGradeDialog(false);
  };

    const handleCloseConfirmDeleteDialog = () => {
        setOpenConfirmDeleteDialog(false);
    };

  const handleSelectedChange = (newSelected: string[]) => {
      setSelectedGrade(newSelected);
  };

  const handleUpdateGrade = async (grade: Grade) => {
      updateGrade(grade)
          .then(() => {
              notify('success','Cập nhật khối học thành công')
              fetchGrades()
              setSelectedGrade([]);
              setGradeUpdated(grade);
          })
          .catch(() => {
              notify('error',t('common.errors.unexpected.subTitle'))
          });
  };

  const handleDeleteGrade = async () => {
      deleteGrade(gradeDeleted)
          .then(() => {
              notify('success','Xóa khối học thành công')
              fetchGrades()
              setSelectedGrade([]);
              setGradeDeleted([]);
              setOpenConfirmDeleteDialog(false);
          })
          .catch(() => {
              notify('error',t('common.errors.unexpected.subTitle'))
          });
  };

  return (
    <React.Fragment>
      <HeaderGrade title={''}  description={'Danh sách cấp học'}/>
      <GradeTable
        processing={processing}
        onDelete={handleOpenConfirmDeleteDialog}
        onEdit={handleOpenGradeDialog}
        onSelectedChange={handleSelectedChange}
        selected={selectedGrade}
        grades={grade}


      />
        <ConfirmDialog
            description={'Bạn có chắc chắn muốn xóa khối học này không ?'}
            pending={processing}
            onClose={handleCloseConfirmDeleteDialog}
            onConfirm={handleDeleteGrade}
            open={openConfirmDeleteDialog}
            title={t('common.confirmation')}
        />
      {openGradeDialog && (
          <GradeUpdate
              onClose={handleCloseGradeDialog}
              onUpdate={handleUpdateGrade}
              open={openGradeDialog}
              processing={processing}
              grade={gradeUpdated}
          />
      )}

    </React.Fragment>
  );
};

export default GradeManagement;
