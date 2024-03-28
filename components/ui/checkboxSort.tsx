import React from 'react'

function CheckboxSort({sortOrder, setSortOrder, value, label}: any) {
  return (
    <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  value={value}
                  checked={sortOrder === value}
                  onChange={() => setSortOrder(value)}
                  className="appearance-none rounded-sm h-4 w-4
                  focus:ring-0 focus:ring-offset-0 checked:bg-black
                  border-gray-300 border-[1px] peer"
                />
                <div>{label}</div>
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
  )
}

export default CheckboxSort