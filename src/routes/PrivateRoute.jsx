import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';
import authContext from '../contexts/authContext/authContext';
import NavBarPhone from '../components/NavBarPhone';

const PrivateRoute = () => {
  const { state } = useContext(authContext);
  const arrNeedNavBarPhone = ['/', '/search', '/search/searching'];
  const { user } = useParams();
  const { pathname } = useLocation();
  return state.token ? (
    <>
      <Outlet />
      {(arrNeedNavBarPhone.includes(pathname) || user) && <NavBarPhone />}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
