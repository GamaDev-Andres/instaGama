import { Outlet, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import DataProfile from './components/DataProfile';
import HeaderProfile from './components/HeaderProfile';
import OptionsOfView from './components/OptionsOfView';

const Profile = () => {
  const { user: nameUser } = useParams();
  return (
    <div className="flex flex-col  bg-fondoClaro">
      <Header text={nameUser} />
      <main className="flex flex-col min-h-screen max-w-[935px] mx-auto w-full p-0 md:px-4">
        <HeaderProfile />
        <DataProfile />
        <OptionsOfView />
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
