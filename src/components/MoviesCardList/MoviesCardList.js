import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ 
  onLike, 
  onDelete, 
  savedMovies, 
  renderedFilm, 
  setCountAddedFilm, 
  movie
}) => {

  return (
    <ul className='card-list'>
      { renderedFilm ? (renderedFilm.map(movie => {
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
      }) ) : (
        movie.map(movie => {
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
        }) 
      )
      }
    </ul>
  );
};

export default MoviesCardList;
