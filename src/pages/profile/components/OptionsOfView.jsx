import { NavLink, useLocation } from 'react-router-dom';
import { toArrPath } from '../../../utilities/toArrPath';

const OptionsOfView = () => {
  const { pathname } = useLocation();
  const pathFeed = toArrPath(pathname)[2];

  return (
    <div className="border-t border-bordes p-4 center">
      <NavLink
        className={`center flex-grow ${!pathFeed ? 'text-azul' : ''}`}
        to="."
      >
        <i className="text-xl leading-[14px] fa-solid fa-table-cells"></i>{' '}
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `center flex-grow ${isActive ? 'text-azul' : ''}`
        }
        to="feed"
      >
        <i className="text-xl leading-[20px] fa-solid fa-arrows-up-down"></i>
      </NavLink>
    </div>
  );
};

export default OptionsOfView;
