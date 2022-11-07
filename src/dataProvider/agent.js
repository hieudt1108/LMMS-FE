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
function getAllLevel() {
  return getApi(`/Level/getAll?page=1&pageSize=10`);
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
  return getApi('/Document/getAll?pageIndex=1&pageSize=50');
}

// POST API AREA ============================>
function postApi(url, payload) {
  const token = getLocalStorage('access_token');
  return instance
    .post(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no-author',
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

// Program
const createProgram = (payload) => {
  return postApi('Program', payload);
};

// User Auth
const createUserAuth = (payload) => {
  return postApi('Auth/registerSingleUser', payload);
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
  getAllUsers,
  createUserAuth,
  getGradeById,
  postGrade,
  postLevel,
  getAllLevel,
  getLevelById,
  getAllProgram,
  deleteProgram,
  updateProgram,
  createProgram,
  getAllDocument,
};
