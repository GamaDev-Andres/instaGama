import propTypes from 'prop-types';
import HeroImage from '../../../components/HeroImage';
import LeftArrowButton from '../../../components/LeftArrowButton';

const HeaderChat = ({ userChat }) => {
  return (
    <div className="flex justify-start w-full">
      <LeftArrowButton path="/inbox" />
      <div className="ml-[44px] center gap-2">
        <HeroImage url={userChat.foto} className="w-[24px]" />
        <h1 className="font-semibold">{userChat.name}</h1>
      </div>
    </div>
  );
};

HeaderChat.propTypes = {
  userChat: propTypes.object.isRequired,
};
export default HeaderChat;
