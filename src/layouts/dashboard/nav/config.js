// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
import AutoStoriesIcon from '@mui/material/';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  class: icon('ic_classroom'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Chung',
    items: [
      { title: 'app--Template', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'ecommerce--Template', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'analytics--Template', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'banking--Template', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'booking--Template', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      { title: 'Lớp học', path: PATH_DASHBOARD.class.all, icon: ICONS.class },
      { title: 'Học liệu', path: PATH_DASHBOARD.general.file, icon: ICONS.file },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Quản lý hệ thống',
    items: [
      // USER
      {
        title: 'Người dùng',
        path: PATH_DASHBOARD.user.list,
        icon: ICONS.user,
      },

      {
        title: 'Chương trình học',
        path: PATH_DASHBOARD.program.list,
        icon: ICONS.kanban,
      },

      {
        title: 'Cấp học',
        path: PATH_DASHBOARD.level.list,
        icon: ICONS.menuItem,
      },

      {
        title: 'Khối học',
        path: PATH_DASHBOARD.grade.list,
        icon: ICONS.label,
      },

      // BLOG
      {
        title: 'Tài liệu',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      {
        title: 'File manager',
        path: PATH_DASHBOARD.fileManager,
        icon: ICONS.folder,
      },
    ],
  },
];

export default navConfig;
