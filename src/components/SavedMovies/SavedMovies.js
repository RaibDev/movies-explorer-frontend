import React, { useEffect, useState } from 'react';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { filterShorts, filterMovies } from '../../utils/filtration';

const SavedMovies = ({ savedMovies, onDelete }) => {

  const [shortMovies, setShortMovies] = useState(false);
    const [err, setErr] = useState(false);
    const [displayShort] = useState(savedMovies);
    const [sortedMovies, setSortedMovies] = useState(displayShort);

    const showShortFilms = () => {
        setShortMovies(!shortMovies);
        localStorage.setItem(`shortSavedMovies`, !shortMovies);
        if (!shortMovies) {
            let movies = filterShorts(savedMovies);
            setSortedMovies(movies);
            movies.length === 0 ? setErr(true) : setErr(false);
        } else {
            setSortedMovies(savedMovies);
            savedMovies.length === 0 ? setErr(true) : setErr(false);
        }
    }

    const handleSubmit = (value) => {
        const movies = filterMovies(savedMovies, value, shortMovies);
        if (movies.length === 0) {
            setErr(true);
        } else {
            setErr(false);
            setSortedMovies(movies);
        }
    }

    const handleDeleteMovie = (movie) => {
        onDelete(movie);
    }

    useEffect(() => {
        setSortedMovies(sortedMovies);
        sortedMovies.length !== 0 ? setErr(false) : setErr(true);
    }, [shortMovies, sortedMovies]);

    useEffect(() => {
        setSortedMovies(savedMovies);
    }, [savedMovies]);

  return (
    <main>
      <SearchForm 
        onSubmit={ handleSubmit }
        showShortFilms={ showShortFilms }
        shortMovies={ shortMovies }
      />
      { !err ? 
        (<MoviesCardList 
          isSaved={ true }
          movies={ sortedMovies }
          savedMovies={ sortedMovies }
          onDelete={ handleDeleteMovie }
          />) : 
        (<p className='movies__not-found'>По вашему запросу ничего не найдено</p>) }
      <div className='hidden-box'></div>
    </main>
  );
};

export default SavedMovies;
