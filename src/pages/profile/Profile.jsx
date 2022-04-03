import { Outlet, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '../../components/Header';
import DataProfile from './components/DataProfile';
import HeaderProfile from './components/HeaderProfile';
import OptionsOfView from './components/OptionsOfView';
import Spinner from '../../components/Spinner';

const Profile = () => {
  const { user: nameUser } = useParams();
  return (
    <div className="flex flex-col  bg-fondoClaro">
      <Header>
        <h1 className="font-black italic text-xl">{nameUser}</h1>
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
