import React from 'react';

const SearchBar = ({ handleChange, searchTerm }) => {
  return(
    <section className="searchBarSection">
      <div className="field">
        <p className="has-text-dark">Search</p>
        <input name="searchTerm" className="searchBar input is-fullwidth has-text-dark" type="text" placeholder="First name, last name, model, photographer, username..." onChange={handleChange} value={searchTerm || ''}></input>
      </div>
    </section>
  );
};

export default SearchBar;
