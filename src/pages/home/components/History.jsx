import propTypes from 'prop-types';
import { useEffect, useState } from 'react/cjs/react.development';
import HeroImage from '../../../components/HeroImage';
import { useAuthContext } from '../../../hooks/useAuthContext';
import useUpdateCloudinary from '../../../hooks/useUpdateCloudinary';
import ContainerInputHistory from './ContainerInputHistory';
import ContentHistoryModal from './ContentHistoryModal';
import ModalHistory from './ModalHistory';

const History = ({ data }) => {
  const {
    state: {
      user: { id },
    },
  } = useAuthContext();
  const { data: dataCloudinary, loading, handleOpen } = useUpdateCloudinary();
  const [isCancel, setIsCancel] = useState(false);
  const [isOpenViewHistory, setIsOpenViewHistory] = useState(false);
  console.log(data);
  console.log(dataCloudinary);

  useEffect(() => {
    if (dataCloudinary && isCancel) {
      setIsCancel(false);
    }
  }, [dataCloudinary]);

  const handleOpenModal = () => {
    if (id === data.autor._id && !loading && !data.histories.length) {
      handleOpen();
    } else {
      setIsOpenViewHistory(true);
    }
  };

  return (
    <div className="px-1">
      <div onClick={handleOpenModal} className="cursor-pointer center relative">
        <div className="gradiante-historias center aspect-square p-[2px] rounded-full">
          <HeroImage url={data?.autor?.foto} className="w-[60px]" />
        </div>
        {id === data.autor._id && data.histories.length === 0 && (
          <div className="absolute bottom-0 right-0 aspect-square bg-fondoClaro rounded-full center">
            <i className="fa-solid fa-circle-plus text-azul aspect-square w-6 h-6 center text-2xl"></i>
          </div>
        )}
      </div>
      <div className="text-center mt-1 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-[78px]">
        {data?.autor?.name}
      </div>
      {dataCloudinary && !isCancel && (
        <ModalHistory closeModal={() => setIsCancel(true)}>
          <ContentHistoryModal
            isCreating={true}
            autor={data.autor}
            url={dataCloudinary[0]}
          />
        </ModalHistory>
      )}
      {isOpenViewHistory && (
        <ModalHistory closeModal={() => setIsOpenViewHistory(false)}>
          <ContentHistoryModal autor={data.autor} url={data.histories[0].url}>
            <ContainerInputHistory
              closeModal={() => setIsOpenViewHistory(false)}
              url={data.histories[0].url}
            />
          </ContentHistoryModal>
        </ModalHistory>
      )}
    </div>
  );
};

History.propTypes = {
  data: propTypes.object.isRequired,
};

export default History;
