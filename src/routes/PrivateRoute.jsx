import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';
import authContext from '../contexts/authContext/authContext';
import NavBarPhone from '../components/NavBarPhone';

const PrivateRoute = () => {
  const { state } = useContext(authContext);
  const arrNeedNavBarPhone = ['/', '/search', '/search/searching'];
  const { user } = useParams();
  const { pathname } = useLocation();
  return state.user?.token ? (
    <>
      <Outlet />
      {(arrNeedNavBarPhone.includes(pathname) || user) && <NavBarPhone />}
    </>
  ) : (
    <Navigate to="/account/login" replace />
  );
};

export default PrivateRoute;
