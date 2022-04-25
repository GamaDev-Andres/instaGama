import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Page404 from '../pages/page404/Page404';
import Searches from '../pages/search/components/Searches';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Spinner from '../components/Spinner';
import InsideChat from '../pages/insideChat/InsideChat';
import Account from '../pages/account/Account';
import FormLogin from '../pages/login/FormLogin';
import FormRegister from '../pages/register/FormRegister';
import { useContext, useEffect, useState } from 'react/cjs/react.development';
import authContext from '../contexts/authContext/authContext';
import ProfileProvider from '../pages/profile/context/ProfileProvider';
import PostPage from '../pages/post/PostPage';

const Home = lazy(() => import('../pages/home/Home'));
const Inbox = lazy(() => import('../pages/inbox/Inbox'));

const Search = lazy(() => import('../pages/search/Search'));
const ListOfPosts = lazy(() => import('../components/ListOfPosts'));
const GridPosts = lazy(() => import('../pages/profile/components/GridPosts'));
const GridExploreSearch = lazy(() =>
  import('../pages/search/components/GridExploreSearch')
);

const AppRouter = () => {
  const { renovarToken } = useContext(authContext);
  const [verificandoToken, setVerificandoToken] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      renovarToken().then((res) => {
        setVerificandoToken(false);
      });
    } else {
      setVerificandoToken(false);
    }
  }, []);
  if (verificandoToken) {
    return <Spinner fullScreen={true} />;
  }
  return (
    <Suspense fallback={<Spinner fullScreen={true} />}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/:id" element={<InsideChat />} />
          <Route path="/p/:id" element={<PostPage />} />
          <Route path="/search" element={<Search />}>
            <Route index element={<GridExploreSearch />} />
            <Route path="searching" element={<Searches />} />
          </Route>
          <Route path="/:user" element={<ProfileProvider />}>
            <Route index element={<GridPosts />} />
            <Route path="feed" element={<ListOfPosts />} />
          </Route>
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/account" element={<Account />}>
            <Route path="login" element={<FormLogin />} />
            <Route path="register" element={<FormRegister />} />
          </Route>
        </Route>

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
