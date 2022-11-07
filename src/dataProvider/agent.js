import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://lmms.site:9090/api/',
  timeout: 3000,
});

// INTERCEPTORS CONFIG START
instance.interceptors.response.use(
  responseOnSuccessMiddleware,
  responseOnErrorMiddleware
);

function responseOnSuccessMiddleware(res) {
  return res;
}

function responseOnErrorMiddleware(error) {
  const { status } = error.response;
  if (status === 401) {
    localStorage.clear();
  }
  return error;
}

// INTERCEPTORS CONFIG END

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const clearLocalStorage = () => {
  localStorage.clear();
};

// GET API AREA ============================>
function getApi(url, params) {
  const token = getLocalStorage('access_token');
  return instance
    .get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no auth',
      },
      params: params,
    })
    .then((res) => res)
    .catch((err) => err);
}

// CLASS
function getAllClass(params) {
  return getApi('/Class/getAll', params);
}
function getClassById(id) {
  return getApi(`/Class/getOne/${id}`);
}

function getAllSubjectInClass(params) {
  return getApi('/Class/getAll', params);
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
function getAllUsers() {
  return getApi('/User/getAll');
}
// PROGRAM
function getAllProgram(params) {
  return getApi('/Program/getAll', params);
}

// DDOCUMENT
function getAllDocument() {
  return getApi('/Document/getAllDocumentsPublic?pageIndex=1&pageSize=50');
}

function getAllTypeDocument() {
  return getApi('/TypeDocument/getAll?pageIndex=1&pageSize=1000');
}

// SLOT
function getALlSlot() {
  return getApi('/Slot/getAll?pageIndex=1&pageSize=1000');
}

// ROLES
function getALlRoles(params) {
  return getApi('/Role/getAll', params);
}

// POST API AREA ============================>
function postApi(url, payload, file) {
  const token = getLocalStorage('access_token');
  return instance
    .post(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
        'content-type': file ? 'multipart/form-data' : 'application/json',
      },
    })
    .then((res) => res)
    .catch((err) => err);
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

// DELETE API AREA ============================>
function deleteApi(url) {
  const token = getLocalStorage('access_token');

  return instance
    .delete(`/${url}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
      },
    })
    .then((res) => res)
    .catch((err) => err);
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
// PUT API AREA ============================>
function putApi(url, payload) {
  const token = getLocalStorage('access_token');
  return instance
    .put(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
      },
    })
    .then((res) => res)
    .catch((err) => err);
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
  getAllSubjectInClass,
  postClass,
  getAllGrade,
  getALlRoles,
  createGrade,
  deleteGrade,
  updateGrade,
  getAllUsers,
  deleteUser,
  createUserAuth,
  getGradeById,
  postGrade,
  getAllLevel,
  createLevel,
  updateLevel,
  deleteLevel,
  getLevelById,
  getAllProgram,
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
};
