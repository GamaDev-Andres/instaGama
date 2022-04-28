import LeftArrowButton from '../../../components/LeftArrowButton';

const HeaderInbox = () => {
  return (
    <div className="center relative w-full h-full">
      <LeftArrowButton path="/" />
      <h1 className="font-semibold font-sans">Chats</h1>
    </div>
  );
};

export default HeaderInbox;
