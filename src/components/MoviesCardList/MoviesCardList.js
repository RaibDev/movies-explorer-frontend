import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ 
  onLike, 
  onDelete, 
  savedMovies, 
  renderedFilm, 
  setCountAddedFilm 
}) => {

  return (
    <ul className='card-list'>
      { renderedFilm.map(movie => {
        return (
          <MoviesCard 
            movie={ movie }
            savedMovies={ savedMovies }
            onLike={ onLike }
            onDelete={ onDelete }
            key={ movie.movieId || movie.id }
            renderedFilm={ renderedFilm }
            setCountAddedFilm={ setCountAddedFilm }
          />
        );
      }) }
    </ul>
  );
};

export default MoviesCardList;
