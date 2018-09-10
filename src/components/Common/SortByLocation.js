
import React from 'react';

const SortByLocation = ({ handleChange, defaultValue, options }) => {
  return(
    <div className="field">
      <label className="label">Sort by location</label>
      <div className="select">
        <select onChange={ handleChange } defaultValue={defaultValue}>
          {options.map(option =>
            <option key={option.value}
              value={option.value}>{option.label}</option>)}
        </select>
      </div>
    </div>
  );
};

export default SortByLocation;
