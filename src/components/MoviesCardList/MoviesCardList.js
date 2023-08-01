import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { savedMovies, allMovies } from '../../utils/constants';



const MoviesCardList = () => {
  let location = useLocation();

  const isMoviesPath = location.pathname === '/movies';
  const isSaveMoviesPath = location.pathname === '/saved-movies';

  return (
    <ul className='card-list'>
      { isMoviesPath && allMovies.map(el => {
        return <MoviesCard name={ el.name } timing={ el.timing } link={ el.promo } key={ el._id } />
      }) }

      { isSaveMoviesPath && savedMovies.map(el => {
        return <MoviesCard name={ el.name } timing={ el.timing } link={ el.promo } key={ el._id } />
      }) }
    </ul>
  );
};

export default MoviesCardList;
