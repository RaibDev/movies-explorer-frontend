
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = () => {
  return (
    <>
      <SearchForm />
      <MoviesCardList />
      <button className='new-movies-btn' type='button'>Eщё</button>
    </>
  );
};

export default Movies;