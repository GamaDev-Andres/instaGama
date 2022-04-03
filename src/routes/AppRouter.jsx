import { Route, Routes } from 'react-router-dom';
import ListOfPosts from '../components/ListOfPosts';
import Home from '../pages/home/Home';
import Inbox from '../pages/inbox/Inbox';
import Login from '../pages/login/Login';
import Page404 from '../pages/page404/Page404';
import GridPosts from '../pages/profile/components/GridPosts';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import GridExploreSearch from '../pages/search/components/GridExploreSearch';
import Searches from '../pages/search/components/Searches';
import Search from '../pages/search/Search';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/search" element={<Search />}>
          <Route index element={<GridExploreSearch />} />
          <Route path="searching" element={<Searches />} />
        </Route>
        <Route path="/:user" element={<Profile />}>
          <Route index element={<GridPosts />} />
          <Route path="feed" element={<ListOfPosts />} />
        </Route>
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
