import React, { FC } from "react";
import "./style.css";

interface IProps {
  debounceOnChange: any;
}

const SearchInputForHomePage: React.FC<IProps> = ({ debounceOnChange }) => {
  return (
    <input
      className="input"
      placeholder="Enter movie name..."
      onChange={debounceOnChange}
    ></input>
  );
};

export default SearchInputForHomePage;
