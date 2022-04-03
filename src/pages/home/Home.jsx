import Header from '../../components/Header';
import ListOfPosts from '../../components/ListOfPosts';
import Histories from './components/Histories';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Header>
        <h1 className="font-black italic text-xl">InstaGama</h1>
      </Header>
      <div className="max-w-[600px] flex flex-col gap-0 sm:gap-8 mx-auto">
        <Histories />
        <ListOfPosts />
      </div>
    </main>
  );
};

export default Home;
