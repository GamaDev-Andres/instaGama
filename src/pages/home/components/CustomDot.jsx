/* eslint-disable react/prop-types */
const CustomDot = ({ onClick, ...rest }) => {
  const { active } = rest;
  return (
    <button
      className={`center w-full rounded-none  h-[8px] ${
        active ? 'bg-white bg-opacity-50' : 'bg-white bg-opacity-0'
      }`}
      onClick={() => onClick()}
    ></button>
  );
};
export default CustomDot;
