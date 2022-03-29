import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import Inbox from '../pages/inbox/Inbox';
import Login from '../pages/login/Login';
import Page404 from '../pages/page404/Page404';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/:user" element={<Profile />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRouter;
