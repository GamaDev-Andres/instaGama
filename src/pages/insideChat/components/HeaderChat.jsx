import HeroImage from '../../../components/HeroImage';
import LeftArrowButton from '../../../components/LeftArrowButton';

const HeaderChat = () => {
  return (
    <div className="flex justify-start w-full">
      <LeftArrowButton path="/inbox" />
      <div className="ml-[44px] center gap-2">
        <HeroImage className="w-[24px]" />
        <h1 className="font-semibold">Nombre del chat</h1>
      </div>
    </div>
  );
};

export default HeaderChat;
