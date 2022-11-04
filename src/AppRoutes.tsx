import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER } from './Router';
import PrivateRoute from './core/components/PrivateRoute';
import ProtectedRoute from './core/components/ProtectedRoute.js';
// Admin
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));

const Classes = lazy(() => import('./admin/pages/Classes'));
const ClassDetail = lazy(() => import('./admin/pages/ClassDetail'));
// document
const DocumentbySyllabus = lazy(
  () => import('./document/pages/DocumentbySyllabus')
);
const Document = lazy(() => import('./document/pages/Sysllabus'));
const ViewDocumentDetail = lazy(
  () => import('./document/pages/ViewDocumentDetail')
);
//Program
const Program = lazy(() => import('./subsystem/pages/ProgramManagement'));
//Level
const Level = lazy(() => import('./level/pages/LevelManagement'));
//Grade
const Grade = lazy(() => import('./grade/pages/GradeManagement'));

const Login = lazy(() => import('./auth/pages/Login'));
const Admin = lazy(() => import('./admin/pages/Admin'));
const Faq = lazy(() => import('./admin/pages/Faq'));
const HelpCenter = lazy(() => import('./admin/pages/HelpCenter'));
const Home = lazy(() => import('./admin/pages/Home'));
const Profile = lazy(() => import('./admin/pages/Profile'));
const ProfileInformation = lazy(
  () => import('./admin/pages/ProfileInformation')
);
const ProfilePassword = lazy(() => import('./admin/pages/ProfilePassword'));
const UserManagement = lazy(() => import('./users/pages/UserManagement'));
const AddUser = lazy(() => import('./users/pages/AddUser'));
const EditUser = lazy(() => import('./users/pages/EditUser'));

// Core

// Sub system
const SubSystem = lazy(() => import('./subsystem/pages/SubSystem'));

// Landing
const Landing = lazy(() => import('./landing/pages/Landing'));
const LandingRoles = lazy(() => import('./landing/pages/LandingRoles'));

// Users
const AppRoutes = () => {
  return (
    <Routes basename={process.env.PUBLIC_URL}>
      <Route path='/' element={<Landing />} />
      <Route path='/roles' element={<LandingRoles />} />
      <Route path='login' element={<Login />} />
      <Route path='admin' element={<Admin />}>
        <Route path='/' element={<Home />} />
        <Route path='/sub-system/:id' element={<SubSystem />} />
        <Route path='/program' element={<Program />} />
        <Route path='/level-management' element={<Level />} />
        <Route path='/grade-management' element={<Grade />} />
        <Route path='/document' element={<Document />} />
        <Route path='/document/:subjectSlot' element={<DocumentbySyllabus />} />
        <Route
          path='/document/:subjectSlot/:id'
          element={<ViewDocumentDetail />}
        />
        <Route path='/classes' element={<Classes />} />

        <Route path='/class/:id' element={<ClassDetail />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='/user-management' element={<UserManagement />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/edituser' element={<EditUser />} />
        <Route path='profile' element={<Profile />}>
          <Route path='/' element={<ProfileInformation />} />
          <Route path='password' element={<ProfilePassword />} />
        </Route>

        <Route path='help' element={<HelpCenter />} />
      </Route>

      <Route path='*' element={<Navigate to={ROUTER[404]} replace />} />
    </Routes>
  );
};

export default AppRoutes;
