import React from "react";

function Checkbox({checkboxes, handleCheckboxChange, name, label, count}: any) {
  return (
    <label className="flex items-center space-x-2 pl-3 mb-2">
      <input
        type="checkbox"
        name={name}
        checked={checkboxes}
        onChange={handleCheckboxChange}
        className="appearance-none rounded-sm h-4 w-4
                focus:ring-0 focus:ring-offset-0 checked:bg-black
                border-gray-300 border-[1px] peer"
      />
      <div>{label} ({count})</div>
      <svg
        className="
                  absolute 
                  w-4 h-4
                  hidden peer-checked:block
                  pointer-events-none left-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </label>
  );
}

export default Checkbox;
