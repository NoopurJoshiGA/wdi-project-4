import React from 'react';

const SearchBar = ({ handleChange, searchTerm }) => {
  return(
    <section className="section">
      <div className="field">
        <input name="searchTerm" className="input has-text-dark" type="text" placeholder="Search" onChange={handleChange} value={searchTerm || ''}></input>
      </div>
    </section>
  );
};

export default SearchBar;
