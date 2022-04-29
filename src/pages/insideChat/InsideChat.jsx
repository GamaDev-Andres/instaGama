import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import useInboxContext from '../inbox/hook/useInboxContext';
import ContainerInputMessage from './components/ContainerInputMessage';
import HeaderChat from './components/HeaderChat';
import Message from './components/Message';

const InsideChat = () => {
  const listOfMessages = useRef();
  const { id } = useParams();
  const { chats } = useInboxContext();
  const chatCurrent = chats?.find((chat) => chat.with.id === id);

  useEffect(() => {
    const lastChild = listOfMessages.current?.lastChild;
    lastChild?.scrollIntoView();
  }, [chats]);
  if (!chats) {
    return <Spinner fullScreen={true} />;
  }
  return (
    <div className="flex flex-col min-h-screen flex-grow">
      <Header>
        <HeaderChat userChat={chatCurrent.with} />
      </Header>

      <main
        ref={listOfMessages}
        className="bg-fondoClaro min-h-0 flex flex-col justify-end  flex-grow overflow-y-auto px-4"
      >
        {chatCurrent?.mensajes.map((el) => (
          <Message own={id !== el.autor} text={el.mensaje} key={el._id} />
        ))}
      </main>

      <ContainerInputMessage uid={id} />
    </div>
  );
};

export default InsideChat;
