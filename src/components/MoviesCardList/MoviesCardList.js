import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useResize from '../../hooks/useResize';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { DEVICE_WIDTH } from '../../utils/constants';

const MoviesCardList = ({ 
  movies,
  savedMovies,
  onLike,
  onDelete,
  isSaved
}) => {

  const { desktop, tablet, mobile } = DEVICE_WIDTH;
  const [isCount, setIsCount] = useState(true);
  const [shownMovies, setShownMovies] = useState([]);
  const [cardSetting, setCardSetting] = useState({ total: 7, more: 7 });
  const location = useLocation();
  const resize = useResize();

  useEffect(() => {
    if(location.pathname === '/movies') {
      if (resize > desktop.width) {
        setCardSetting(desktop.cards);
      } else if (resize <= desktop.width && resize > mobile.width) {
        setCardSetting(tablet.cards);
      } else {
        setCardSetting(mobile.cards);
      }
      return () => setIsCount(false);
    } else {
      setCardSetting({ total: savedMovies.length, more: 0 });
    }
  }, [resize, desktop, tablet, mobile]);

  useEffect(() => {
    if (movies.length) {
      const res = movies.filter((el, i) => i < cardSetting.total);
      setShownMovies(res);
    }
  }, [movies, cardSetting.total]);

  const handleAddFilm = () => {
    const start = shownMovies.length;
    const finish = start + cardSetting.more;
    const more = movies.length - start;

    if (more > 0) {
      const newCards = movies.slice(start, finish);
      setShownMovies([...shownMovies, ...newCards]);
    }
  }


  return (
    <>
      <ul className='card-list'>
            { shownMovies.map(movie => {
          return (
            <MoviesCard 
              movie={ movie }
              savedMovies={ savedMovies }
              onLike={ onLike }
              onDelete={ () => onDelete(movie) }
              key={ movie.id || movie._id }
              isSaved={ isSaved }
            />
          );
        }
        )}
      </ul>
      { location.pathname === '/movies' && shownMovies.length < movies.length && (
          <button className='new-movies-btn' type='button' onClick={ handleAddFilm }>Eщё</button> 
        )
      }
    </>
  );
};

export default MoviesCardList;
