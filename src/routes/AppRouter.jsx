import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useContext, useEffect, useState } from 'react';

import Page404 from '../pages/page404/Page404';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Spinner from '../components/Spinner';
import Account from '../pages/account/Account';
import FormLogin from '../pages/login/FormLogin';
import FormRegister from '../pages/register/FormRegister';
import authContext from '../contexts/authContext/authContext';
import PageComents from '../pages/pageComents/PageComents';
import PageComentProvider from '../pages/pageComents/context/PageComentProvider';

const InsideChat = lazy(() => import('../pages/insideChat/InsideChat'));
const PostPage = lazy(() => import('../pages/post/PostPage'));
const ProfileProvider = lazy(() =>
  import('../pages/profile/context/ProfileProvider')
);
const InboxProvider = lazy(() =>
  import('../pages/inbox/context/InboxProvider')
);
const Searches = lazy(() => import('../pages/search/components/Searches'));
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
          <Route path="/inbox" element={<InboxProvider />}>
            <Route index element={<Inbox />} />
            <Route path=":id" element={<InsideChat />} />
          </Route>
          <Route path="/p/:id" element={<PostPage />} />
          <Route
            path="/coments/:idPost"
            element={
              <PageComentProvider>
                <PageComents />
              </PageComentProvider>
            }
          />
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
