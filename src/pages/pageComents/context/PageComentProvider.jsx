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

  const deleteComent = async (idComent) => {
    const url = import.meta.env.VITE_URL_SERVER;

    try {
      const urlPath = url + '/api/coment/' + idComent;
      const response = await customFetch(urlPath, 'DELETE');
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0]?.msg);
      }
      setState((estado) => ({
        ...estado,
        coments: estado.coments.filter((coment) => coment.id !== idComent),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const updateComent = async (idComent, data) => {
    const url = import.meta.env.VITE_URL_SERVER;

    try {
      const urlPath = url + '/api/coment/' + idComent;
      const response = await customFetch(urlPath, 'PUT', data);
      if (response?.msg || response?.errors) {
        throw new Error(response?.msg || response?.errors[0]?.msg);
      }

      setState((estado) => ({
        ...estado,
        coments: estado.coments.map((coment) =>
          coment.id === idComent ? { ...coment, text: data.text } : coment
        ),
      }));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    ...state,
    addComentToState,
    deleteComent,
    updateComent,
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
