import React from 'react';

const SortByType = ({ handleChange, options, defaultValue }) => {
  return (
    <div className="field">
      <label className="label">Filter by type</label>
      <div className="select">
        <select onChange={ handleChange } defaultValue="Please Select...">
          {options.map(option =>
            <option key={option.value}
              value={option.value}>{option.label}</option>)}
        </select>
      </div>
    </div>
  );
};

export default SortByType;
