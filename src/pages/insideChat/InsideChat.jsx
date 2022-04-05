import { useEffect } from 'react/cjs/react.development';
import Header from '../../components/Header';
import ContainerInputMessage from './components/ContainerInputMessage';
import HeaderChat from './components/HeaderChat';
import Message from './components/Message';

const InsideChat = () => {
  useEffect(() => {
    document.body.classList.add('overflow-clip');

    return () => {
      document.documentElement.classList.remove('overflow-clip');
    };
  }, []);

  return (
    <div className="flex flex-col h-full flex-grow">
      <Header>
        <HeaderChat />
      </Header>
      <main className="bg-fondoClaro min-h-[calc(100vh-76px)] flex-grow overflow-y-auto px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((el) => (
          <Message own={true} key={el} />
        ))}
      </main>
      <ContainerInputMessage />
    </div>
  );
};

export default InsideChat;
