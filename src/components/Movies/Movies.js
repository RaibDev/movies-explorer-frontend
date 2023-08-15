import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from '../../utils/moviesApi';
import { filterShorts, filterMovies } from '../../utils/filtration';

const Movies = ({ 
  onLike, 
  onDelete, 
  savedMovies, 
}) => {
  const navigate = useNavigate();
  let location = useLocation();

  const [err, setErr] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetSortedMovies = (movies, userQuery, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userQuery, false);
    if (moviesList.length === 0) {
      setErr(true);
    } else {
      setErr(false);
    }
    setInitialMovies(moviesList);
    setSortedMovies(
      shortMoviesCheckbox ? filterShorts(moviesList) : moviesList
    );
    localStorage.setItem(`movies`, JSON.stringify(moviesList));
  }

  const handleSubmit = (inputValue, loadAll) => {
    setIsLoading(true);
    localStorage.setItem(`movieSearch`, inputValue);
    if (loadAll || isAllMovies.length === 0) {
      moviesApi
        .getAllMovies()
        .then(movies => {
          setInitialMovies(movies);
          setIsAllMovies(movies);
          localStorage.setItem(`movies`, JSON.stringify(movies));
          if (localStorage.getItem(`shortMovies`)) {
            setSortedMovies(filterShorts(movies));
          } else {
            setSortedMovies(movies);
          }
          handleSetSortedMovies(movies, inputValue, shortMovies);
          if (movies.length < 1) {
            setErr(false);
          }
        })
        .catch(() => console.log()
        )
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      moviesApi
        .getAllMovies()
        .then(movies => {
          setIsAllMovies(movies);
          handleSetSortedMovies(isAllMovies, inputValue, shortMovies);
        })
        .catch((err) => console.log(err)
        )
        .finally(() => setIsLoading(false));
    }
  }

  const showShortFilms = () => {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setSortedMovies(filterShorts(initialMovies))
    } else {
      setSortedMovies(initialMovies)
    }
    localStorage.setItem(`shortMovies`, !shortMovies);
  }

  // useEffect(() => {
  //   if (localStorage.getItem(`movies`) && JSON.parse(localStorage.getItem(`movies`)).length > 0) {
  //     const movies = JSON.parse(
  //       localStorage.getItem(`movies`)
  //     );
  //     setInitialMovies(movies);
  //     if (localStorage.getItem(`shortMovies`) === 'true') {
  //       setSortedMovies(filterShorts(movies));
  //     } else {
  //       setSortedMovies(movies);
  //     }
  //   } else {
  //     moviesApi
  //       .getAllMovies()
  //       .then(movies => {
  //         setInitialMovies(movies);
  //         localStorage.setItem(`movies`, JSON.stringify(movies));
  //         if (
  //           localStorage.getItem(`shortMovies`) === 'true'
  //         ) {
  //           setSortedMovies(filterShorts(movies));
  //         } else {
  //           setSortedMovies(movies);
  //         }
  //       })
  //       .catch((err) => console.log(err)
  //       )
  //       .finally(() => setIsLoading(false));
  // //   }
    
  //   if (localStorage.getItem(`shortMovies`) === 'true') {
  //     setShortMovies(true);
  //   } else {
  //     setShortMovies(false);
  //   }
  // }, [navigate]);

  useEffect(() => {
    // setSortedMovies(sortedMovies)
    // handleSetSortedMovies(isAllMovies, inputValue, shortMovies);
    setSortedMovies(filterShorts(sortedMovies));
  }, [location.pathname]);

  return (
    <main>
      <SearchForm 
        onSubmit={ handleSubmit }
        showShortFilms={ showShortFilms }
        shortMovies={ shortMovies }
      />
      { isLoading && <Preloader /> }
      { !err && sortedMovies.length ? 
        (<MoviesCardList 
          isSaved={ false }
          movies={ sortedMovies } 
          savedMovies={ savedMovies }
          onLike={ onLike } 
          onDelete={ onDelete }
        />) : 
        (localStorage.getItem('movies') && <p className='movies__not-found'>По вашему запросу ничего не найдено</p>) }
    </main>
  );
};

export default Movies;