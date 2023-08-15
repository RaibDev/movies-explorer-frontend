import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onChange, isChoosed }) => {
  let location = useLocation();

  return (
      <div className="checkbox">
        <span className="checkbox__text">Короткометражки</span>
        <input 
          className="checkbox__input" 
          type="checkbox" 
          id="switch" 
          onChange={ onChange }
          checked={ isChoosed || '' }
          // checked={ ((location.pathname === '/movies' && localStorage.getItem('shortMovies') === true) ? true : false) }
        />
        <label className="checkbox__label" htmlFor="switch"></label>
      </div>
  );
};

export default FilterCheckbox;