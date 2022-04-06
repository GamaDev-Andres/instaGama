import { useEffect, useRef } from 'react/cjs/react.development';
import Header from '../../components/Header';
import ContainerInputMessage from './components/ContainerInputMessage';
import HeaderChat from './components/HeaderChat';
import Message from './components/Message';

const InsideChat = () => {
  const listOfMessages = useRef();
  useEffect(() => {
    const lastChild = listOfMessages.current.lastChild;
    lastChild.scrollIntoView();

    return () => {};
  }, []);

  return (
    <div className="flex flex-col h-full flex-grow max-h-full">
      <Header>
        <HeaderChat />
      </Header>
      <main
        ref={listOfMessages}
        className="bg-fondoClaro min-h-0  max-h-[calc(100vh-85px-44px)] flex-grow overflow-y-auto px-4"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((el) => (
          <Message own={true} text="loremdede dedededededededed" key={el} />
        ))}
      </main>
      <ContainerInputMessage />
    </div>
  );
};

export default InsideChat;
