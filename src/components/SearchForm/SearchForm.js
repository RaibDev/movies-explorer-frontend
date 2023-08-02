import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/find.svg'

const SearchForm = () => {
  return (
    <section className='search' aria-label='Поиск'>
      <form className='search__form'>
        <input className='search__input' placeholder='Фильм' name='search-input' required/>
        <button className='search__submit' type='submit'>
          <img className='search__submit-icon' alt='Кнопка поиска' src={ searchIcon }/>
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;