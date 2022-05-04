import propTypes from 'prop-types';
import { useEffect, useContext, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import socketContext from '../../../contexts/socketContext/socketContext';
import { customFetch } from '../../../services/customFetch';
import pageComentContext from './pageComentContext';

const PageComentProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const { idPost } = useParams();
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const { socket } = useContext(socketContext);
  useEffect(() => {
    const url = import.meta.env.VITE_URL_SERVER;
    const urlPeticion = url + '/api/coment/' + idPost;
    customFetch(urlPeticion, 'GET')
      .then((res) => {
        if (!res.ok) {
          navigate('/');
          return;
        }
        delete res.ok;
        if (isMounted.current) {
          setState({
            coments: res.comentarios,
            autor: res.autor,
            descripcion: res.descripcion,
            fecha: res.fecha,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isMounted.current = false;
    };
  }, [idPost]);
  useEffect(() => {
    socket.emit('openRoomComent', idPost);

    return () => {
      socket.emit('leaveRoomComent', idPost);
    };
  }, []);

  const addComentToState = (coment) => {
    setState((estado) => ({ ...estado, coments: [...estado.coments, coment] }));
  };
  const contextValue = {
    ...state,
    addComentToState,
  };
  return (
    <pageComentContext.Provider value={contextValue}>
      {children}
    </pageComentContext.Provider>
  );
};
PageComentProvider.propTypes = {
  children: propTypes.element,
};
export default PageComentProvider;
