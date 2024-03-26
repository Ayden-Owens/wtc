import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import "./SearchBar.css"; // Import your CSS file

export const SearchBar = ({ setResults, inputValue, selectedRecipe, isItFocused }) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (value) => {
    setInput(value);
    inputValue(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    isItFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    isItFocused(false); // Call the function with the new value
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Search recipes..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default SearchBar;
