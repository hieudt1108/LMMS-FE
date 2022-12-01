import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';
import { getAllProgram, getAllSubject, getAllTypeDocument, getFolderByID, postFolder } from 'src/dataProvider/agent';

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
    data: {
      id: 0,
      typeDocumentId: 0,
      subjectId: 0,
      programId: 0,
      folderId: 0,
      code: 'NB-BCOF80-2',
      name: 'Ten tai lieu',
      link: 'link',
      description: 'This is document',
      size: 0,
      typeFile: 'string',
      urlDocument: 'string',
      viewNumber: 0,
      status: 1,
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
      state.isLoading = false;
      state.newDocument.init = { ...state.newDocument.init, ...action.payload };
    },
  },
});

// Reducer
export default slice.reducer;

export function getFolderRedux(params) {
  return async () => {
    try {
      if (!params) {
        return dispatch(slice.actions.hasError());
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
      dispatch(slice.actions.createFolderSuccess(payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createDocumentInitialRedux() {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const params = {
        pageIndex: 1,
        pageSize: 100,
      };
      const response = await Promise.all([getAllProgram(params), getAllSubject(params), getAllTypeDocument(params)]);
      console.log('createDocumentInitialRedux', response);
      dispatch(
        slice.actions.createDocumentInitialSuccess({
          programs: response[0].data.data,
          subjects: response[1].data.data,
          typeDocuments: response[2].data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
