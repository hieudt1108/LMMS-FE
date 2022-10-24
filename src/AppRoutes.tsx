import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER } from './Router';
import PrivateRoute from "./core/components/PrivateRoute";
import ProtectedRoute from './core/components/ProtectedRoute.js';
// Admin

// document

//Program

const Login = lazy(() => import('./auth/pages/Login'));
const Admin = lazy(() => import("./admin/pages/Admin"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Faq = lazy(() => import("./admin/pages/Faq"));
const HelpCenter = lazy(() => import("./admin/pages/HelpCenter"));
const Home = lazy(() => import("./admin/pages/Home"));
const Profile = lazy(() => import("./admin/pages/Profile"));
// Calendar
// const CalendarApp = lazy(() => import("./calendar/pages/CalendarApp"));

// Core

// Landing
const Landing = lazy(() => import('./landing/pages/Landing'));

// Users
const AppRoutes = () => {
  return (
    <Routes basename={process.env.PUBLIC_URL}>
      <Route path='/' element={<Landing />} />
      <Route path='login' element={<Login />} />
        <Route path='admin' element={<Admin />} />
        <Route path='home' element={<Home />} />
        <Route path='login' element={<Login />} />
        {/*<PrivateRoute path="admin" element={<Admin />}>*/}
        {/*    <PrivateRoute path="/" element={<Home />} />*/}
        {/*    <PrivateRoute path="dashboard" element={<Dashboard />} />*/}
        {/*    <PrivateRoute path="faq" element={<Faq />} />*/}
        {/*    <PrivateRoute path="help" element={<HelpCenter />} />*/}

        {/*</PrivateRoute>*/}
      <Route path='*' element={<Navigate to={ROUTER[404]} replace />} />
    </Routes>
  );
};

export default AppRoutes;
