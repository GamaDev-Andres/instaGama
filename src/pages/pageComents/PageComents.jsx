import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/Header';
import ListoOfComents from './components/ListoOfComents';
import LeftArrowButton from '../../components/LeftArrowButton';
import Spinner from '../../components/Spinner';
import usePageComentsContext from './hook/usePageComentContext';
import HeroImage from '../../components/HeroImage';
import useUser from '../../hooks/useUser';
import ContainerInputComent from './components/ContainerInputComent';
import socketContext from '../../contexts/socketContext/socketContext';

const PageComents = () => {
  const { idPost } = useParams();
  const { coments, autor, descripcion, addComentToState } =
    usePageComentsContext();

  const { foto } = useUser();
  const { socket } = useContext(socketContext);

  useEffect(() => {
    socket.on('newComent', (coment) => {
      addComentToState(coment);
    });
  }, []);

  if (!coments) {
    return <Spinner fullScreen={true} />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{`${autor.name} en InstaGama ${
          descripcion ? `:"${descripcion}"` : ''
        }`}</title>
      </Helmet>
      <Header>
        <div className="center relative w-full h-full">
          <LeftArrowButton path={`/p/${idPost}`} />
          <h1 className="font-semibold font-sans">Comenterios</h1>
        </div>
      </Header>
      <div className="flex flex-col flex-grow max-w-[935px] mx-auto w-full">
        <div className="w-full bg-fondoGris p-2 center text-sm gap-4">
          <HeroImage url={foto} className="w-[32px]" />
          <ContainerInputComent />
        </div>
        <main className="flex flex-col flex-grow border-t border-bordes">
          <ListoOfComents coments={coments} />
        </main>
      </div>
    </div>
  );
};

export default PageComents;
