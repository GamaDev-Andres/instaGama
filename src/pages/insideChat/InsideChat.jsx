import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useContext, useState } from 'react';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import useInboxContext from '../inbox/hook/useInboxContext';
import ContainerInputMessage from './components/ContainerInputMessage';
import HeaderChat from './components/HeaderChat';
import Message from './components/Message';
import socketContext from '../../contexts/socketContext/socketContext';
import useUser from '../../hooks/useUser';

const InsideChat = () => {
  const listOfMessages = useRef();
  const { id } = useParams();
  const { chats } = useInboxContext();
  const { id: userId } = useUser();
  const { socket } = useContext(socketContext);
  const navigate = useNavigate();
  const [chatCurrent, setchatCurrent] = useState(null);

  useEffect(() => {
    if (id === userId) {
      navigate('/');
      return;
    }

    const chat = chats?.find((chat) => chat.with.id === id);
    if (!chat && chats) {
      socket.emit('newChat', id, (error, chat) => {
        if (error) {
          navigate('/');
          throw new Error(error);
        } else {
          setchatCurrent(chat);
        }
      });
    } else {
      setchatCurrent(chat);
    }
  }, [chats]);

  useEffect(() => {
    const lastChild = listOfMessages.current?.lastChild;
    lastChild?.scrollIntoView();
  }, [chatCurrent, listOfMessages]);

  if (!chats || !chatCurrent) {
    return <Spinner fullScreen={true} />;
  }
  return (
    <div className="flex flex-col min-h-screen flex-grow">
      <Header>
        <HeaderChat chatCurrent={chatCurrent} />
      </Header>

      <main
        ref={listOfMessages}
        className="bg-fondoClaro min-h-0 flex flex-col justify-end  flex-grow overflow-y-auto px-4"
      >
        {chatCurrent?.mensajes.map((el) => (
          <Message own={id !== el.autor} data={el} key={el._id} />
        ))}
      </main>

      <ContainerInputMessage uid={id} />
    </div>
  );
};

export default InsideChat;
