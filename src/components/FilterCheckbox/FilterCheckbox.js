import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onChange, isChoosed }) => {
  return (
    <>
      <div className="checkbox">
        <span className="checkbox__text">Короткометражки</span>
        <input 
          className="checkbox__input" 
          type="checkbox" 
          id="switch" 
          onChange={ onChange }
          checked={ isChoosed || '' }
        />
        <label className="checkbox__label" htmlFor="switch"></label>
      </div>
    </>
  );
};

export default FilterCheckbox;