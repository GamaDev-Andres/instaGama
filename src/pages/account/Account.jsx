import { Outlet } from 'react-router-dom';

const Account = () => {
  return (
    <div className="center min-h-screen w-full bg-fondoClaro">
      <div className="center-col max-w-[350px] w-full  sm:border sm:border-bordes py-4 px-8">
        <h1 className="text-negro font-bold my-8 text-center text-3xl">
          InstaGama
        </h1>
        <div className="center w-full py-2">
          <div className="h-[1px] bg-bordes flex-grow w-full"></div>
          <div className="p-2 font-bold text-bordes">o</div>
          <div className="h-[1px] bg-bordes flex-grow w-full"></div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
