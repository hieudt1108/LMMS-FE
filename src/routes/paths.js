// ----------------------------------------------------------------------

import { is } from 'date-fns/locale';

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  about: '/about-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  class: {
    root: path(ROOTS_DASHBOARD, '/class'),
    detail: (class_id) => path(ROOTS_DASHBOARD, `/class/${class_id}`),
    new: path(ROOTS_DASHBOARD, '/class/new'),
    edit: (class_id) => path(ROOTS_DASHBOARD, `/class/${class_id}/edit`),
    addStudent: (class_id) => path(ROOTS_DASHBOARD, `/class/${class_id}/addStudent`),
    subject: (class_id, subject_id) => path(ROOTS_DASHBOARD, `/class/${class_id}/${subject_id}`),
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    file: path(ROOTS_DASHBOARD, '/file/root'),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  program: {
    choose: path(ROOTS_DASHBOARD, '/program'),
    root: path(ROOTS_DASHBOARD, '/program/manage'),
    new: path(ROOTS_DASHBOARD, '/program/manage/new'),
    list: path(ROOTS_DASHBOARD, '/program/manage/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/program/${name}/edit`),
    level: (id) => path(ROOTS_DASHBOARD, `/program/level/${id}`),
    gradeSub: (id, classId) => path(ROOTS_DASHBOARD, `/program/gradeSub/${id}/${classId}`),
  },
  grade: {
    root: path(ROOTS_DASHBOARD, '/grade'),
    new: path(ROOTS_DASHBOARD, '/grade/new'),
    list: path(ROOTS_DASHBOARD, '/grade/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/grade/${name}/edit`),
  },
  level: {
    root: path(ROOTS_DASHBOARD, '/level'),
    new: path(ROOTS_DASHBOARD, '/level/new'),
    list: path(ROOTS_DASHBOARD, '/level/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/level/${name}/edit`),
  },
  subject: {
    root: path(ROOTS_DASHBOARD, '/subject'),
    new: path(ROOTS_DASHBOARD, '/subject/new'),
    list: path(ROOTS_DASHBOARD, '/subject/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/subject/${name}/edit`),
  },
  documents: {
    root: path(ROOTS_DASHBOARD, '/documents'),
    posts: path(ROOTS_DASHBOARD, '/documents/document/posts'),
    new: path(ROOTS_DASHBOARD, '/documents/document/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/documents/document/post/${id}`),
    demoView: path(ROOTS_DASHBOARD, '/documents/document/post/apply-these-7-secret-techniques-to-improve-event'),
  },
  type_documents: {
    root: path(ROOTS_DASHBOARD, '/typeDocs'),
    new: path(ROOTS_DASHBOARD, '/typeDocs/new'),
    list: path(ROOTS_DASHBOARD, '/typeDocs/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/typeDocs/${name}/edit`),
  },
};

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/OBEorYicjdbIT6P1YQTTK7/%5BPreview%5D-Minimal-Web.15.10.22?node-id=0%3A1';
