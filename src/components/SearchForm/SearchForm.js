import { useEffect, useState } from 'react';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/find.svg'

const SearchForm = ({ apiErrors, onFilter, onReset, searchRequest, onRequest }) => {
  const [searchText, setSearchText] = useState('');
  const isChoosed = JSON.parse(localStorage.getItem('checkboxState'));
  const [isShort, setIsShort] = useState(isChoosed);
  const [err, setErr] = useState('');

  const handleChange = (evt) => {
    setSearchText(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(searchText) {
      onFilter({ isShort, searchText });
    } else {
      setErr('Введите ключевое слово для поиска');
    }
  };

  const checkFilter = () => {
    if(searchText === '') {
      onFilter({ 
        searchText: searchRequest.searchText,
        isShort: !isShort,
       });
       setIsShort(!isShort);
    } else {
      onFilter({ 
        searchText: searchText,
        isShort: !isShort,
       });
       setIsShort(!isShort);
    }
  };

  useEffect(() => {
    if(searchRequest.searchText) {
      setSearchText(searchRequest.searchText);
    }
  }, [searchRequest.searchText]);

  return (
    <section className='search' aria-label='Поиск'>
      <form className='search__form' onSubmit={ handleSubmit }>
        <input 
          className='search__input' 
          placeholder='Фильм' 
          name='search' 
          min='1'
          onChange={ handleChange }
          required
        />
        <button className='search__submit' type='submit'>
          <img className='search__submit-icon' alt='Кнопка поиска' src={ searchIcon }/>
        </button>
        { <span className='form__api-error'>{ !searchText && err }</span>  }
      </form>
      <FilterCheckbox onChange={ checkFilter } isChoosed={ searchRequest.isShort } />
    </section>
  );
};

export default SearchForm;