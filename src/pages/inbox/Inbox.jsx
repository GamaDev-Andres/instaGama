import { Helmet } from 'react-helmet-async';

import Header from '../../components/Header';
import HeaderInbox from './components/HeaderInbox';
import ListOfChats from './components/ListOfChats';

const Inbox = () => {
  return (
    <div className=" bg-fondoClaro min-h-screen">
      <Helmet>
        <title>Bandeja de entrada • Chats</title>
      </Helmet>
      <Header>
        <HeaderInbox />
      </Header>
      <ListOfChats />
    </div>
  );
};

export default Inbox;
