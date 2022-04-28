import Spinner from '../../../components/Spinner';
import useInboxContext from '../hook/useInboxContext';
import Chat from './Chat';

const ListOfChats = () => {
  const { chats } = useInboxContext();

  if (!chats) {
    return <Spinner fullScreen={true} />;
  }

  return (
    <main className="pt-2 flex flex-col">
      {chats.map((el) => (
        <Chat data={el} key={el._id} />
      ))}
    </main>
  );
};

export default ListOfChats;
