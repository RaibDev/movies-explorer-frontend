import { useEffect, useMemo, useState } from 'react';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import useResize from '../../hooks/useResize';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/moviesApi';

const Movies = ({ onLike, onDelete, savedMovies, apiErrors, movies, onRequest }) => {
  let size = useResize();
  const [countAddedFilm, setCountAddedFilm] = useState(0);

  const reqMovies = localStorage.getItem('requestedMovies');
  const request = localStorage.getItem('requestedResponceMovies');
  const [sortedMovies, setSortedMovies] = useState([]);
  const [searchRequest, setSearchRequest] = useState({});
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  // const [movies, setMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const renderedFilm = useMemo(() => { // Рендер фильмов
    const renderCounter = (size.width < 768) ? 5 : ((size.width < 1280) ? 5 : 7);

    return sortedMovies.slice(0, renderCounter + countAddedFilm);
  }, [size, movies, countAddedFilm]);

  const handleAddFilm = () => { // логика кнопки добавления фильма
    setCountAddedFilm((start) => start + (size.width >= 1280 ? 3 : 2));
  };

  const handleSortedMovies = (req) => {
    localStorage.setItem('requestedResponceMovies', JSON.stringify(req));
    let sorted = [];

    if(req.isShort) {
      sorted = movies.filter(el => {
        return (
          el.duration <= 40 &&
          el.nameRU.toLowerCase().trim().includes(req.searchText.toLowerCase())
        );
      });
      localStorage.setItem('requestedMovies', JSON.stringify(sorted));
      setSortedMovies(sorted);
    } else if(!req.isShort) {
      sorted = movies.filter(el => {
        return el.nameRU.toLowerCase().trim().includes(req.searchText.toLowerCase());
      });
      localStorage.setItem('requestedMovies', JSON.stringify(sorted));
      setSortedMovies(sorted);
    }
  };

  const handleClearInput = () => {
    localStorage.removeItem('requestedMovies');
    localStorage.removeItem('requestedResponceMovies');
    setSearchRequest({});
    setSortedMovies(savedMovies);
  };

  // const handleGetMovies = () => {
  //   moviesApi.getAllMovies().then((movies) => {
  //     console.log(movies)
  //     localStorage.setItem('movies', JSON.stringify(movies));
  //     setMovies(movies);
  //     setApiErrors({ ...apiErrors, movies: {} });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     setApiErrors({ ...apiErrors, movies: error });
  //   });
  // };

  useEffect(() => {
    setCountAddedFilm(0);
  }, [movies]);

  useEffect(() => {
    if(request) {
      setSearchRequest(JSON.parse(request));
    }
  }, [request]);

  useEffect(() => {
    if(reqMovies) {
      setSortedMovies(JSON.parse(reqMovies));
    }
  }, [reqMovies]);

  return (
    <main>
      <SearchForm 
        onClear={ handleClearInput } 
        onFilter={ handleSortedMovies } 
        searchRequest={ searchRequest }
        apiErrors={ apiErrors }
        // onRequest={ handleGetMovies }
      />
      { isLoading ? <Preloader /> : (renderedFilm.length ? 
        (<MoviesCardList 
          movies={ sortedMovies } 
          renderedFilm={ renderedFilm } 
          setCountAddedFilm={ setCountAddedFilm } 
          onLike={ onLike } 
          onDelete={ onDelete }
        />) : 
        (<p className='movies__not-found'>По вашему запросу ничего не найдено</p>)) }
      {/* <MoviesCardList 
        movies={ sortedMovies }
        onLike={ onLike }
        onDelete={ onDelete }
        renderedFilm={ renderedFilm }
        setCountAddedFilm={ setCountAddedFilm }
      /> */}
      { sortedMovies.length &&
        <button className='new-movies-btn' type='button' onClick={ ()=> handleAddFilm() }>Eщё</button> 
      }
    </main>
  );
};

export default Movies;