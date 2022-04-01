import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import ContainerInputSearch from './components/ContainerInputSearch';

const Search = () => {
  return (
    <div>
      <Header>
        <ContainerInputSearch />
      </Header>
      <Outlet />
    </div>
  );
};

export default Search;
