import React from "react";
import "../../styles/components/search/Search.css";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <i>
        <BiSearch size={13} />
      </i>
      <input
        type="text"
        placeholder="Search Products"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
