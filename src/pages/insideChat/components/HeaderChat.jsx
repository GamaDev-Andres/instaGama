import propTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroImage from '../../../components/HeroImage';
import LeftArrowButton from '../../../components/LeftArrowButton';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';
import useInboxContext from '../../inbox/hook/useInboxContext';
import useDeleteChat from '../hook/useDeleteChat';

const HeaderChat = ({ chatCurrent }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { deleteChat, loading: loadingDelete } = useDeleteChat();
  const { deleteChatState } = useInboxContext();
  const navigate = useNavigate();

  const handleDeleteChat = async () => {
    const response = await deleteChat(chatCurrent._id);
    if (response?.ok) {
      navigate('/inbox', { replace: true });
      deleteChatState(chatCurrent._id);
    }
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <LeftArrowButton path="/inbox" />
        <div className="ml-[44px] center gap-2">
          <HeroImage url={chatCurrent.with.foto} className="w-[24px]" />
          <h1 className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {chatCurrent.with.name}
          </h1>
        </div>
      </div>

      <button
        onClick={() => setIsOpenModal(true)}
        disabled={chatCurrent.mensajes.length === 0}
        className={`border border-bordes p-1 mr-4 rounded-full text-sm w-[22px] ${
          chatCurrent.mensajes.length === 0 ? 'hidden' : 'center'
        }`}
      >
        <i className="fa-solid fa-info center"></i>
      </button>

      {isOpenModal && (
        <Modal closeModal={() => setIsOpenModal(false)}>
          <div className="flex flex-col p-2">
            <button
              onClick={handleDeleteChat}
              disabled={loadingDelete}
              className="py-2 center text-red-500 disabled:text-opacity-30 font-semibold border-b border-bordes"
            >
              <span className="mr-4">Eliminar chat</span>
              {loadingDelete && (
                <div>
                  <Spinner />
                </div>
              )}
            </button>
            <button onClick={() => setIsOpenModal(false)} className="py-2">
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

HeaderChat.propTypes = {
  chatCurrent: propTypes.object.isRequired,
};
export default HeaderChat;
