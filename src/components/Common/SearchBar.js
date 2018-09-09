import React from 'react';

const SearchBar = ({ handleChange, searchTerm }) => {
  return(
    <section>
      <div className="field">
        <input name="searchTerm" className="input" type="text" placeholder="Search" onChange={handleChange} value={searchTerm || ''}></input>
      </div>
    </section>
  );
};

export default SearchBar;
