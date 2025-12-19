import React from "react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = ""
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full md:w-64 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
    />
  );
};

export default SearchInput;
