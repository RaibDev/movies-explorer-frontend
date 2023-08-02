import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

const MoviesCard = ({ name, timing, link }) => {
  let location = useLocation();

  const isLikeBtn = location.pathname === '/movies';
  const isDeleteBtn = location.pathname === '/saved-movies';

  return (
    <li className='card'>
      <div className='card__info'>
        <h3 className='card__title'>{ name }</h3>
        <p className='card__timing'>{ timing }</p>
        { isLikeBtn && <button type='button' className='button card__like-btn'></button> }
        { isDeleteBtn && <button className='button card__delete-btn' type='button'></button> }
      </div>
      <img className='card__image' src={ link } alt='Промо фильма'/>
    </li>
  );
};

export default MoviesCard;