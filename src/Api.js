import axios from "axios";

const instance = axios.create({
  baseURL: "https://virtserver.swaggerhub.com/mrxcnh/LMS-akadon/0.0.1/",
  timeout: 3000,
});

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

function getApi(url) {
  const token = getLocalStorage("access_token");
  return instance
    .get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "no auth",
      },
    })
    .then((res) => res)
    .catch((err) => err);
}

function getSumaryInfo() {
  return getApi("api/home/summary/");
}

function getAllClassroom() {
  return getApi("api/study_class/all/");
}

function getClassRoomById(id) {
  return getApi(`api/study_class/${id}/`);
}

function getLessonById(id) {
  return getApi(`api/lesson/${id}/`);
}
function getCheckIn(lesonId) {
  return getApi(`api/lesson/${lesonId}/checkin/`);
}

function downLoadDoc(lesonId, fileId, fileName) {
  const token = getLocalStorage("access_token");
  return instance
    .get(`api/lesson/${lesonId}/docs/${fileId}/`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => err);
}

function postApi(url, payload) {
  const token = getLocalStorage("access_token");
  return instance
    .post(`/${url}`, payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "no-author",
      },
    })
    .then((res) => res)
    .catch((err) => err);
}

const login = (payload) => {
  return postApi("api/users/login/email/", payload);
};

const logout = () => {
  return postApi("api/users/logout/", {});
};

const uploadDoc = (lesonId, payload) => {
  return postApi(`api/lesson/${lesonId}/docs/upload/`, payload);
};

const getStudentList = (courseId) => {
  return postApi(`api/course/${courseId}/student_list/`);
};

const deleteDoc = (lessonId, fileId) => {
  const token = getLocalStorage("access_token");
  return instance
    .delete(`api/lesson/${lessonId}/docs/${fileId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
};

const putCheckIn = (lessonId, payload) => {
  const token = getLocalStorage("access_token");
  return instance
    .put(`api/lesson/${lessonId}/checkin/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .catch((err) => err);
};

export {
  getSumaryInfo,
  getAllClassroom,
  getClassRoomById,
  login,
  logout,
  setLocalStorage,
  getLocalStorage,
  getLessonById,
  uploadDoc,
  deleteDoc,
  downLoadDoc,
  getStudentList,
  putCheckIn,
  getCheckIn,
};
