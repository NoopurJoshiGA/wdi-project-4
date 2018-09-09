import React from 'react';

const Sort = ({ handleChange, options, defaultValue }) => {
  return (
    <div className="field">
      <label className="label">Sort your users out, mate</label>
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

export default Sort;
