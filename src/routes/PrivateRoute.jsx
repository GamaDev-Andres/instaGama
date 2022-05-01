import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';
import authContext from '../contexts/authContext/authContext';
import NavBarPhone from '../components/NavBarPhone';
import SocketProvider from '../contexts/socketContext/SocketProvider';

const PrivateRoute = () => {
  const { state } = useContext(authContext);
  const arrNeedNavBarPhone = ['/', '/search', '/search/searching'];
  const { user } = useParams();
  const { pathname } = useLocation();
  return state.user?.token ? (
    <SocketProvider>
      <Outlet />
      {(arrNeedNavBarPhone.includes(pathname) || user) && <NavBarPhone />}
    </SocketProvider>
  ) : (
    <Navigate to="/account/login" replace />
  );
};

export default PrivateRoute;
