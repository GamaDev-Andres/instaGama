import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';

import authContext from '../contexts/authContext/authContext';
import NavBarPhone from '../components/NavBarPhone';
import SocketProvider from '../contexts/socketContext/SocketProvider';
import { useEffect } from 'react/cjs/react.development';

const PrivateRoute = () => {
  const { state } = useContext(authContext);
  const arrNeedNavBarPhone = ['/', '/search', '/search/searching'];
  const { user } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    return () => {
      localStorage.removeItem('recents');
    };
  }, []);

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
