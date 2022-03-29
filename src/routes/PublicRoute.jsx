import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = null;

  return !token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PublicRoute;
