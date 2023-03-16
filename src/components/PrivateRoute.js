import React from 'react';
import { Navigate } from 'react-router';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const jwtToken = Cookies.get('JWT_TOKEN');
  return jwtToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;