import {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ROUTER} from './Router';

// Admin

// document


//Program

const Login = lazy(() => import('./auth/pages/Login'));

// Calendar
// const CalendarApp = lazy(() => import("./calendar/pages/CalendarApp"));

// Core

// Landing

// Users
const AppRoutes = () => {
  return (
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path='/' element={null}/>
        <Route path='login' element={<Login/>}/>
        <Route path='*' element={<Navigate to={ROUTER[404]} replace/>}/>
      </Routes>
  );
};

export default AppRoutes;
