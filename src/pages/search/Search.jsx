import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import ContainerInputSearch from './components/ContainerInputSearch';
import SearchProvider from './context/SearchProvider';

const Search = () => {
  return (
    <SearchProvider>
      <Helmet>
        <title>InstaGama</title>
      </Helmet>
      <div className="bg-fondoClaro min-h-screen">
        <Header>
          <ContainerInputSearch />
        </Header>
        <Outlet />
      </div>
    </SearchProvider>
  );
};

export default Search;
