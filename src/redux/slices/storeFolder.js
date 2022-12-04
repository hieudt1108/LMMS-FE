import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import {
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

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  storeFolder: {
    id: '',
    name: '',
    parentId: 0,
    listFolders: [],
    listDocuments: [],
  },
  newDocument: {
    data: {
      code: '',
      name: '',
      description: '',
      file: '',
      programId: '',
      subjectId: '',
      typeDocumentId: '',
      urlDocument: '',
      size: 0,
      TypeFile: '',
      status: 0,
      folderId: 1,
      shareUser: [],
      shareClass: [],
    },
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
  name: 'storeFolder',
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

    getStoreFolderSuccess(state, action) {
      state.isLoading = false;
      state.storeFolder = { ...state.storeFolder, ...action.payload };
    },

    createStoreFolderSuccess(state, action) {
      console.log('createStoreFolderSuccess', action);
      state.isLoading = false;
      state.storeFolder.listFolders = [...state.storeFolder.listFolders, action.payload];
    },

    createStoreDocumentInitialSuccess(state, action) {
      console.log('createStoreDocumentInitialSuccess', action);
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
  },
});

// Reducer
export default slice.reducer;

export function getStoreFolderRedux(params) {
  return async () => {
    try {
      if (!params) {
        return dispatch(slice.actions.hasError());
      }
      dispatch(slice.actions.startLoading());
      const response = await getFolderByID(params);
      console.log('getFolderByID', response);
      dispatch(slice.actions.getStoreFolderSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createStoreFolderRedux(payload) {
  return async () => {
    try {
      if (!payload) {
        return dispatch(slice.actions.hasError());
      }
      dispatch(slice.actions.startLoading());
      const response = await postFolder(payload);
      console.log('postFolder', response);
      dispatch(slice.actions.createStoreFolderSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createStoreDocumentInitialRedux(folderId) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const params = {
        pageIndex: 1,
        pageSize: 100,
      };
      const response = await Promise.all([getAllProgram(params), getAllSubject(params), getAllTypeDocument(params)]);
      dispatch(
        slice.actions.createStoreDocumentInitialSuccess({
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

export function uploadStoreDocumentRedux(data) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await postDocument(data);
      if (response.status < 400) {
        console.log('uploadStoreDocumentRedux', response);
      } else {
        console.log('Lỗi upload tài liệu', response.data.title);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
