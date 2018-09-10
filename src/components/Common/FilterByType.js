import React from 'react';

const SortByType = ({ handleChange, options, defaultValue }) => {
  return (
    <section className="FilterByTypeSection">
      <div className="field">
        <label className="label">Filter by type</label>
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

export default SortByType;
