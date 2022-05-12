import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';

import authContext from '../contexts/authContext/authContext';

const PublicRoute = () => {
  const { state } = useContext(authContext);
  return !state.user?.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
