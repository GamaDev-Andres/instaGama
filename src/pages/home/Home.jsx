import Header from '../../components/Header';
import ListOfPosts from '../../components/ListOfPosts';
import { useAuthContext } from '../../hooks/useAuthContext';
import Histories from './components/Histories';

const Home = () => {
  const {
    state: {
      user: { posts },
    },
  } = useAuthContext();

  return (
    <main className="min-h-screen">
      <Header>
        <h1 className="font-black italic text-xl">InstaGama</h1>
      </Header>
      <div className="max-w-[600px] min-h-[calc(100vh-45px)] flex flex-col gap-0 sm:gap-8 mx-auto">
        <Histories />
        <ListOfPosts arrPosts={posts} />
      </div>
    </main>
  );
};

export default Home;
