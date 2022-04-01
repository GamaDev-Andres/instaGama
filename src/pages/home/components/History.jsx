import HeroImage from '../../../components/HeroImage';

const History = () => {
  return (
    <div className="px-1">
      <div className="cursor-pointer">
        <div className="gradiante-historias p-[2px] rounded-full">
          <HeroImage size={60} />
        </div>
      </div>
      <div className="text-center mt-1 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-[72px]">
        Andres gama izquierdo
      </div>
    </div>
  );
};

export default History;
