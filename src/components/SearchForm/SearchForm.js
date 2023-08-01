import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className='search' aria-label='Поиск'>
      <form className='search__form'>
        <input className='search__input' placeholder='Фильм'/>
        <button className='search__submit' type='submit'></button>
      </form>
      <FilterCheckbox />
    </section>
  );
};

export default SearchForm;