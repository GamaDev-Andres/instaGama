import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import ContainerInputSearch from './components/ContainerInputSearch';
import SearchProvider from './context/SearchProvider';

const Search = () => {
  return (
    <SearchProvider>
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
