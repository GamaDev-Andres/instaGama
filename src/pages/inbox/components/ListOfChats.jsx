import Chat from './Chat';

const ListOfChats = () => {
  return (
    <main className="pt-2 flex flex-col">
      {[1, 2, 3, 4].map((el) => (
        <Chat key={el} />
      ))}
    </main>
  );
};

export default ListOfChats;
