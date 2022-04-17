import { Outlet, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '../../components/Header';
import DataProfile from './components/DataProfile';
import HeaderProfile from './components/HeaderProfile';
import OptionsOfView from './components/OptionsOfView';
import Spinner from '../../components/Spinner';
import { useAuthContext } from '../../hooks/useAuthContext';

const Profile = () => {
  const { user: nameUser } = useParams();
  const { logOut } = useAuthContext();

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
          <h1 className="font-black italic text-xl">{nameUser}</h1>
        </div>
      </Header>
      <main className="flex flex-col min-h-screen max-w-[935px] mx-auto w-full p-0 md:px-4">
        <HeaderProfile />
        <DataProfile />
        <OptionsOfView />
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Profile;
