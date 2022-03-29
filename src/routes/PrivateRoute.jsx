import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = null;

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
