import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import {
  addShareDoc,
  getAllProgram,
  getAllSubject,
  getAllTypeDocument,
  getDocumentById,
  getFolderByID,
  getUserById,
  postDocument,
  postFile,
  postFolder,
  updateShareDocs,
} from 'src/dataProvider/agent';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSnackbar } from '../../components/snackbar';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  getOne: {
    id: 0,
    typeDocumentId: 0,
    subjectId: 0,
    programId: 0,
    code: '',
    name: '',
    link: null,
    description: '',
    size: 0,
    typeFile: '',
    urlDocument: '',
    viewNumber: 0,
    downloadNumber: 0,
    status: 0,
    listShare: [],
    initShare: [],
  },
};

const slice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      console.log('hasError', action.payload);
      state.isLoading = false;
      state.error = action.payload;
    },

    getOneDocumentSuccess(state, action) {
      console.log('getOneDocumentSuccess', action);
      state.isLoading = false;
      state.getOne = { ...state.getOne, ...action.payload };
    },

    handleSearchUserSuccess(state, action) {
      console.log('handleSearchUserSuccess', action);
      state.isLoading = false;
      state.getOne.initShare = [{ user: action.payload, permissionId: 0 }];
    },

    handleSendInviteSuccess(state, action) {
      console.log('handleSendInviteSuccess', action);
      state.isLoading = false;
      state.getOne.listShare = [
        ...state.getOne.listShare,
        { user: action.payload[0].user, permission: action.payload[0].permissionId },
      ];
    },
    handleChangePermissionSuccess(state, action) {
      const { user, permissionId } = action.payload[0];
      console.log('handleChangePermissionSuccess', user, permissionId, action.payload.index);
      state.isLoading = false;
      state.getOne.listShare = [
        ...state.getOne.listShare.slice(0, action.payload.index),
        { user, permissionId },
        ...state.getOne.listShare.slice(action.payload.index + 1),
      ];
      // state.getOne.listShare.map((item, indexListShare) => {
      //   if (action.payload.index !== indexListShare) {
      //     // This isn't the item we care about - keep it as-is
      //     return item;
      //   }

      //   // Otherwise, this is the one we want - return an updated value
      //   return {
      //     ...item,
      //     user,
      //     permissionId,
      //   };
      // });
    },
  },
});

// Reducer
export default slice.reducer;

export function getOneDocumentRedux(id) {
  return async () => {
    try {
      if (!id) {
        return;
      }
      dispatch(slice.actions.startLoading());
      const response = await getDocumentById(id);
      console.log('getOneDocumentRedux', response);
      dispatch(slice.actions.getOneDocumentSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function handleSearchUserRedux(user) {
  return async () => {
    try {
      if (!user) {
        return;
      }
      dispatch(slice.actions.startLoading());
      dispatch(slice.actions.handleSearchUserSuccess(user));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function handleSendInviteRedux(getOne) {
  return async () => {
    try {
      console.log('handleSendInviteRedux', getOne);
      if (!getOne) {
        return;
      }
      dispatch(slice.actions.startLoading());
      const response = await addShareDoc(getOne.id, getOne.initShare);
      dispatch(slice.actions.handleSendInviteSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function handleChangePermissionRedux(getOne, user, index, permissionId) {
  return async () => {
    try {
      console.log('handleChangePermissionRedux', getOne, user, index, permissionId);
      if (!getOne) {
        return;
      }
      dispatch(slice.actions.startLoading());
      const response = await updateShareDocs(getOne.id, [{ user, permissionId }]);
      dispatch(slice.actions.handleChangePermissionSuccess({ ...response.data.data, index }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
