import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTER } from './Router';
import ProtectedRoute from './core/components/ProtectedRoute.js';
// Admin

// document

//Program

const Login = lazy(() => import('./auth/pages/Login'));

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
      <Route path='*' element={<Navigate to={ROUTER[404]} replace />} />
    </Routes>
  );
};

export default AppRoutes;
