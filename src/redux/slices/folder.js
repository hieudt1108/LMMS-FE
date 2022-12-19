import { createSlice } from '@reduxjs/toolkit';
// utils
//
import { dispatch } from '../store';
import {
  deleteDocument,
  deleteFolder,
  getAllProgram,
  getAllSubject,
  getAllTypeDocument,
  getFolderByID,
  postCopyDocsToFolder,
  postDocument,
  postFolder,
  updateFolder,
} from 'src/dataProvider/agent';

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
  storeFolder: {
    id: '',
    name: '',
    parentId: 0,
    listFolders: [],
    listDocuments: [],
  },
  folderUploadDoc: {
    id: '',
    name: '',
    parentId: 0,
    listFolders: [],
    listDocuments: [],
  },

  folderUploadDocToSlot: {
    id: '',
    name: '',
    parentId: 0,
    listFolders: [],
    listDocuments: [],
  },

  folderSaveDocToMyFolder: {
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
      console.log('getFolderSuccess', action);
      state.isLoading = false;
      state.folder = { ...state.folder, ...action.payload };
    },

    getStoreFolderSuccess(state, action) {
      console.log('getStoreFolderSuccess', action);
      state.isLoading = false;
      state.storeFolder = { ...state.storeFolder, ...action.payload };
    },
    getFolderUploadDocSuccess(state, action) {
      state.isLoading = false;
      state.folderUploadDoc = { ...state.folderUploadDoc, ...action.payload };
    },

    getFolderUploadDocToSlotSuccess(state, action) {
      state.isLoading = false;
      state.folderUploadDocToSlot = { ...state.folderUploadDocToSlot, ...action.payload };
    },

    getFolderSaveToDocToMyFolderSuccess(state, action) {
      console.log('getFolderSavetoDocToMyFolderSuccess', action);
      state.isLoading = false;
      state.folderSaveDocToMyFolder = { ...state.folderSaveDocToMyFolder, ...action.payload };
    },

    createFolderSuccess(state, action) {
      console.log('createFolderSuccess', action);
      state.isLoading = false;
      state.folder.listFolders = [...state.folder.listFolders, action.payload];
    },
    createStoreFolderSuccess(state, action) {
      console.log('createFolderSuccess', action);
      state.isLoading = false;
      state.storeFolder.listFolders = [...state.storeFolder.listFolders, action.payload];
    },

    createDocumentInitialSuccess(state, action) {
      console.log('createDocumentInitialSuccess', action);
      const { programs, subjects, typeDocuments } = action.payload;
      state.isLoading = false;
      state.newDocument.init = { ...state.newDocument.init, ...action.payload };
      state.newDocument.data = {
        ...state.newDocument.data,
        programId: programs[0].id,
        subjectId: subjects[0].id,
        typeDocumentId: typeDocuments[0].id,
      };
    },

    deleteDocumentInFolderSuccess(state, action) {
      const { documentID } = action.payload;
      state.isLoading = false;
      state.folder.listDocuments = state.folder.listDocuments.filter((item) => item.id !== documentID);
    },
    deleteDocumentInStoreFolderSuccess(state, action) {
      const { documentID } = action.payload;
      state.isLoading = false;
      state.storeFolder.listDocuments = state.storeFolder.listDocuments.filter((item) => item.id !== documentID);
    },

    deleteSubFolderInFolderSuccess(state, action) {
      const { folderID } = action.payload;
      console.log('deleteSubFolderInFolderSuccess', action, folderID);
      state.isLoading = false;
      state.folder.listFolders = state.folder.listFolders.filter((item) => item.id !== folderID);
    },
    deleteSubFolderInStoreFolderSuccess(state, action) {
      const { folderID } = action.payload;
      console.log('deleteSubFolderInFolderSuccess', action, folderID);
      state.isLoading = false;
      state.storeFolder.listFolders = state.storeFolder.listFolders.filter((item) => item.id !== folderID);
    },

    updateSubFolderSuccess(state, action) {
      const { id, params } = action.payload;
      state.isLoading = false;

      state.folder.listFolders = state.folder.listFolders.map((item, indexItem) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          ...params,
        };
      });
    },
    updateSubStoreFolderSuccess(state, action) {
      const { id, params } = action.payload;
      state.isLoading = false;

      state.storeFolder.listFolders = state.storeFolder.listFolders.map((item, indexItem) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          ...params,
        };
      });
    },

    postCopyDocsToFolderSuccess(state, action) {
      console.log('postCopyDocsToFolderSuccess', action);
      state.isLoading = false;
      state.folder.listDocuments = [...state.folder.listDocuments, action.payload];
    },
    postCopyDocsToStoreFolderSuccess(state, action) {
      console.log('postCopyDocsToFolderSuccess', action);
      state.isLoading = false;
      state.storeFolder.listDocuments = [...state.storeFolder.listDocuments, action.payload];
    },

    createDocumentSuccess(state, action) {
      const { document } = action.payload;
      state.isLoading = false;
      state.storeFolder.listDocuments = [...state.storeFolder.listDocuments, document];
    },
    createDocumentInSubjectSuccess(state, action) {
      const { document } = action.payload;
      console.log('createDocumentInSubjectSuccess', document);
      state.isLoading = false;
      state.folderUploadDocToSlot.listDocuments = [...state.folderUploadDocToSlot.listDocuments, document];
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

export function getFolderUploadDocRedux(params) {
  return async () => {
    try {
      if (!params && params !== 0) {
        return returnMessageError(`Truy cập thư mục lỗi`);
      }
      dispatch(slice.actions.startLoading());
      const response = await getFolderByID(params);
      console.log('getFolderByID', response);
      dispatch(slice.actions.getFolderUploadDocSuccess(response.data.data));
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

export function getFolderUploadDocToSlotRedux(params) {
  return async () => {
    try {
      if (!params && params !== 0) {
        return returnMessageError(`Truy cập thư mục lỗi`);
      }
      dispatch(slice.actions.startLoading());
      const response = await getFolderByID(params);
      console.log('getFolderByID', response);
      dispatch(slice.actions.getFolderUploadDocToSlotSuccess(response.data.data));
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

export function getFolderSaveDocToMyFolderRedux(params) {
  return async () => {
    try {
      if (!params && params !== 0) {
        return returnMessageError(`Truy cập thư mục lỗi`);
      }
      dispatch(slice.actions.startLoading());
      const response = await getFolderByID(params);
      dispatch(slice.actions.getFolderSaveToDocToMyFolderSuccess(response.data.data));
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

export function getStoreFolderRedux(params) {
  return async () => {
    try {
      console.log('getFolderRedux', params);
      if (!params && params !== 0) {
        return dispatch(slice.actions.hasError('không có folderId'));
      }
      dispatch(slice.actions.startLoading());
      const response = await getFolderByID(params);
      console.log('getFolderByID', response);
      dispatch(slice.actions.getStoreFolderSuccess(response.data.data));
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

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
      return returnMessageError(`${error.message}`);
    }
  };
}

export function createFolderRedux(payload) {
  return async () => {
    try {
      if (!payload) {
        return returnMessageError('Tạo thư mục không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await postFolder(payload);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.createFolderSuccess(response.data.data));
      return returnMessageSuccess('Tạo thư mục thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

export function createStoreFolderRedux(payload) {
  return async () => {
    try {
      if (!payload) {
        return returnMessageError('Tạo thư mục không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await postFolder(payload);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.createStoreFolderSuccess(response.data.data));
      return returnMessageSuccess('Tạo thư mục thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
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
      dispatch(
        slice.actions.createDocumentInitialSuccess({
          programs: response[0].data.data,
          subjects: response[1].data.data,
          typeDocuments: response[2].data,
        })
      );
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

export function deleteDocumentInFolderRedux(documentID) {
  return async () => {
    try {
      if (!documentID) {
        return returnMessageError('Xóa tài liệu không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await deleteDocument(documentID);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.deleteDocumentInFolderSuccess({ documentID }));

      return returnMessageSuccess('Xóa tài liệu thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

export function deleteDocumentInStoreFolderRedux(documentID) {
  return async () => {
    try {
      if (!documentID) {
        return returnMessageError('Xóa tài liệu không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await deleteDocument(documentID);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.deleteDocumentInStoreFolderSuccess({ documentID }));

      return returnMessageSuccess('Xóa tài liệu thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

export function deleteSubFolderInFolderRedux(folderID) {
  return async () => {
    try {
      if (!folderID) {
        return returnMessageError('Xóa thư mục không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await deleteFolder(folderID);
      console.log('deleteSubFolderInFolderRedux', response);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.deleteSubFolderInFolderSuccess({ folderID }));

      return returnMessageSuccess('Xóa thư mục thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

export function deleteSubFolderInStoreFolderRedux(folderID) {
  return async () => {
    try {
      if (!folderID) {
        return returnMessageError('Xóa thư mục không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await deleteFolder(folderID);
      console.log('deleteSubFolderInFolderRedux', response);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.deleteSubFolderInStoreFolderSuccess({ folderID }));

      return returnMessageSuccess('Xóa thư mục thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

export function updateSubFolderRedux(id, params) {
  return async () => {
    try {
      if (!id || !params) {
        return returnMessageError('Cập nhật thư mục không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await updateFolder(id, params);
      console.log('updateFolderRedux', response);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.updateSubFolderSuccess({ id, params }));

      return returnMessageSuccess('Cập nhật thư mục thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

export function updateSubStoreFolderRedux(id, params) {
  return async () => {
    try {
      if (!id || !params) {
        return returnMessageError('Cập nhật thư mục không thành công');
      }
      dispatch(slice.actions.startLoading());
      const response = await updateFolder(id, params);
      console.log('updateFolderRedux', response);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.updateSubStoreFolderSuccess({ id, params }));

      return returnMessageSuccess('Cập nhật thư mục thành công');
    } catch (error) {
      console.log('error', error);
      return returnMessageError(`${error.message}`);
    }
  };
}

export function copyDocsToFolderRedux(folderId, docsId) {
  return async () => {
    try {
      if (!folderId || !docsId) {
        return returnMessageError('Thêm tài liệu thất bại ');
      }
      dispatch(slice.actions.startLoading());
      const response = await postCopyDocsToFolder(folderId, docsId);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.postCopyDocsToFolderSuccess(response.data.data));
      return returnMessageSuccess('Thêm tài liệu thành công');
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

export function copyDocsToStoreFolderRedux(folderId, docsId) {
  return async () => {
    try {
      if (!folderId || !docsId) {
        return returnMessageError('Thêm tài liệu thất bại ');
      }
      dispatch(slice.actions.startLoading());
      const response = await postCopyDocsToFolder(folderId, docsId);
      if (response instanceof Error) {
        return returnMessageError(`${response.response.data.title}`);
      }

      dispatch(slice.actions.postCopyDocsToStoreFolderSuccess(response.data.data));
      return returnMessageSuccess('Thêm tài liệu thành công');
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

export function createDocumentRedux(data) {
  return async () => {
    try {
      if (!data.file) {
        return returnMessageError(`Tạo tài liệu${data.code} thất bại`);
      }
      console.log('data', data);

      const responsePostDocument = await postDocument(data);
      if (responsePostDocument instanceof Error) {
        return returnMessageError(`${responsePostDocument.response.data.title}`);
      }
      dispatch(slice.actions.createDocumentSuccess({ document: responsePostDocument.data.data }));
      return returnMessageSuccess(`Tạo tài liệu${data.code} thành công`);
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}

export function createDocumentInSubjectRedux(data) {
  return async () => {
    try {
      if (!data.file) {
        return returnMessageError(`Tạo tài liệu${data.code} thất bại`);
      }
      console.log('data', data);

      const responsePostDocument = await postDocument(data);
      console.log('createDocumentInSubjectRedux', responsePostDocument);
      if (responsePostDocument instanceof Error) {
        return returnMessageError(`${responsePostDocument.response.data.title}`);
      }
      dispatch(slice.actions.createDocumentInSubjectSuccess({ document: responsePostDocument.data.data }));
      return {
        title: `Tạo tài liệu${data.code} thành công`,
        documentId: responsePostDocument.data.data.id,
        variant: '',
      };
    } catch (error) {
      return returnMessageError(`${error.message}`);
    }
  };
}
