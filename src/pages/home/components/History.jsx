import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
  const [isOpenViewHistory, setIsOpenViewHistory] = useState(false);
  const [isCreating, setisCreating] = useState(false);
  console.log(data);
  console.log(dataCloudinary);

  useEffect(() => {
    if (dataCloudinary && isCreating) {
      console.log('abro modal effect');
      handleOpenModal();
    }
  }, [dataCloudinary]);

  const handleCreateHistory = () => {
    setisCreating(true);
    handleOpen();
  };

  const handleOpenModal = () => {
    console.log('abro modal');

    setIsOpenViewHistory(true);
  };
  const handleCloseModal = () => {
    console.log('cierro modal y creating');

    setisCreating(false);
    setIsOpenViewHistory(false);
  };

  return (
    <div>
      <div
        onClick={() => {
          data.histories.length && handleOpenModal();
        }}
        className="cursor-pointer center relative"
      >
        <div className="gradiante-historias center aspect-square p-[2px] rounded-full">
          <HeroImage url={data?.autor?.foto} className="w-[60px]" />
        </div>

        {id === data.autor._id && (
          <button
            disabled={loading}
            onClick={(e) => {
              e.stopPropagation();
              handleCreateHistory();
            }}
            className="absolute bottom-0 right-0 aspect-square bg-fondoClaro rounded-full center"
          >
            <i className="fa-solid fa-circle-plus text-azul aspect-square w-6 h-6 center text-2xl"></i>
          </button>
        )}
      </div>
      <div className="text-center mt-1 text-xs whitespace-nowrap text-ellipsis overflow-hidden max-w-[78px]">
        {data?.autor?.name}
      </div>

      {isOpenViewHistory && (
        <ModalHistory closeModal={handleCloseModal}>
          <ContentHistoryModal
            autor={data.autor}
            isCreating={isCreating}
            url={isCreating ? dataCloudinary[0] : data.histories[0]?.url}
          >
            {isCreating ? (
              <ContainerInputHistory
                closeModal={handleCloseModal}
                url={isCreating ? dataCloudinary[0] : data.histories[0]?.url}
              />
            ) : (
              <></>
            )}
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
