
import React from 'react';

const SortByLocation = ({ handleChange, defaultValue, options }) => {
  return(
    <section className="SortByLocationSection">
      <div className="field">
        <label className="label">Sort by location</label>
        <div className="select is-fullwidth">
          <select onChange={ handleChange } defaultValue={defaultValue}>
            {options.map(option =>
              <option key={option.value}
                value={option.value}>{option.label}</option>)}
          </select>
        </div>
      </div>
    </section>
  );
};

export default SortByLocation;
