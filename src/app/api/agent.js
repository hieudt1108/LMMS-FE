import axios from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 3000,
});

// INTERCEPTORS CONFIG START
instance.interceptors.response.use(responseOnSuccessMiddleware, responseOnErrorMiddleware);

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

function getSumaryInfo() {
  return getApi('api/home/summary/');
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

export //export api here
 {};
