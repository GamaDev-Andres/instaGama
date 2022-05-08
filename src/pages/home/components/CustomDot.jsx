import React from 'react';

/* eslint-disable react/prop-types */
const CustomDot = ({ onClick, ...rest }) => {
  const { active, index, arr } = rest;
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <button
      className={`center w-full rounded-none  h-[12px] ${
        active ? 'bg-white bg-opacity-50' : 'bg-white bg-opacity-0'
      }`}
      onClick={() => onClick()}
    >
      {React.Children.toArray(arr)[index]}
    </button>
  );
};
export default CustomDot;
