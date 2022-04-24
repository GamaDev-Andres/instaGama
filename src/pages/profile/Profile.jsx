import Header from '../../components/Header';
import DataProfile from './components/DataProfile';
import HeaderProfile from './components/HeaderProfile';
import OptionsOfView from './components/OptionsOfView';
import { useAuthContext } from '../../hooks/useAuthContext';
import useProfile from './hook/useProfile';
import propTypes from 'prop-types';

const Profile = ({ children }) => {
  const { logOut } = useAuthContext();
  const { state: userProfile } = useProfile();

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
          <h1 className="font-black italic text-xl">{userProfile?.userName}</h1>
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
        {children}
      </main>
    </div>
  );
};
Profile.propTypes = {
  children: propTypes.any,
};
export default Profile;
