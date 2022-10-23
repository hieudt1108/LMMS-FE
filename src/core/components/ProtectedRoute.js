import React from 'react';
import { Route, Redirect } from 'react-router';

export default function ProtectedRoute({ component: Component, ...props }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  function renderRoute(props) {
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to='/login' />
    );
  }
  return <Route {...props} render={renderRoute} />;
}
