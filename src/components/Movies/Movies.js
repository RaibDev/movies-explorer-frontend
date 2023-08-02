
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

const Movies = () => {
  return (
    <main>
      <SearchForm />
      <MoviesCardList />
      <button className='new-movies-btn' type='button'>Eщё</button>
    </main>
  );
};

export default Movies;