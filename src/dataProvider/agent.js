import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://lmms.site:9090/api/',
  timeout: 3000,
});
import { PATH_AUTH } from '../routes/paths';
import { useRouter } from 'next/router';

// INTERCEPTORS CONFIG START
instance.interceptors.response.use(responseOnSuccessMiddleware, responseOnErrorMiddleware);

function responseOnSuccessMiddleware(res) {
  return res;
}

function responseOnErrorMiddleware(error) {
  const { status } = error.response;
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
  if (params && Object.keys(params).length)
    Object.keys(params).forEach(function (key) {
      if (params[key]) {
        paramObj[key] = params[key];
      }
    });

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
function getAllClass(params) {
  return getApi('/Class/getAll', params);
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
// TYPE DOCUMENT
function getAllTypeDocument(params) {
  return getApi('/TypeDocument/getAll', params);
}

// SLOT
function getALlSlot() {
  return getApi('/Slot/getAll?pageIndex=1&pageSize=1000');
}

// ROLES
function getALlRoles(params) {
  return getApi('/Role/getAll', params);
}
// Permission
function getAllPermission(params) {
  return getApi('/Permission/getAll', params);
}

// Folder
function getFolderByID(id) {
  return getApi(`/Folder/getOne/${id}`);
}
// POST API AREA ============================>
async function postApi(url, payload, file) {
  const token = getLocalStorage('access_token');
  try {
    const res = await instance.post(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
        'Content-Type': file ? 'multipart/form-data' : 'application/json; charset=utf-8',
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

// User Auth
const createUserAuth = (payload) => {
  return postApi('Auth/registerSingleUser', payload);
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

// USER
const updateUser = (id, payload) => {
  return putApi(`User/${id}`, payload);
};
//export api here

function addParameter(url, params) {
  if (url)
    Object.keys(params).forEach(function (key, index) {
      if (params[key]) {
        url = url.concat(`params[key]`);
      }
    });
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
  createGrade,
  deleteGrade,
  updateGrade,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUserAuth,
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
  getALlSlot,
  getAllTypeDocument,
  postDocument,
  postLevel,
  getAllPermission,
  getFolderByID,
  postFolder,
};
