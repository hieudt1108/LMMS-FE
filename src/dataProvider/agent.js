import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7287/api/',
  timeout: 3000,
});
import {PATH_AUTH} from '../routes/paths';
import {useRouter} from 'next/router';
import {idID} from '@mui/material/locale';

// INTERCEPTORS CONFIG START
instance.interceptors.response.use(responseOnSuccessMiddleware,
    responseOnErrorMiddleware);

function responseOnSuccessMiddleware(res) {
  return res;
}

function responseOnErrorMiddleware(error) {
  const {status} = error.response;
  if (status === 401) {
    localStorage.clear();
    window.location.href = PATH_AUTH.login;
  }
  return error;
}

// INTERCEPTORS CONFIG END

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key));
  }
};

const clearLocalStorage = () => {
  localStorage.clear();
};

// GET API AREA ============================>
async function getApi(url, params) {
  // delete all params fail
  const paramObj = {};
  if (params && Object.keys(params).length) {
    Object.keys(params).forEach(function (key) {
      if (params[key]) {
        paramObj[key] = params[key];
      }
    });
  }

  const token = getLocalStorage('access_token');
  try {
    const res = await instance.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no auth',
      },
      params: paramObj,
    });
    return res;
  } catch (err) {
    return err;
  }
}

// CLASS
//class ADMIN
function getAllClass(params) {
  return getApi('/Class/getAll', params);
}

//class USER
function getAllMyClass(params) {
  return getApi('/Class/myClass/getAll', params);
}

function getMyClassGetOne(id) {
  return getApi(`/Class/myClass/getOne/${id}`);
}

function getClassById(id) {
  return getApi(`/Class/getOne/${id}`);
}

// SUBJECT
function getAllSubject(params) {
  return getApi('/Subject/getAll', params);
}

function getSubjectById(id) {
  return getApi(`/Subject/getOne/${id}`);
}

// GRADE
function getAllGrade(params) {
  return getApi(`/Grade/getAll`, params);
}

function getGradeById(id) {
  return getApi(`/Grade/getOne/${id}`);
}

// LEVEL
function getMenu() {
  return getApi(`/Auth/getMenuItems`);
}

// LEVEL
function getAllLevel(params) {
  return getApi(`/Level/getAll`, params);
}

function getLevelById(id) {
  return getApi(`/Level/getOne/${id}`);
}

// USERS
function getAllUsers(params) {
  return getApi('/User/getAll', params);
}

function getUserById(id) {
  return getApi(`/User/getOne/${id}`);
}

// PROGRAM
function getAllProgram(params) {
  return getApi('/Program/getAll', params);
}

function getProgramById(id) {
  return getApi(`/Program/getOne/${id}`);
}

// DOCUMENT
function getAllDocument(params) {
  return getApi('/Document/getAllDocumentsPublic', params);
}

function getDocumentShareWithMe(params) {
  return getApi('Document/getAllMyDocumentsShareWithMe', params);
}

// TYPE DOCUMENT
function getAllTypeDocument(params) {
  return getApi('/TypeDocument/getAll', params);
}

function getTypeDocumentById(id) {
  return getApi(`/TypeDocument/getOne/${id}`);
}

// SLOT

function getAllSlot(params) {
  return getApi('/Slot/getAll', params);
}

function getSlotById(id) {
  return getApi(`/Slot/getOne/${id}`);
}

// ROLES
function getALlRoles(params) {
  return getApi('/Role/getAll', params);
}

function getRoleById(id) {
  return getApi(`/Role/getOne/${id}`);
}

// Permission
function getAllPermission(params) {
  return getApi('/Permission/getAll', params);
}

// Folder
function getFolderByID(id) {
  return getApi(`/Folder/getOne/${id}`);
}

function getPermissionById(id) {
  return getApi(`/Permission/getOne/${id}`);
}

// POST API AREA ============================>
async function postApi(url, payload, file) {
  const token = getLocalStorage('access_token');
  try {
    const res = await instance.post(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
        'Content-Type': file ? 'multipart/form-data'
            : 'application/json; charset=utf-8',
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

// LOGIN
const loginAuth = (payload) => {
  return postApi('Auth/login', payload);
};

// CLASS
const postClass = (payload) => {
  return postApi('Class', payload);
};

// GRADE
const postGrade = () => {
  return postApi('Grade');
};

// LEVEL
const postLevel = () => {
  return postApi('Level');
};

const postFile = (payload) => {
  return postApi('File/UploadFile', payload, 1);
};

// Program
const createProgram = (payload) => {
  return postApi('Program', payload);
};

// Level
const createLevel = (payload) => {
  return postApi('Level', payload);
};

// Grade
const createGrade = (payload) => {
  return postApi('Grade', payload);
};

// Subject
const createSubject = (payload) => {
  return postApi('Subject', payload);
};

// Slot
const createSlot = (payload) => {
  return postApi('Slot', payload);
};

// User Auth
const createUserAuth = (payload) => {
  return postApi('Auth/registerSingleUser', payload);
};

// ROLE
const createRole = (payload) => {
  return postApi('Role', payload);
};

// Permission
const createPermission = (payload) => {
  return postApi('Permission', payload);
};

// UPLOAD FILE
const uploadFile = (payload) => {
  return postApi('File/uploadFile', payload);
};
// DOCUMENT
const postDocument = (payload) => {
  return postApi('Document', payload);
};
// Folder
const postFolder = (payload) => {
  return postApi('Folder', payload);
};

// TYPE_DOCUMENT
const postTypeDocument = (payload) => {
  return postApi('TypeDocument', payload);
};

// DELETE API AREA ============================>
async function deleteApi(url) {
  const token = getLocalStorage('access_token');

  try {
    const res = await instance.delete(`/${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

// PROGRAM
const deleteProgram = (id) => {
  return deleteApi(`Program/${id}`);
};
// USER
const deleteUser = (id) => {
  return deleteApi(`User/${id}`);
};
// LEVEL
const deleteLevel = (id) => {
  return deleteApi(`Level/${id}`);
};

// GRADE
const deleteGrade = (id) => {
  return deleteApi(`Grade/${id}`);
};

// SUBJECT
const deleteSubject = (id) => {
  return deleteApi(`Subject/${id}`);
};

// SLOT
const deleteSlot = (id) => {
  return deleteApi(`Slot/${id}`);
};

// TYPE_DOCUMENT
const deleteTypeDocument = (id) => {
  return deleteApi(`TypeDocument/${id}`);
};

// ROLE
const deleteRole = (id) => {
  return deleteApi(`Role/${id}`);
};

// Permission
const deletePermission = (id) => {
  return deleteApi(`Permission/${id}`);
};

// PUT API AREA ============================>
async function putApi(url, payload) {
  const token = getLocalStorage('access_token');
  try {
    const res = await instance.put(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}

// PROGRAM
const updateProgram = (id, payload) => {
  return putApi(`Program/${id}`, payload);
};

// LEVEL
const updateLevel = (id, payload) => {
  return putApi(`Level/${id}`, payload);
};

// GRADE
const updateGrade = (id, payload) => {
  return putApi(`Grade/${id}`, payload);
};

// SUBJECT
const updateSubject = (id, payload) => {
  return putApi(`Subject/${id}`, payload);
};

// SLOT
const updateSlot = (id, payload) => {
  return putApi(`Slot/${id}`, payload);
};

// TYPE_DOCUMENT
const updateTypeDocument = (id, payload) => {
  return putApi(`TypeDocument/${id}`, payload);
};

// USER
const updateUser = (id, payload) => {
  return putApi(`User/${id}`, payload);
};

const changePasswordUserAuth = (payload) => {
  return putApi('Auth/resetPassword', payload);
};

// ROLE
const updateRole = (id, payload) => {
  return putApi(`Role/${id}`, payload);
};

// Permission
const updatePermission = (id, payload) => {
  return putApi(`Permission/${id}`, payload);
};

//export api here

function addParameter(url, params) {
  if (url) {
    Object.keys(params).forEach(function (key, index) {
      if (params[key]) {
        url = url.concat(`params[key]`);
      }
    });
  }
}

export {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  loginAuth,
  getAllClass,
  getClassById,
  getAllSubject,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  postClass,
  getAllGrade,
  getALlRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  createGrade,
  deleteGrade,
  updateGrade,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUserAuth,
  changePasswordUserAuth,
  getGradeById,
  postGrade,
  getAllLevel,
  createLevel,
  updateLevel,
  deleteLevel,
  getLevelById,
  getAllProgram,
  getProgramById,
  deleteProgram,
  updateProgram,
  createProgram,
  getAllDocument,
  uploadFile,
  postFile,
  getAllSlot,
  getSlotById,
  createSlot,
  updateSlot,
  deleteSlot,
  getAllTypeDocument,
  getTypeDocumentById,
  postTypeDocument,
  deleteTypeDocument,
  updateTypeDocument,
  postDocument,
  postLevel,
  getAllPermission,
  getFolderByID,
  postFolder,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
  getAllMyClass,
  getMyClassGetOne,
  getDocumentShareWithMe,
  getMenu,
};
