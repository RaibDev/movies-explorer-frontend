import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.css';
import timeConverter from '../../utils/timeConverter';
import { BEATFILM_URL } from '../../utils/constants';

const MoviesCard = ({ movie, savedMovies, onLike, onDelete }) => {
  let location = useLocation();

  const isLikeBtn = location.pathname === '/movies';
  const isDeleteBtn = location.pathname === '/saved-movies';

  const savedMovie = savedMovies ? (savedMovies.find(el => el.movieId === movie.id)) : '';
  const imageLink = movie.image.url ? `${ BEATFILM_URL }${ movie.image.url }` : movie.image;
  const isLiked = savedMovies ? savedMovies.some(el => el.movieId === movie.id) : false;
  return (
    <li className='card'>
      <div className='card__info'>
        <h3 className='card__title'>{ movie.nameRU }</h3>
        <p className='card__timing'>{ timeConverter(movie.duration) }</p>
        { isLikeBtn && 
          <button 
            type='button' 
            className={`button ${ isLiked ? 'card__like-btn_type_liked' : 'button card__like-btn' }`}
            onClick={ () => onLike(movie, isLiked, savedMovie?._id) }
          ></button> }
        { isDeleteBtn && 
          <button 
            className='button card__delete-btn' 
            type='button'
            onClick={ () => onDelete(movie._id) }
          ></button> }
      </div>
      <Link 
        to={ movie.trailerLink } 
        target='_blank'
      >
        <img 
          className='card__image' 
          src={ imageLink } 
          alt={ movie.nameRU }
        />
      </Link>
    </li>
  );
};

export default MoviesCard;