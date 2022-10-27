export const ROUTER = {
  UNDER_CONSTRUCTION: `/${process.env.PUBLIC_URL}/under-construction`,

  ADMIN: `/${process.env.PUBLIC_URL}/admin`,
  ADMIN_CLASS_DETAIL: `/${process.env.PUBLIC_URL}/admin/class/:id`,
  ADMIN_PROFILE: `/${process.env.PUBLIC_URL}/admin/profile`,
  ADMIN_DOCUMENT: `/${process.env.PUBLIC_URL}/admin/document`,
  ADMIN_DOUCUMENT_SUBJECT: `/${process.env.PUBLIC_URL}/admin/document/:subjectSlot`,
  ADMIN_DOUCUMENT_SUBJECT_DETAIL: `/${process.env.PUBLIC_URL}/admin/document/:subjectSlot/:id`,
  ADMIN_HELP: `/${process.env.PUBLIC_URL}/admin/help`,
  ADMIN_FAP: `/${process.env.PUBLIC_URL}/admin/faq`,
  ADMIN_PAGE_FAQ: `/${process.env.PUBLIC_URL}/admin/pages/Faq`,
  ADMIN_USER_MANAGEMENT: `/${process.env.PUBLIC_URL}/admin/user-management`,
  ADMIN_DASHBOARD: `/${process.env.PUBLIC_URL}/admin/dashboard`,
  ADMIN_SUBSYSTEM: `/${process.env.PUBLIC_URL}/admin/sub-system/:id`,
  ROLES: `/${process.env.PUBLIC_URL}/roles`,
  LANDING: `/${process.env.PUBLIC_URL}/`,

  LOGIN: `/${process.env.PUBLIC_URL}/login`,
  FORGOT_PASSWORD_SUBMIT: `/${process.env.PUBLIC_URL}/forgot-password-submit`,
  FORGOT_PASSWORD: `/${process.env.PUBLIC_URL}/forgot-password`,
  '403': `/${process.env.PUBLIC_URL}/403`,
  '404': `/${process.env.PUBLIC_URL}/404`,
};
