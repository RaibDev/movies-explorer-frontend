import { useLocation } from 'react-router-dom';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  let location = useLocation()

  const isDeleteBtn = location.pathname === '/saved-movies';
  return (
    <main>
      <SearchForm />
      <MoviesCardList />
      { isDeleteBtn && <div className='hidden-box'></div> }
    </main>
  );
};

export default SavedMovies;
