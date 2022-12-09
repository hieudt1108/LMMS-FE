import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import {
  deleteDocument,
  getAllProgram,
  getAllSubject,
  getAllTypeDocument,
  getFolderByID,
  postDocument,
  postFile,
  postFolder,
} from 'src/dataProvider/agent';
import { PATH_DASHBOARD } from '../../routes/paths';
import { useSnackbar } from '../../components/snackbar';
import { useRouter } from 'next/router';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  folder: {
    id: '',
    name: '',
    parentId: 0,
    listFolders: [],
    listDocuments: [],
  },
  newDocument: {
    data: [],
    init: {
      typeDocuments: [],
      programs: [],
      subjects: [],
      users: [],
      classes: [],
    },
  },
};

const slice = createSlice({
  name: 'folder',
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

    getFolderSuccess(state, action) {
      state.isLoading = false;
      state.folder = { ...state.folder, ...action.payload };
    },

    createFolderSuccess(state, action) {
      console.log('createFolderSuccess', action);
      state.isLoading = false;
      state.folder.listFolders = [...state.folder.listFolders, action.payload];
    },

    createDocumentInitialSuccess(state, action) {
      console.log('createDocumentInitialSuccess', action);
      const { programs, subjects, typeDocuments, folderId } = action.payload;
      state.isLoading = false;
      state.newDocument.init = { ...state.newDocument.init, ...action.payload };
      state.newDocument.data = {
        ...state.newDocument.data,
        programId: programs[0].id,
        subjectId: subjects[0].id,
        typeDocumentId: typeDocuments[0].id,
        folderId: folderId,
      };
    },

    deleteDocumentInFolderSuccess(state, action) {
      const { documentID } = action.payload;
      state.isLoading = false;
      state.folder.listDocuments = state.folder.listDocuments.filter((item) => item.id === documentID);
    },
  },
});

// Reducer
export default slice.reducer;

const returnMessageSuccess = (title) => ({
  title: `${title}`,
  variant: '',
});

const returnMessageError = (title) => ({
  title: `${title}`,
  variant: 'error',
});

export function getFolderRedux(params) {
  return async () => {
    try {
      console.log('getFolderRedux', params);
      if (!params && params !== 0) {
        return dispatch(slice.actions.hasError('không có folderId'));
      }
      dispatch(slice.actions.startLoading());
      const response = await getFolderByID(params);
      console.log('getFolderByID', response);
      dispatch(slice.actions.getFolderSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createFolderRedux(payload) {
  return async () => {
    try {
      if (!payload) {
        return dispatch(slice.actions.hasError());
      }
      dispatch(slice.actions.startLoading());
      const response = await postFolder(payload);
      console.log('postFolder', response);
      if (response.status !== 200) {
        return dispatch(slice.actions.hasError(response.data.title));
      }
      dispatch(slice.actions.createFolderSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createDocumentInitialRedux(folderId) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const params = {
        pageIndex: 1,
        pageSize: 100,
      };
      const response = await Promise.all([getAllProgram(params), getAllSubject(params), getAllTypeDocument(params)]);
      dispatch(
        slice.actions.createDocumentInitialSuccess({
          programs: response[0].data.data,
          subjects: response[1].data.data,
          typeDocuments: response[2].data,
          folderId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteDocumentInFolderRedux(documentID) {
  return async () => {
    try {
      if (!documentID) {
        return returnMessageError('Xóa thư mục không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await deleteDocument(-1);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.deleteDocumentInFolderSuccess(documentID));

      return returnMessageSuccess('Xóa thư mục thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

// export function uploadDocumentRedux(data) {
//   return async () => {
//     try {
//       dispatch(slice.actions.startLoading());
//       const response = await postDocument(data);
//       if (response.status < 400) {
//         console.log('uploadDocumentRedux', response);
//       } else {
//         console.log('Lỗi upload tài liệu', response.data.title);
//       }
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }
