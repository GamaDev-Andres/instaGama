import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react/cjs/react.development';
import { Suspense } from 'react';

import Login from '../pages/login/Login';
import Page404 from '../pages/page404/Page404';
import Register from '../pages/register/Register';
import Searches from '../pages/search/components/Searches';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Spinner from '../components/Spinner';

const Home = lazy(() => import('../pages/home/Home'));
const Inbox = lazy(() => import('../pages/inbox/Inbox'));
const Profile = lazy(() => import('../pages/profile/Profile'));
const Search = lazy(() => import('../pages/search/Search'));
const ListOfPosts = lazy(() => import('../components/ListOfPosts'));
const GridPosts = lazy(() => import('../pages/profile/components/GridPosts'));
const GridExploreSearch = lazy(() =>
  import('../pages/search/components/GridExploreSearch')
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner fullScreen={true} />}>
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
    </Suspense>
  );
};

export default AppRouter;
