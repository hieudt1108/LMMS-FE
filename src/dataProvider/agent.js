import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://lmms.site:8080/api/',
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

// GET API AREA ============================>
function getApi(url) {
  const token = getLocalStorage('access_token');
  return instance
    .get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : 'no auth',
      },
    })
    .then((res) => res)
    .catch((err) => err);
}

// CLASS
function getAllClass() {
  return getApi('/Class/getAll?pageIndex=1&pageSize=10');
}
function getClassbyId(id) {
  return getApi(`/Class/getOne/${id}`);
}

// GRADE
function getAllGrade(page, pageSize, searchByName, levelId) {
  return getApi(
    `/Grade/getAll?page=${page}&pageSize=${pageSize}&searchByName=${searchByName}&levelId=${levelId}`
  );
}
function getGradebyId(id) {
  return getApi(`/Grade/getOne/${id}`);
}

// LEVEL
function getAllLevel() {
  return getApi(`/Level/getAll`);
}
function getLevelById(id) {
  return getApi(`/Level/getOne/${id}`);
}
// USERS
function getAllUsers() {
  return getApi('/User/getAll');
}
// PROGRAM
function getAllProgram() {
  return getApi('/Program/getAll?page=1&pageSize=5');
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
  return postApi('api/Grade');
};

// LEVEL
const postLevel = () => {
  return postApi('Level');
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

//export api here

export {
  setLocalStorage,
  getLocalStorage,
  loginAuth,
  getAllClass,
  getClassbyId,
  getAllGrade,
  getAllUsers,
  getGradebyId,
  postClass,
  postGrade,
  postLevel,
  getAllLevel,
  getLevelById,
  getAllProgram,
};
