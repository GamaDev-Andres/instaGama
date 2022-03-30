import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import authContext from '../contexts/authContext/authContext';
import NavBarPhone from '../components/NavBarPhone';

const PrivateRoute = () => {
  const { state } = useContext(authContext);
  const arrNeedNavBarPhone = ['/', '/profile', '/search'];
  const { pathname } = useLocation();
  return state.token ? (
    <>
      <Outlet />
      {arrNeedNavBarPhone.includes(pathname) && <NavBarPhone />}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
