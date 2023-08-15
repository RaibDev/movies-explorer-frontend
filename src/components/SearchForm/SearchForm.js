import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/find.svg'
import useFormValidation from '../../hooks/useFormValidation';
import { validateName, validateSearch } from '../../utils/validation.js';

const SearchForm = ({ onSubmit, showShortFilms, shortMovies }) => {
  const location = useLocation();
  const { values, handleChange, isValid, errors } = useFormValidation();

  const handleSubmit = (e) => {
      e.preventDefault();
      if (typeof values.search !== 'undefined' && values.search !== '') {
          if (values.search.trim() !== '') {
              onSubmit(values.search, false)
          } else {
              localStorage.removeItem(`movieSearch`);
              onSubmit(values.search, true)
          }
      } else {
          localStorage.removeItem(`movieSearch`);
          onSubmit(values.search, true);
      }
  };

  useEffect(() => {
      if (location.pathname === '/movies' && localStorage.getItem(`movieSearch`)) {
          const searchValues = localStorage.getItem(`movieSearch`);
          values.search = searchValues;
      }
      if (location.pathname === '/saved-movies' && localStorage.getItem(`saveMovieSearch`)) {
        const searchSavedValues = localStorage.getItem(`saveMovieSearch`);
        values.search = searchSavedValues;
    }

  }, [location.pathname]);

  return (
    <section className='search' aria-label='Поиск'>
      <form className='search__form' onSubmit={ handleSubmit } noValidate >
        <input 
          className='search__input' 
          placeholder='Фильм' 
          name='search' 
          min='1'
          value={ values.search || '' }
          onChange={ handleChange }
          required
        />
        { <span className='form__error form__error_type_search'>{ validateSearch(values.search).message }</span> }
        <button 
          className={ `search__submit ${ isValid ? 'search__submit_type_hover' : 'search__submit_disabled' }` } 
          type='submit' 
          // disabled={ !isValid }
        >
          <img className='search__submit-icon' alt='Кнопка поиска' src={ searchIcon }/>
        </button>
      </form>
      <FilterCheckbox 
        onChange={ () => showShortFilms(values.search) } 
        isChoosed={ shortMovies ? true : false } 
      />
    </section>
  );
};

export default SearchForm;