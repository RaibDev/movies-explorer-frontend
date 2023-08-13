import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ 
  onLike, 
  onDelete, 
  savedMovies, 
  renderedFilm, 
  setCountAddedFilm, 
  movies
}) => {

  return (
    <ul className='card-list'>
           { movies.map(movie => {
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
       }
      )}
      {/* { renderedFilm.map(movie => {
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
       }
      )} */}
      {/* { renderedFilm ? (renderedFilm.map(movie => {
        console.log(movie);
        return (
          <MoviesCard 
            movie={ movie }
            savedMovies={ savedMovies }
            onLike={ onLike }
            onDelete={ onDelete }
            key={ movie.movieId || movie._id }
            renderedFilm={ renderedFilm }
            setCountAddedFilm={ setCountAddedFilm }
          />
        );
      }) 
      ) : (
        movie.map(movie => {
        console.log(movie);
          return (
            <MoviesCard 
              movie={ movie }
              savedMovies={ savedMovies }
              onLike={ onLike }
              onDelete={ onDelete }
              key={ movie.movieId || movie._id }
              renderedFilm={ renderedFilm }
              setCountAddedFilm={ setCountAddedFilm }
            />
          );
        }) 
      )
      } */}
    </ul>
  );
};

export default MoviesCardList;
