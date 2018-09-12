import React from 'react';

const FilterByDistance = ({ options, handleChange }) => {

  const allTrue = options.every(option => option.active === true);

  return(
    <section className="filterByDistanceSection">
      <p className="has-text-dark">Filter by distance</p>
      <div className='field'>
        <label className="checkbox has-text-dark" htmlFor='all' >Selected All</label>
        <input onChange={ handleChange } type='checkbox' name='all' checked={allTrue}/>
      </div>
      {options && options.map((option, i) =>
        <div key={i} className='field'>
          <label className="checkbox has-text-dark" htmlFor={ option.value }>{option.label}</label>
          <input onChange={ handleChange } type='checkbox' checked={option.active} name={option.value}/>
        </div>
      )}
    </section>
  );
};

export default FilterByDistance;
