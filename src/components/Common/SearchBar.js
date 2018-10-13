import React from 'react';

const SearchBar = ({ handleChange, searchTerm }) => {
  return(
    <section className="searchBarSection">
      <div className="field">
        <label htmlFor="search">Search</label>
        <input name="searchTerm" className="searchBar input is-fullwidth has-text-dark" type="text" placeholder="Search" onChange={handleChange} value={searchTerm || ''}></input>
      </div>
    </section>
  );
};

export default SearchBar;
