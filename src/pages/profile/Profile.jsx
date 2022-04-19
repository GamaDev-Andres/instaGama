import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useState, useRef } from 'react';

import Header from '../../components/Header';
import DataProfile from './components/DataProfile';
import HeaderProfile from './components/HeaderProfile';
import OptionsOfView from './components/OptionsOfView';
import Spinner from '../../components/Spinner';
import { useAuthContext } from '../../hooks/useAuthContext';

const Profile = () => {
  const { user: userName } = useParams();
  const { logOut, getOneUser } = useAuthContext();
  const [userProfile, setUserProfile] = useState(null);
  const isMounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    getOneUser(userName).then((res) => {
      if (!res?.usuario) {
        navigate('/');
        return;
      }
      if (isMounted.current) {
        setUserProfile(res.usuario);
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);
  if (!userProfile) {
    return <Spinner fullScreen={true} />;
  }
  return (
    <div className="flex flex-col  bg-fondoClaro">
      <Header>
        <div className="center w-full relative">
          <button
            onClick={logOut}
            className="center absolute top-0 bottom-0 left-0 px-4"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          <h1 className="font-black italic text-xl">{userName}</h1>
        </div>
      </Header>
      <main className="flex flex-col min-h-screen max-w-[935px] mx-auto w-full p-0 md:px-4">
        <HeaderProfile foto={userProfile?.foto} name={userProfile?.name} />
        <DataProfile
          following={userProfile.following}
          followers={userProfile.followers}
          posts={userProfile.posts}
        />
        <OptionsOfView />
        <Suspense fallback={<Spinner />}>
          <Outlet context={{ posts: userProfile?.posts }} />
        </Suspense>
      </main>
    </div>
  );
};

export default Profile;
